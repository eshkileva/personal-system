import { useEffect, useSyncExternalStore } from 'react'
import type { SystemBootState } from '../../system-boot/model/useSystemBoot'
import {
  getLastSessionEvent,
  pushSessionEvent,
  subscribeSessionLog,
} from './sessionLog'

export function useSessionLog() {
  return useSyncExternalStore(
    subscribeSessionLog,
    getLastSessionEvent,
    getLastSessionEvent,
  )
}

export function useSessionJournal(
  pathname: string,
  bootStatus: SystemBootState,
) {
  useEffect(() => {
    pushSessionEvent(`route ${pathname}`)
  }, [pathname])

  useEffect(() => {
    pushSessionEvent(`boot ${bootStatus}`)
  }, [bootStatus])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      pushSessionEvent(`motion ${media.matches ? 'REDUCE' : 'LIVE'}`)
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
}
