import { describe, expect, it } from 'vitest'
import {
  getLastSessionEvent,
  pushSessionEvent,
  resetSessionLog,
} from './sessionLog'

describe('sessionLog', () => {
  it('keeps the last honest event and drops consecutive duplicates', () => {
    resetSessionLog()
    pushSessionEvent('route /')
    pushSessionEvent('route /')
    pushSessionEvent('boot INITIALIZING')
    pushSessionEvent('  ')

    expect(getLastSessionEvent()?.line).toBe('boot INITIALIZING')
    expect(getLastSessionEvent()?.stamp).toMatch(/^\d{2}:\d{2}$/)
    expect(getLastSessionEvent()?.line).not.toMatch(/cpu|ram/i)
  })
})
