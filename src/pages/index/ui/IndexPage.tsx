import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { seoFromRoute } from '../../../shared/config/seo'
import { systemRoutes } from '../../../shared/config/routes'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'
import { useSystemBoot } from '../../../features/system-boot/model/useSystemBoot'
import { SystemTerminal } from '../../../widgets/terminal/ui/SystemTerminal'
import { IndexMap } from './IndexMap'

const seo = seoFromRoute('/')
const BOOT_KEY = 'personal-system:booted'
const BOOT_MS = 480
const bootSteps = ['NAV', 'PALETTE', 'MODULES'] as const

function shouldPlayIndexBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  try {
    return sessionStorage.getItem(BOOT_KEY) !== '1'
  } catch {
    return false
  }
}

function markIndexBooted() {
  try {
    sessionStorage.setItem(BOOT_KEY, '1')
  } catch {
    // Private mode or quota — skip persistence, never block content.
  }
}

function useIndexBoot() {
  const [booting, setBooting] = useState(shouldPlayIndexBoot)

  useEffect(() => {
    if (!booting) {
      return
    }

    const timer = window.setTimeout(() => {
      markIndexBooted()
      setBooting(false)
    }, BOOT_MS)

    return () => window.clearTimeout(timer)
  }, [booting])

  return booting
}

export function IndexPage() {
  const booting = useIndexBoot()
  const bootStatus = useSystemBoot()

  return (
    <PageSection>
      <DocumentMeta config={seo} />
      {booting ? (
        <div
          className="index-boot"
          role="status"
          aria-label="Инициализация системы"
        >
          <p className="index-boot__label">BOOT / INDEX</p>
          <p className="index-boot__title">PERSONAL SYSTEM</p>
          <ol className="index-boot__steps">
            {bootSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
      <SectionLabel number="00">СИСТЕМНЫЙ ИНДЕКС</SectionLabel>
      <div className="index-console">
        <div>
          <h1
            aria-label="PERSONAL SYSTEM"
            className="index-title mt-8 max-w-5xl min-w-0 font-display text-[clamp(1.75rem,8vw,5.5rem)] uppercase leading-[0.82] tracking-[-0.045em] wrap-break-word"
          >
            PERSONAL
            <br />
            <span className="text-outline-strong">SYSTEM</span>
          </h1>
          <p className="mt-8 max-w-xl text-[clamp(1.05rem,2.4vw,1.5rem)] leading-snug text-copy">
            Юлия Ешкилева — frontend-разработчик. Модули системы ниже: путь,
            состояние, переход.
          </p>
          <IndexMap />
        </div>
        <SystemTerminal bootStatus={bootStatus} />
      </div>
      <nav className="index-files mt-12 min-w-0" aria-label="Модули системы">
        <table className="index-files__table">
          <thead>
            <tr>
              <th scope="col">ADDR</th>
              <th scope="col">PATH</th>
              <th scope="col">STATE</th>
            </tr>
          </thead>
          <tbody>
            {systemRoutes.map((route, index) => (
              <tr key={route.path}>
                <td className="index-files__addr">
                  {String(index).padStart(2, '0')}
                </td>
                <td>
                  <Link className="index-files__link" to={route.path}>
                    system://{route.label}
                  </Link>
                </td>
                <td className="index-files__state">READY</td>
              </tr>
            ))}
          </tbody>
        </table>
      </nav>
    </PageSection>
  )
}
