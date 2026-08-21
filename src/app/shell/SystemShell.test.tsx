import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { lazy } from 'react'
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
    expect(
      screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href') === '/')
        .every((link) => link.getAttribute('aria-current') !== 'page'),
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

  it('closes the full module list on Escape', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route path="/" element={<div>stub outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const opener = screen.getByRole('button', { name: /все разделы/i })
    fireEvent.click(opener)
    expect(
      screen.getByRole('dialog', { name: /все разделы/i }),
    ).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(
      screen.queryByRole('dialog', { name: /все разделы/i }),
    ).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('keeps palette and nav keyboard reachable', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route path="/profile" element={<div>profile outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    const navLinks = screen.getAllByRole('link').filter((link) =>
      ['/', '/profile', '/projects', '/stack', '/experience', '/contact'].includes(
        link.getAttribute('href') ?? '',
      ),
    )
    expect(navLinks.length).toBeGreaterThan(0)
    expect(
      navLinks.every(
        (link) =>
          link.tabIndex >= 0 && link.getAttribute('aria-disabled') !== 'true',
      ),
    ).toBe(true)

    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    const palette = screen.getByRole('dialog', {
      name: /command palette|палитра команд/i,
    })
    expect(palette).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: /поиск команд/i })).toHaveFocus()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(
      screen.queryByRole('dialog', {
        name: /command palette|палитра команд/i,
      }),
    ).not.toBeInTheDocument()
  })

  it('keeps navigation and status mounted while a lazy outlet loads', () => {
    const PendingPage = lazy(() => new Promise<{ default: () => null }>(() => {}))

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route path="/profile" element={<PendingPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('navigation', { name: /система|навигация/i }),
    ).not.toHaveLength(0)
    expect(screen.getByText('INITIALIZING')).toBeInTheDocument()
    expect(screen.getByText('ЗАГРУЗКА МОДУЛЯ')).toBeVisible()
  })

  it('does not mark a module index active on an instance route', () => {
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <Routes>
          <Route element={<SystemShell />}>
            <Route
              path="/projects/:slug"
              element={<div>project instance outlet</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href') === '/projects')
        .every((link) => link.getAttribute('aria-current') !== 'page'),
    ).toBe(true)
  })
})
