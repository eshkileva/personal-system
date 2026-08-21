import { cleanup, fireEvent, render, screen } from '@testing-library/react'
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
    renderTerminal()

    const input = screen.getByRole('textbox', { name: /команда терминала/i })
    expect(input).toHaveFocus()

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(input.closest('form')!)

    expect(await screen.findByText(/whoami/i)).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent(/help/i)
  })

  it('navigates with open and refuses sudo', async () => {
    renderTerminal()
    const input = screen.getByRole('textbox', { name: /команда терминала/i })

    fireEvent.change(input, { target: { value: 'sudo' } })
    fireEvent.submit(input.closest('form')!)
    expect(await screen.findByText(/отказ/i)).toBeVisible()

    fireEvent.change(input, { target: { value: 'open /stack' } })
    fireEvent.submit(input.closest('form')!)
    expect(await screen.findByRole('heading', { name: /stack outlet/i })).toBeVisible()
  })
})
