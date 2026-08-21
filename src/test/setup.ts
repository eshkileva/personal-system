import '@testing-library/jest-dom/vitest'
import { configure } from '@testing-library/react'
import { afterEach } from 'vitest'
import { resetSessionLog } from '../features/session-log/model/sessionLog'

configure({ asyncUtilTimeout: 4000 })

afterEach(() => {
  resetSessionLog()
  sessionStorage.removeItem('personal-system:whoami')
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
