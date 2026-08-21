import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'
import { useSessionLog } from '../../../features/session-log/model/useSessionLog'

type SystemStatusProps = {
  status: SystemBootState
}

const FLASH_MS = 1400

function formatSession(elapsedMs: number) {
  const total = Math.max(0, Math.floor(elapsedMs / 1000))
  const minutes = String(Math.floor(total / 60)).padStart(2, '0')
  const seconds = String(total % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function readMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'REDUCE'
    : 'LIVE'
}

function readView() {
  return `${window.innerWidth}×${window.innerHeight}`
}

export function SystemStatus({ status }: SystemStatusProps) {
  const { pathname } = useLocation()
  const lastEvent = useSessionLog()
  const [flash, setFlash] = useState<typeof lastEvent>(null)
  const [motion, setMotion] = useState(readMotion)
  const [view, setView] = useState(readView)
  const [session, setSession] = useState('00:00')

  useEffect(() => {
    const started = Date.now()
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setMotion(readMotion())
    const syncView = () => setView(readView())
    const tick = () => setSession(formatSession(Date.now() - started))

    media.addEventListener('change', syncMotion)
    window.addEventListener('resize', syncView)
    const timer = window.setInterval(tick, 1000)

    return () => {
      media.removeEventListener('change', syncMotion)
      window.removeEventListener('resize', syncView)
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!lastEvent) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFlash(null)
      return
    }

    setFlash(lastEvent)
    const timer = window.setTimeout(() => setFlash(null), FLASH_MS)
    return () => window.clearTimeout(timer)
  }, [lastEvent])

  return (
    <div className="system-status" role="status">
      <p className="system-status__boot">{status}</p>
      <p>ROUTE {pathname}</p>
      <p>MOTION {motion}</p>
      <p>VIEW {view}</p>
      <p>SESSION {session}</p>
      {lastEvent ? (
        <p className="system-status__last">LAST {lastEvent.line}</p>
      ) : null}
      {flash ? (
        <p aria-hidden="true" className="system-status__flash">
          {flash.line}
        </p>
      ) : null}
    </div>
  )
}
