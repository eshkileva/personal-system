import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SystemShell } from './SystemShell'

const modulePaths = [
  '/profile',
  '/projects',
  '/stack',
  '/experience',
  '/contact',
] as const

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
      screen.getByRole('navigation', { name: /система|навигация/i }),
    ).toBeInTheDocument()

    for (const path of modulePaths) {
      expect(
        screen.getByRole('link', { name: new RegExp(path.slice(1), 'i') }),
      ).toHaveAttribute('href', path)
    }

    expect(screen.queryByText(/cpu|ram/i)).not.toBeInTheDocument()
  })
})
