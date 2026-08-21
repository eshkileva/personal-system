import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { SystemShell } from './SystemShell'

const modulePaths = [
  '/profile',
  '/projects',
  '/stack',
  '/experience',
  '/contact',
] as const

afterEach(cleanup)

describe('SystemShell navigation', () => {
  it('exposes system navigation without fake hardware metrics', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route path="/" element={<div>stub outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('navigation', { name: /система|навигация/i }),
    ).not.toHaveLength(0)

    for (const path of modulePaths) {
      expect(
        screen
          .getAllByRole('link', { name: new RegExp(path.slice(1), 'i') })
          .some((link) => link.getAttribute('href') === path),
      ).toBe(true)
    }

    expect(screen.queryByText(/cpu|ram/i)).not.toBeInTheDocument()
    expect(screen.getByText('INITIALIZING')).toBeInTheDocument()
  })

  it('marks active links and opens the full module list', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route path="/profile" element={<div>profile outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen
        .getAllByRole('link', { name: /profile/i })
        .some((link) => link.getAttribute('aria-current') === 'page'),
    ).toBe(true)

    fireEvent.click(screen.getByRole('button', { name: /все разделы/i }))
    expect(
      screen.getByRole('dialog', { name: /все разделы/i }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /закрыть/i }))
    expect(
      screen.queryByRole('dialog', { name: /все разделы/i }),
    ).not.toBeInTheDocument()
  })
})
