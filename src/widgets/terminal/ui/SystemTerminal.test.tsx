import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { SystemTerminal } from './SystemTerminal'

afterEach(cleanup)

function renderTerminal() {
  return render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route
          path="/profile"
          element={<SystemTerminal bootStatus="SYSTEM READY" />}
        />
        <Route path="/stack" element={<h1>stack outlet</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SystemTerminal', () => {
  it('runs help from the native command input and announces output', async () => {
    const { container } = renderTerminal()
    const pre = container.querySelector('.system-terminal__pre') as HTMLElement

    expect(await within(pre).findByText(/юлия ешкилева/i)).toBeVisible()

    const input = screen.getByRole('textbox', { name: /команда терминала/i })
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input.closest('form')!)

    expect(await within(pre).findByText(/diagnostics/i)).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent(/diagnostics/i)
  })

  it('navigates with open and refuses sudo', async () => {
    const { container } = renderTerminal()
    const pre = container.querySelector('.system-terminal__pre') as HTMLElement
    const input = screen.getByRole('textbox', { name: /команда терминала/i })

    fireEvent.change(input, { target: { value: 'sudo' } })
    fireEvent.submit(input.closest('form')!)
    expect(await within(pre).findByText(/отказ/i)).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent(/отказ/i)

    fireEvent.change(input, { target: { value: 'open /stack' } })
    fireEvent.submit(input.closest('form')!)
    expect(await screen.findByRole('heading', { name: /stack outlet/i })).toBeVisible()
  })

  it('renders an on-page terminal region, not a modal overlay', () => {
    renderTerminal()
    const terminal = screen.getByRole('region', { name: /терминал/i })
    expect(terminal).not.toHaveAttribute('aria-modal')
    expect(terminal.querySelector('.system-terminal__chassis')).not.toBeNull()
    expect(terminal.querySelector('.system-terminal__space')).toBeNull()
  })
})
