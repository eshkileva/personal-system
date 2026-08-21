import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { systemRoutes } from '../../shared/config/routes'
import { AppRoutes } from './AppRoutes'

afterEach(() => {
  sessionStorage.clear()
  cleanup()
})

function renderRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

function stubReducedMotion() {
  const originalMatchMedia = window.matchMedia
  window.matchMedia = ((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia

  return () => {
    window.matchMedia = originalMatchMedia
  }
}

describe('AppRoutes', () => {
  it('lists system modules as file entries on the index', async () => {
    sessionStorage.setItem('personal-system:booted', '1')
    renderRoute('/')

    const moduleNav = await screen.findByRole('navigation', {
      name: /модули системы/i,
    })

    for (const route of systemRoutes) {
      expect(
        within(moduleNav).getByRole('link', {
          name: new RegExp(`system://${route.label}`, 'i'),
        }),
      ).toHaveAttribute('href', route.path)
    }

    expect(within(moduleNav).getByText('PATH')).toBeVisible()
    expect(within(moduleNav).getByText('STATE')).toBeVisible()
    expect(within(moduleNav).getAllByText('READY')).toHaveLength(
      systemRoutes.length,
    )
    expect(document.querySelector('[data-index-map]')).toHaveAttribute(
      'aria-hidden',
      'true',
    )

    await waitFor(() => {
      expect(document.title).toBe('Юлия Ешкилева — Personal System')
    })
  })

  it('shows a short index boot once per session', async () => {
    renderRoute('/')

    expect(
      await screen.findByRole('status', { name: /инициализация системы/i }),
    ).toBeVisible()
  })

  it('skips the index boot when reduced motion is requested', async () => {
    const restoreMatchMedia = stubReducedMotion()

    renderRoute('/')

    expect(
      await screen.findByRole('heading', { name: /personal system/i }),
    ).toBeVisible()
    expect(
      screen.getByRole('navigation', { name: /модули системы/i }),
    ).toBeVisible()
    expect(
      screen.queryByRole('status', { name: /инициализация системы/i }),
    ).not.toBeInTheDocument()

    restoreMatchMedia()
  })

  it('renders the profile as a dedicated system page', async () => {
    renderRoute('/profile')

    expect(
      await screen.findByRole('heading', {
        name: /пишу код.*разбираю системы/i,
      }),
    ).toBeVisible()
    expect(screen.getByText('FRONTEND-РАЗРАБОТЧИК')).toBeVisible()
    await waitFor(() => {
      expect(document.title).toBe(
        'Профиль — Юлия Ешкилева | Personal System',
      )
    })
  })

  it('lists projects as links to their instance routes', async () => {
    renderRoute('/projects')

    expect(
      await screen.findByRole('link', { name: /агент поиска работы/i }),
    ).toHaveAttribute('href', '/projects/job-agent')
    expect(
      screen.getByRole('link', { name: /веб эксперименты/i }),
    ).toHaveAttribute('href', '/projects/web-experiments')
  })

  it('renders the current fields on the stack page', async () => {
    renderRoute('/stack')

    expect(
      await screen.findByRole('heading', { name: /стек системы/i }),
    ).toBeVisible()
    expect(screen.getByText('FRONTEND')).toBeVisible()
    expect(screen.getByText('СИСТЕМНЫЙ АНАЛИЗ')).toBeVisible()
    expect(screen.getByText('AI-АВТОМАТИЗАЦИЯ')).toBeVisible()
    expect(screen.getByText('TELEGRAM-БОТЫ')).toBeVisible()
  })

  it('presents experience as a trajectory without employer claims', async () => {
    const { container } = renderRoute('/experience')

    expect(
      await screen.findByRole('heading', { name: /траектория роста/i }),
    ).toBeVisible()
    expect(container).not.toHaveTextContent(/работодатель|клиент/i)
  })

  it('keeps the contact email as a mailto link', async () => {
    renderRoute('/contact')

    expect(
      await screen.findByRole('link', { name: /eshkileva69@gmail.com/i }),
    ).toHaveAttribute('href', 'mailto:eshkileva69@gmail.com')
  })

  it('renders a system not-found page for unknown paths', async () => {
    renderRoute('/missing-module')

    expect(
      await screen.findByRole('heading', { name: /system not found/i }),
    ).toBeVisible()
  })

  it('keeps project not-found handling for unknown slugs', async () => {
    renderRoute('/projects/unknown')

    expect(
      await screen.findByRole('heading', { name: /проект не найден/i }),
    ).toBeVisible()
  })
})
