import { useEffect, useState } from 'react'

export type SystemBootState =
  | 'INITIALIZING'
  | 'CONNECTING'
  | 'SYSTEM READY'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useSystemBoot(): SystemBootState {
  const reducedMotion = prefersReducedMotion()
  const [status, setStatus] = useState<SystemBootState>(() =>
    reducedMotion ? 'SYSTEM READY' : 'INITIALIZING',
  )

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const connectingTimer = window.setTimeout(
      () => setStatus('CONNECTING'),
      600,
    )
    const readyTimer = window.setTimeout(
      () => setStatus('SYSTEM READY'),
      1_200,
    )

    return () => {
      window.clearTimeout(connectingTimer)
      window.clearTimeout(readyTimer)
    }
  }, [reducedMotion])

  return status
}
