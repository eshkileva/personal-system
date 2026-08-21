import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSystemBoot } from './useSystemBoot'

function setReducedMotion(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockReturnValue({
      matches,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  )
}

describe('useSystemBoot', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setReducedMotion(false)
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('progresses through the boot states', () => {
    const { result } = renderHook(() => useSystemBoot())

    expect(result.current).toBe('INITIALIZING')

    act(() => vi.advanceTimersByTime(600))
    expect(result.current).toBe('CONNECTING')

    act(() => vi.advanceTimersByTime(600))
    expect(result.current).toBe('SYSTEM READY')
  })

  it('skips boot when reduced motion is requested', () => {
    setReducedMotion(true)

    const { result } = renderHook(() => useSystemBoot())

    expect(result.current).toBe('SYSTEM READY')
    expect(vi.getTimerCount()).toBe(0)
  })

  it('cleans up pending timers when unmounted', () => {
    const { unmount } = renderHook(() => useSystemBoot())

    expect(vi.getTimerCount()).toBe(2)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
