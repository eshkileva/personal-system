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
          element={
            <SystemTerminal bootStatus="SYSTEM READY" onClose={() => {}} />
          }
        />
        <Route path="/stack" element={<h1>stack outlet</h1>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SystemTerminal', () => {
  it('runs help from the native command input and announces output', async () => {
    const { container } = renderTerminal()
    const pre = container.querySelector('.system-terminal__pre')!

    const input = screen.getByRole('textbox', { name: /команда терминала/i })
    expect(input).toHaveFocus()

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input.closest('form')!)

    expect(await within(pre).findByText(/whoami/i)).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent(/whoami/i)
  })

  it('navigates with open and refuses sudo', async () => {
    const { container } = renderTerminal()
    const pre = container.querySelector('.system-terminal__pre')!
    const input = screen.getByRole('textbox', { name: /команда терминала/i })

    fireEvent.change(input, { target: { value: 'sudo' } })
    fireEvent.submit(input.closest('form')!)
    expect(await within(pre).findByText(/отказ/i)).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent(/отказ/i)

    fireEvent.change(input, { target: { value: 'open /stack' } })
    fireEvent.submit(input.closest('form')!)
    expect(await screen.findByRole('heading', { name: /stack outlet/i })).toBeVisible()
  })
})
