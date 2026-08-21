import { describe, expect, it } from 'vitest'
import { playWhoamiIntro, WHOAMI_COMMAND } from './playWhoamiIntro'

describe('playWhoamiIntro', () => {
  it('types whoami character by character', async () => {
    const typed: string[] = []
    const result = await playWhoamiIntro({
      write: (chunk) => typed.push(chunk),
      wait: async () => undefined,
      delayMs: 0,
      isCancelled: () => false,
    })

    expect(typed.join('')).toBe(WHOAMI_COMMAND)
    expect(result).toBe('typed')
  })

  it('stops when cancelled', async () => {
    const typed: string[] = []
    let seen = 0
    const result = await playWhoamiIntro({
      write: (chunk) => typed.push(chunk),
      wait: async () => undefined,
      delayMs: 0,
      isCancelled: () => {
        seen += 1
        return seen > 2
      },
    })

    expect(typed.join('').length).toBeLessThan(WHOAMI_COMMAND.length)
    expect(result).toBe('cancelled')
  })
})
