import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

describe('localized personal positioning', () => {
  it('presents Yulia as a frontend developer with analytical direction', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText('FRONTEND-РАЗРАБОТЧИК')).toBeVisible()
    expect(
      screen.getByRole('heading', { name: /пишу код.*разбираю системы/i }),
    ).toBeVisible()
    expect(
      screen.getByRole('heading', { name: /чем я занимаюсь/i }),
    ).toBeVisible()
    expect(
      screen.getByRole('heading', { name: /что я развиваю/i }),
    ).toBeVisible()
    expect(screen.getByText('СИСТЕМНЫЙ АНАЛИЗ')).toBeVisible()
    expect(screen.getByText('AI-АВТОМАТИЗАЦИЯ')).toBeVisible()
    expect(screen.getByText('TELEGRAM-БОТЫ')).toBeVisible()
    expect(
      screen.getByRole('link', { name: /eshkileva69@gmail.com/i }),
    ).toHaveAttribute('href', 'mailto:eshkileva69@gmail.com')
  })
})
