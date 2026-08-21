import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  filterCommands,
  getPaletteCommands,
  type PaletteAction,
  type PaletteCommand,
} from '../../../features/command-search/model/commands'
import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'
import { pushSessionEvent } from '../../../features/session-log/model/sessionLog'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

type Overlay = Extract<PaletteAction, 'diagnostics'>

type CommandPaletteProps = {
  bootStatus: SystemBootState
}

function pointerKind() {
  if (window.matchMedia('(pointer: fine)').matches) {
    return 'fine'
  }
  if (window.matchMedia('(pointer: coarse)').matches) {
    return 'coarse'
  }
  return 'none'
}

function diagnosticsText(pathname: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'reduce'
    : 'no-preference'

  return [
    `route: ${pathname}`,
    `reduced-motion: ${reduced}`,
    `pointer: ${pointerKind()}`,
  ].join('\n')
}

export function CommandPalette({ bootStatus }: CommandPaletteProps) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [statusOpen, setStatusOpen] = useState(false)
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)
  const overlayOpenerRef = useRef<HTMLElement | null>(null)
  const konamiIndex = useRef(0)
  const wasOpen = useRef(false)
  const commands = useMemo(() => getPaletteCommands(), [])
  const matches = filterCommands(commands, query)
  const report = diagnosticsText(pathname)

  useLayoutEffect(() => {
    if (open) {
      if (!wasOpen.current) {
        lastFocusRef.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null
        pushSessionEvent('palette open')
      }
      wasOpen.current = true
      inputRef.current?.focus()
      return
    }

    if (wasOpen.current) {
      wasOpen.current = false
      pushSessionEvent('palette close')
      lastFocusRef.current?.focus()
    }
  }, [open])

  function rememberOverlayOpener() {
    overlayOpenerRef.current =
      lastFocusRef.current ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null)
  }

  function closeOverlay() {
    const opener = overlayOpenerRef.current
    setOverlay(null)
    opener?.focus()
    overlayOpenerRef.current = null
  }

  useLayoutEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        setOpen((current) => !current)
        setQuery('')
        setStatusOpen(false)
        return
      }

      if (event.key === 'Escape') {
        if (overlay) {
          closeOverlay()
          return
        }
        setOpen(false)
        setQuery('')
        setStatusOpen(false)
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const normalized =
        event.key.length === 1 ? event.key.toLowerCase() : event.key
      const expected = KONAMI[konamiIndex.current]
      if (normalized === expected) {
        konamiIndex.current += 1
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0
          rememberOverlayOpener()
          setOpen(false)
          setOverlay('diagnostics')
        }
        return
      }

      konamiIndex.current = normalized === KONAMI[0] ? 1 : 0
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [overlay])

  function runCommand(command: PaletteCommand) {
    if (command.action === 'status') {
      setStatusOpen(true)
      return
    }

    if (command.action === 'diagnostics') {
      rememberOverlayOpener()
      setOpen(false)
      setQuery('')
      setStatusOpen(false)
      setOverlay(command.action)
    }
  }

  return (
    <>
      {open ? (
        <div
          aria-labelledby="command-palette-title"
          aria-modal="true"
          className="command-palette"
          role="dialog"
        >
          <div className="command-palette__panel">
            <h2
              className="command-palette__title"
              id="command-palette-title"
            >
              Палитра команд
            </h2>
            <input
              aria-label="Поиск команд"
              autoComplete="off"
              className="command-palette__input"
              onChange={(event) => {
                setQuery(event.target.value)
                setStatusOpen(false)
              }}
              placeholder="filter"
              ref={inputRef}
              spellCheck={false}
              type="search"
              value={query}
            />
            {statusOpen ? (
              <p className="command-palette__status">{bootStatus}</p>
            ) : null}
            <ul className="command-palette__list">
              {matches.map((command) => (
                <li key={command.id}>
                  {command.href ? (
                    <Link
                      className="command-palette__item"
                      onClick={() => {
                        setOpen(false)
                        setQuery('')
                        setStatusOpen(false)
                      }}
                      to={command.href}
                    >
                      {command.label}
                    </Link>
                  ) : (
                    <button
                      className="command-palette__item"
                      onClick={() => runCommand(command)}
                      type="button"
                    >
                      {command.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {overlay === 'diagnostics' ? (
        <div
          aria-label="Диагностика"
          aria-modal="true"
          className="system-diagnostics"
          role="dialog"
        >
          <p className="system-diagnostics__label">diagnostics</p>
          <pre className="system-diagnostics__pre">{report}</pre>
        </div>
      ) : null}
    </>
  )
}
