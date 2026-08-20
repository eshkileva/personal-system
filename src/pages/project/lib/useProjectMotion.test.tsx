import { render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useProjectMotion } from './useProjectMotion'

const motionQuery =
  '(min-width: 1280px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

type MotionSetup = () => void | (() => void)

const matchMediaState = vi.hoisted(() => {
  let setup: MotionSetup | undefined
  let cleanup: (() => void) | undefined

  return {
    add: vi.fn((_query: string, nextSetup: MotionSetup) => {
      setup = nextSetup
    }),
    revert: vi.fn(() => {
      cleanup?.()
      cleanup = undefined
    }),
    activate() {
      cleanup = setup?.() ?? undefined
    },
    deactivate() {
      cleanup?.()
      cleanup = undefined
    },
    reset() {
      setup = undefined
      cleanup = undefined
    },
  }
})

const gsapMocks = vi.hoisted(() => ({
  contextRevert: vi.fn(),
  registerPlugin: vi.fn(),
}))

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: gsapMocks.registerPlugin,
    matchMedia: vi.fn(() => ({
      add: matchMediaState.add,
      revert: matchMediaState.revert,
    })),
    context: vi.fn((setup: MotionSetup) => {
      const cleanup = setup()
      return {
        revert: () => {
          cleanup?.()
          gsapMocks.contextRevert()
        },
      }
    }),
    from: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    quickTo: vi.fn(() => vi.fn()),
    utils: {
      toArray: vi.fn(() => []),
    },
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

function MotionHarness({ enabled = true }: { enabled?: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  useProjectMotion(rootRef, enabled)

  return (
    <main ref={rootRef}>
      <div data-project-signal />
    </main>
  )
}

afterEach(() => {
  matchMediaState.reset()
  vi.clearAllMocks()
})

describe('useProjectMotion', () => {
  it('creates and reverts scoped motion as media eligibility changes', () => {
    const { container } = render(<MotionHarness />)
    const root = container.querySelector('main')
    if (!root) throw new Error('Expected motion root')
    const addEventListener = vi.spyOn(root, 'addEventListener')
    const removeEventListener = vi.spyOn(root, 'removeEventListener')

    expect(matchMediaState.add).toHaveBeenCalledWith(
      motionQuery,
      expect.any(Function),
    )
    expect(addEventListener).not.toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    )

    matchMediaState.activate()
    expect(addEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    )

    matchMediaState.deactivate()
    expect(removeEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function),
    )
    expect(gsapMocks.contextRevert).toHaveBeenCalledTimes(1)
  })

  it('reverts active media-query motion on unmount', () => {
    const { unmount } = render(<MotionHarness />)

    matchMediaState.activate()
    unmount()

    expect(matchMediaState.revert).toHaveBeenCalledTimes(1)
    expect(gsapMocks.contextRevert).toHaveBeenCalledTimes(1)
  })
})
