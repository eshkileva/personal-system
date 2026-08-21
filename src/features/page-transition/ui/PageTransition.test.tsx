import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { PageTransition } from './PageTransition'

afterEach(cleanup)

function stubReducedMotion(matches: boolean) {
  const original = window.matchMedia
  window.matchMedia = ((query: string) => ({
    matches: matches && query.includes('prefers-reduced-motion: reduce'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia

  return () => {
    window.matchMedia = original
  }
}

describe('PageTransition', () => {
  it('puts destination content in the DOM immediately', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PageTransition>
                <h1>profile destination</h1>
              </PageTransition>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /profile destination/i }),
    ).toBeVisible()
  })

  it('skips motion when reduced motion is requested', () => {
    const restore = stubReducedMotion(true)

    render(
      <MemoryRouter initialEntries={['/']}>
        <PageTransition>
          <p>ready content</p>
        </PageTransition>
      </MemoryRouter>,
    )

    expect(screen.getByText('ready content')).toBeVisible()
    expect(screen.getByTestId('page-transition')).toHaveAttribute(
      'data-page-motion',
      'reduce',
    )

    restore()
  })
})
