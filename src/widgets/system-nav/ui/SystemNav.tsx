import { useLayoutEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { systemRoutes } from '../../../shared/config/routes'

function ModuleLinks({ close }: { close?: () => void }) {
  return (
    <ul className="system-nav__list">
      {systemRoutes.map((route) => (
        <li key={route.path}>
          <NavLink
            className="system-nav__link"
            end
            onClick={close}
            to={route.path}
          >
            <span aria-hidden>├─</span>
            <span>{route.path}</span>
            <span className="system-nav__label">{route.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export function SystemNav() {
  const [allModulesOpen, setAllModulesOpen] = useState(false)
  const allButtonRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (!allModulesOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      setAllModulesOpen(false)
      allButtonRef.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [allModulesOpen])

  return (
    <>
      <nav
        aria-label="Система — навигация"
        className="system-nav system-nav--desktop"
      >
        <p className="system-nav__root">system://</p>
        <ModuleLinks />
      </nav>

      <nav
        aria-label="Мобильная системная навигация"
        className="system-nav system-nav--mobile"
      >
        <ul className="system-dock">
          {systemRoutes.map((route) => (
            <li key={route.path}>
              <NavLink className="system-dock__link" end to={route.path}>
                {route.path === '/' ? '/' : route.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="system-dock__all"
          onClick={() => setAllModulesOpen(true)}
          ref={allButtonRef}
          type="button"
        >
          все разделы
        </button>
      </nav>

      {allModulesOpen ? (
        <div
          aria-label="Все разделы"
          aria-modal="true"
          className="system-modules"
          role="dialog"
        >
          <div className="system-modules__header">
            <p>system://</p>
            <button
              className="system-modules__close"
              onClick={() => setAllModulesOpen(false)}
              type="button"
            >
              закрыть
            </button>
          </div>
          <ModuleLinks close={() => setAllModulesOpen(false)} />
        </div>
      ) : null}
    </>
  )
}
