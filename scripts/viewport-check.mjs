import { chromium } from 'playwright'
import { preview } from 'vite'

const paths = ['/', '/profile', '/projects/job-agent']
const widths = [320, 375, 430, 768, 1440]
const height = 900
const minTextPx = 12
const treeBreakpoint = 1280

function inspectPage(minPx) {
  const root = document.documentElement
  const overflow = Math.max(0, root.scrollWidth - root.clientWidth)
  const dock = document.querySelector('.system-nav--mobile')
  const tree = document.querySelector('.system-nav--desktop')
  const dockDisplay = dock ? getComputedStyle(dock).display : 'missing'
  const treeDisplay = tree ? getComputedStyle(tree).display : 'missing'
  const signals = [...document.querySelectorAll('[data-project-signal]')].filter(
    (node) => getComputedStyle(node).display !== 'none',
  )

  const smallText = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)

  while (walker.nextNode()) {
    const value = walker.currentNode.textContent?.replace(/\s+/g, ' ').trim()
    if (!value) continue

    const element = walker.currentNode.parentElement
    if (!element) continue

    let hidden = false
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node)
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        Number(style.opacity) === 0
      ) {
        hidden = true
        break
      }
    }
    if (hidden) continue

    const rect = element.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) continue

    const size = Number.parseFloat(getComputedStyle(element).fontSize)
    if (size + 0.01 < minPx) {
      smallText.push({
        size: Number(size.toFixed(2)),
        sample: value.slice(0, 48),
      })
    }
  }

  const overflowing = []
  if (overflow > 1) {
    for (const node of document.querySelectorAll('body *')) {
      const style = getComputedStyle(node)
      if (style.position === 'fixed' || style.position === 'sticky') continue
      const rect = node.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) continue
      if (rect.right > window.innerWidth + 1) {
        overflowing.push({
          tag: node.tagName.toLowerCase(),
          className: String(node.className).slice(0, 120),
          text: (node.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
          width: Math.round(rect.width),
          right: Math.round(rect.right),
          left: Math.round(rect.left),
        })
      }
    }
  }

  return {
    overflow,
    overflowing: overflowing.slice(0, 6),
    dockVisible: dockDisplay !== 'none' && dockDisplay !== 'missing',
    treeVisible: treeDisplay !== 'none' && treeDisplay !== 'missing',
    dockDisplay,
    treeDisplay,
    visibleSignals: signals.length,
    smallText: smallText.slice(0, 8),
    minText:
      smallText.length === 0
        ? null
        : Math.min(...smallText.map((item) => item.size)),
  }
}

const server = await preview({
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
})
const baseURL = server.resolvedUrls?.local[0] ?? 'http://127.0.0.1:4173'

let browser
const rows = []
let failed = false

try {
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  await page.addInitScript(() => {
    sessionStorage.setItem('personal-system:booted', '1')
  })

  for (const path of paths) {
    for (const width of widths) {
      await page.setViewportSize({ width, height })
      await page.goto(new URL(path, baseURL).toString(), {
        waitUntil: 'networkidle',
      })
      await page.evaluate(() => document.fonts.ready)

      const result = await page.evaluate(inspectPage, minTextPx)
      const expectDock = width < treeBreakpoint
      const overflowOk = result.overflow <= 1
      const chromeOk = expectDock
        ? result.dockVisible && !result.treeVisible
        : result.treeVisible && !result.dockVisible
      const textOk = result.smallText.length === 0
      const visualOk = result.visibleSignals <= 1
      const ok = overflowOk && chromeOk && textOk && visualOk
      if (!ok) failed = true

      rows.push({
        path,
        width,
        ok,
        overflow: result.overflow,
        chrome: expectDock ? 'dock' : 'tree',
        dockVisible: result.dockVisible,
        treeVisible: result.treeVisible,
        minText: result.minText,
        smallText: result.smallText,
        overflowing: result.overflowing,
        visibleSignals: result.visibleSignals,
      })
    }
  }

  const bootPage = await browser.newPage()
  await bootPage.setViewportSize({ width: 320, height })
  await bootPage.goto(new URL('/', baseURL).toString(), {
    waitUntil: 'networkidle',
  })
  await bootPage.evaluate(() => document.fonts.ready)
  const bootResult = await bootPage.evaluate(inspectPage, minTextPx)
  const bootOk = bootResult.overflow <= 1 && bootResult.smallText.length === 0
  if (!bootOk) failed = true
  rows.push({
    path: '/ (boot)',
    width: 320,
    ok: bootOk,
    overflow: bootResult.overflow,
    chrome: 'dock',
    dockVisible: bootResult.dockVisible,
    treeVisible: bootResult.treeVisible,
    minText: bootResult.minText,
    smallText: bootResult.smallText,
    overflowing: bootResult.overflowing,
    visibleSignals: bootResult.visibleSignals,
  })
  await bootPage.close()
} finally {
  await browser?.close()
  await server.close()
}

for (const row of rows) {
  const status = row.ok ? 'PASS' : 'FAIL'
  const text =
    row.minText == null ? `>=${minTextPx}px` : `${row.minText}px`
  console.log(
    `${status} ${row.path.padEnd(22)} ${String(row.width).padStart(4)}  overflow=${row.overflow}  ${row.chrome} dock=${row.dockVisible} tree=${row.treeVisible}  text=${text}  signals=${row.visibleSignals}`,
  )
  if (row.smallText.length) {
    console.log(`       small: ${JSON.stringify(row.smallText)}`)
  }
  if (row.overflowing?.length) {
    console.log(`       overflow nodes: ${JSON.stringify(row.overflowing)}`)
  }
}

if (failed) {
  process.exitCode = 1
}
