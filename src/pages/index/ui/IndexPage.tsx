import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { seoFromRoute } from '../../../shared/config/seo'
import { systemRoutes } from '../../../shared/config/routes'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/')
const BOOT_KEY = 'personal-system:booted'
const BOOT_MS = 480

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
        </div>
      ) : null}
      <SectionLabel number="00">СИСТЕМНЫЙ ИНДЕКС</SectionLabel>
      <h1
        aria-label="PERSONAL SYSTEM"
        className="mt-8 max-w-5xl font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.82] tracking-[-0.045em]"
      >
        PERSONAL
        <br />
        <span className="text-outline-strong">SYSTEM</span>
      </h1>
      <p className="mt-10 max-w-2xl text-[clamp(1.25rem,3vw,2rem)] leading-tight text-copy">
        Юлия Ешкилева — frontend-разработчик. Профиль, проекты, стек,
        траектория и контакт разложены по отдельным модулям.
      </p>
      <nav className="mt-16 max-w-4xl" aria-label="Модули системы">
        <ul className="m-0 grid list-none gap-px bg-line p-0 sm:grid-cols-2">
          {systemRoutes.map((route, index) => (
            <li key={route.path} className="bg-project">
              <Link
                to={route.path}
                className="group block min-h-36 cursor-pointer p-6 no-underline transition-colors duration-200 hover:bg-signal/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-electric"
              >
                <span className="font-mono text-xs text-meta">
                  {String(index).padStart(2, '0')} / FILE
                </span>
                <span className="mt-8 block font-display text-2xl uppercase tracking-tight group-hover:text-electric">
                  system://{route.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageSection>
  )
}
