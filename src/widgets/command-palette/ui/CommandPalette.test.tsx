import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { SystemShell } from '../../../app/shell/SystemShell'

afterEach(cleanup)

function renderShell(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<SystemShell />}>
          <Route path="/" element={<h1>stub outlet</h1>} />
          <Route path="/profile" element={<h1>profile outlet</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

function openPalette(keyInit: KeyboardEventInit = { key: 'k', metaKey: true }) {
  fireEvent.keyDown(window, keyInit)
  return screen.getByRole('dialog', { name: /command palette|палитра команд/i })
}

const konami = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
] as const

describe('CommandPalette', () => {
  it('opens on Ctrl/Cmd+K, filters by query, and links to the matching route', () => {
    renderShell()

    expect(
      screen.queryByRole('dialog', { name: /command palette|палитра команд/i }),
    ).not.toBeInTheDocument()

    const dialog = openPalette()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText(/LAST palette open/i)).toBeVisible()

    fireEvent.change(within(dialog).getByRole('searchbox'), {
      target: { value: 'profile' },
    })

    expect(
      within(dialog).getByRole('link', { name: /profile/i }),
    ).toHaveAttribute('href', '/profile')
  })

  it('opens on Control+K as well as Meta+K', () => {
    renderShell()
    expect(openPalette({ key: 'k', ctrlKey: true })).toBeInTheDocument()
  })

  it('closes on Escape and restores focus to the opener', () => {
    renderShell()

    const opener = document.createElement('button')
    opener.textContent = 'focus seed'
    document.body.append(opener)
    opener.focus()

    const dialog = openPalette()
    expect(within(dialog).getByRole('searchbox')).toHaveFocus()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(
      screen.queryByRole('dialog', { name: /command palette|палитра команд/i }),
    ).not.toBeInTheDocument()
    expect(opener).toHaveFocus()

    opener.remove()
  })

  it('shows the current boot status from the status command', () => {
    renderShell()
    const dialog = openPalette()

    fireEvent.change(within(dialog).getByRole('searchbox'), {
      target: { value: 'status' },
    })
    fireEvent.click(within(dialog).getByRole('button', { name: /status/i }))

    expect(within(dialog).getByText('INITIALIZING')).toBeVisible()
  })

  it('opens honest diagnostics without fake hardware metrics', () => {
    renderShell('/profile')
    const dialog = openPalette()

    fireEvent.change(within(dialog).getByRole('searchbox'), {
      target: { value: 'diagnostics' },
    })
    fireEvent.click(within(dialog).getByRole('button', { name: /diagnostics/i }))

    const diagnostics = screen.getByRole('dialog', {
      name: /diagnostics|диагностика/i,
    })
    expect(diagnostics).toHaveTextContent('/profile')
    expect(diagnostics).toHaveTextContent(/reduced-motion/i)
    expect(diagnostics).toHaveTextContent(/pointer/i)
    expect(diagnostics).not.toHaveTextContent(/cpu|ram/i)
  })

  it('opens diagnostics from the Konami sequence without audio or a game', () => {
    renderShell()

    for (const key of konami) {
      fireEvent.keyDown(window, { key })
    }

    expect(
      screen.getByRole('dialog', { name: /diagnostics|диагностика/i }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('application')).not.toBeInTheDocument()
    expect(document.querySelector('audio')).toBeNull()
  })

  it('links terminal to the on-page console instead of opening an overlay', () => {
    renderShell('/profile')
    const dialog = openPalette()

    fireEvent.change(within(dialog).getByRole('searchbox'), {
      target: { value: 'terminal' },
    })

    expect(
      within(dialog).getByRole('link', { name: /terminal/i }),
    ).toHaveAttribute('href', '/')
    expect(
      screen.queryByRole('dialog', { name: /terminal|терминал/i }),
    ).not.toBeInTheDocument()
  })
})
