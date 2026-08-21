import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'
import {
  runTerminalCommand,
  type TerminalContext,
} from '../model/runTerminalCommand'

type SystemTerminalProps = {
  bootStatus: SystemBootState
  onClose: () => void
}

function pointerKind(): TerminalContext['pointer'] {
  if (window.matchMedia('(pointer: fine)').matches) return 'fine'
  if (window.matchMedia('(pointer: coarse)').matches) return 'coarse'
  return 'none'
}

export function SystemTerminal({ bootStatus, onClose }: SystemTerminalProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const xtermHostRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<{
    writeln: (value: string) => void
    dispose: () => void
    clear: () => void
  }>()
  const linesRef = useRef<string[]>([])
  const [query, setQuery] = useState('')
  const [lines, setLines] = useState<string[]>(['personal-system terminal. введите help.'])
  const [live, setLive] = useState('')
  linesRef.current = lines

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const host = xtermHostRef.current
    if (!host) return
    let disposed = false

    void (async () => {
      try {
        if (/jsdom/i.test(navigator.userAgent)) return
        const probe = document.createElement('canvas').getContext('2d')
        if (!probe) return

        const [{ Terminal }, { FitAddon }] = await Promise.all([
          import('@xterm/xterm'),
          import('@xterm/addon-fit'),
        ])
        await import('@xterm/xterm/css/xterm.css')
        if (disposed || !host) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const instance = new Terminal({
          convertEol: true,
          cursorBlink: !reduced,
          disableStdin: true,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          fontSize: 13,
          theme: {
            background: '#02060b',
            foreground: '#81a4bb',
            cursor: '#62bcff',
          },
        })
        const fit = new FitAddon()
        instance.loadAddon(fit)
        instance.open(host)
        fit.fit()
        for (const line of linesRef.current) instance.writeln(line)
        termRef.current = instance
      } catch {
        // jsdom or missing canvas — native input still works.
      }
    })()

    return () => {
      disposed = true
      termRef.current?.dispose()
      termRef.current = undefined
    }
  }, [])

  useEffect(() => {
    const term = termRef.current
    if (!term) return
    term.clear()
    for (const line of lines) term.writeln(line)
  }, [lines])

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = runTerminalCommand(query, {
      pathname,
      bootStatus,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      pointer: pointerKind(),
    })
    const nextLines = result.clear ? [] : [...lines, `> ${query}`, ...result.output]
    setLines(nextLines)
    setLive(result.clear ? 'буфер очищен' : query.trim() || result.output.join(' '))
    setQuery('')
    if (result.navigateTo) {
      onClose()
      navigate(result.navigateTo)
    }
  }

  return (
    <div
      aria-label="Терминал"
      aria-modal="true"
      className="system-terminal"
      role="dialog"
    >
      <p className="system-terminal__label">terminal</p>
      <div aria-hidden="true" className="system-terminal__xterm" ref={xtermHostRef} />
      <pre className="system-terminal__pre">{lines.join('\n')}</pre>
      <div className="sr-only" role="status">
        {live}
      </div>
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
  )
}
