import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'
import { applyXtermData, XTERM_PROMPT } from '../lib/applyXtermData'
import { playWhoamiIntro } from '../lib/playWhoamiIntro'
import {
  runTerminalCommand,
  type TerminalContext,
} from '../model/runTerminalCommand'
import { pushSessionEvent } from '../../../features/session-log/model/sessionLog'

type SystemTerminalProps = {
  bootStatus: SystemBootState
}

const BANNER = 'personal-system terminal. type help.'
const WHOAMI_KEY = 'personal-system:whoami'

function pointerKind(): TerminalContext['pointer'] {
  if (window.matchMedia('(pointer: fine)').matches) return 'fine'
  if (window.matchMedia('(pointer: coarse)').matches) return 'coarse'
  return 'none'
}

export function SystemTerminal({ bootStatus }: SystemTerminalProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const xtermHostRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<{
    write: (value: string) => void
    writeln: (value: string) => void
    clear: () => void
    dispose: () => void
  } | null>(null)
  const lineRef = useRef('')
  const contextRef = useRef({ pathname, bootStatus, navigate })
  const executeRef = useRef<(input: string) => void>(() => {})
  const [query, setQuery] = useState('')
  const [lines, setLines] = useState<string[]>([BANNER])
  const [live, setLive] = useState('')
  const [xtermLive, setXtermLive] = useState(false)

  function execute(input: string) {
    const { pathname: path, bootStatus: status, navigate: go } = contextRef.current
    const result = runTerminalCommand(input, {
      pathname: path,
      bootStatus: status,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      pointer: pointerKind(),
    })
    const term = termRef.current
    if (result.clear) {
      term?.clear()
      setLines([])
    } else if (result.output.length) {
      for (const line of result.output) term?.writeln(line)
      setLines((current) => [...current, `> ${input}`, ...result.output])
    }
    term?.write(XTERM_PROMPT)
    setLive(result.output.join(' ') || (result.clear ? 'буфер очищен' : ''))
    const commandName = input.trim().split(/\s+/)[0]?.toLowerCase()
    if (commandName) pushSessionEvent(`cmd ${commandName}`)
    if (result.navigateTo) {
      go(result.navigateTo)
    }
  }

  useLayoutEffect(() => {
    contextRef.current = { pathname, bootStatus, navigate }
    executeRef.current = execute
  })

  useEffect(() => {
    const host = xtermHostRef.current
    if (!host || /jsdom/i.test(navigator.userAgent)) return
    let disposed = false
    let onResize: (() => void) | undefined

    void (async () => {
      try {
        const [{ Terminal }, { FitAddon }] = await Promise.all([
          import('@xterm/xterm'),
          import('@xterm/addon-fit'),
        ])
        await import('@xterm/xterm/css/xterm.css')
        if (disposed || !host) return

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const term = new Terminal({
          convertEol: true,
          cursorBlink: !reduced,
          cursorStyle: 'block',
          disableStdin: false,
          fontFamily: 'JetBrains Mono, ui-monospace, Menlo, Consolas, monospace',
          fontSize: 14,
          lineHeight: 1.2,
          cols: 80,
          rows: 20,
          scrollback: 1000,
          screenReaderMode: true,
          theme: {
            background: '#000000',
            foreground: '#f0f0f0',
            cursor: '#f0f0f0',
            cursorAccent: '#000000',
            selectionBackground: '#168cff',
            black: '#000000',
            blue: '#168cff',
            cyan: '#62bcff',
            white: '#f0f0f0',
            brightCyan: '#9ad6ff',
          },
        })
        const fit = new FitAddon()
        term.loadAddon(fit)
        term.open(host)
        fit.fit()
        term.writeln(`\x1b[1;36m${BANNER}\x1b[0m`)
        term.write(XTERM_PROMPT)

        onResize = () => fit.fit()
        window.addEventListener('resize', onResize)

        term.onData((data) => {
          const next = applyXtermData(data, lineRef.current)
          lineRef.current = next.buffer
          if (next.write) term.write(next.write)
          if (next.submit !== undefined) {
            executeRef.current(next.submit)
          } else if (next.write === '^C\r\n') {
            term.write(XTERM_PROMPT)
          }
        })

        termRef.current = term
        if (disposed) {
          if (onResize) window.removeEventListener('resize', onResize)
          term.dispose()
          termRef.current = null
          return
        }
        setXtermLive(true)
      } catch {
        // Native fallback remains.
      }
    })()

    return () => {
      disposed = true
      if (onResize) window.removeEventListener('resize', onResize)
      termRef.current?.dispose()
      termRef.current = null
    }
  }, [])

  useEffect(() => {
    if (/jsdom/i.test(navigator.userAgent)) {
      if (sessionStorage.getItem(WHOAMI_KEY) === '1') return
      sessionStorage.setItem(WHOAMI_KEY, '1')
      executeRef.current('whoami')
      return
    }

    if (!xtermLive) return
    if (sessionStorage.getItem(WHOAMI_KEY) === '1') return
    sessionStorage.setItem(WHOAMI_KEY, '1')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      executeRef.current('whoami')
      return
    }

    let cancelled = false
    const cancel = () => {
      cancelled = true
    }
    window.addEventListener('keydown', cancel)

    void (async () => {
      const result = await playWhoamiIntro({
        write: (chunk) => {
          lineRef.current += chunk
          termRef.current?.write(chunk)
        },
        wait: (ms) => new Promise((resolve) => window.setTimeout(resolve, ms)),
        delayMs: 48,
        isCancelled: () => cancelled,
      })
      if (cancelled || result !== 'typed' || !termRef.current) return
      termRef.current.write('\r\n')
      lineRef.current = ''
      executeRef.current('whoami')
    })()

    return () => {
      cancelled = true
      window.removeEventListener('keydown', cancel)
    }
  }, [xtermLive])

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    execute(query)
    setQuery('')
  }

  return (
    <section
      aria-label="Терминал"
      className="system-terminal"
    >
      <div
        className={
          xtermLive
            ? 'system-terminal__chassis system-terminal__chassis--live'
            : 'system-terminal__chassis'
        }
      >
        <p className="system-terminal__label">xterm</p>
        <div className="system-terminal__xterm" ref={xtermHostRef} />
        <div className="system-terminal__fallback" hidden={xtermLive}>
          <pre className="system-terminal__pre">{lines.join('\n')}</pre>
          <form onSubmit={submitCommand}>
            <label className="system-terminal__prompt">
              команда терминала
              <input
                autoComplete="off"
                onChange={(event) => setQuery(event.target.value)}
                ref={inputRef}
                spellCheck={false}
                value={query}
              />
            </label>
          </form>
        </div>
        <div className="sr-only" role="status">
          {live}
        </div>
      </div>
    </section>
  )
}
