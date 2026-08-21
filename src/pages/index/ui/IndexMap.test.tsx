import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { systemRoutes } from '../../../shared/config/routes'
import { IndexMap } from './IndexMap'

afterEach(cleanup)

describe('IndexMap', () => {
  it('navigates modules from the radar and marks the active route', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="*" element={<IndexMap />} />
        </Routes>
      </MemoryRouter>,
    )

    const radar = screen.getByRole('navigation', { name: /карта модулей/i })
    expect(radar).not.toHaveAttribute('aria-hidden')

    for (const route of systemRoutes) {
      expect(
        screen.getByRole('link', { name: new RegExp(`^${route.label}$`, 'i') }),
      ).toHaveAttribute('href', route.path)
    }

    expect(screen.getByRole('link', { name: /^profile$/i })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: /^index$/i })).not.toHaveAttribute(
      'aria-current',
    )
  })
})
