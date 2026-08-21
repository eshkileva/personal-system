import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../../app/router/AppRoutes'

afterEach(cleanup)

const instanceSectionHeadings = [
  'Превью',
  'Обзор',
  'Роль',
  'Стек',
  'Архитектура',
  'Задачи',
  'Результат',
  'GitHub / Demo',
]

describe('project routes', () => {
  it('renders the localized Job Agent dossier from its slug', () => {
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { name: /агент поиска работы/i }),
    ).toBeVisible()
    expect(screen.getByText('ПРОТОТИП', { selector: 'dd' })).toBeVisible()
    expect(
      screen.getByText(
        'Прототип автоматизации: собирает данные о вакансиях, объясняет ранжирование и доставляет результаты через Telegram.',
      ),
    ).toBeVisible()
  })

  it('renders the in-progress Web Experiments positioning', () => {
    render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /веб эксперименты/i }),
    ).toBeVisible()
    expect(screen.getByText('В РАБОТЕ', { selector: 'dd' })).toBeVisible()
    expect(
      screen.getByText(
        'Изолированные компоненты на React и TypeScript для практики адаптивной композиции, типографики и осмысленного движения.',
      ),
    ).toBeVisible()
  })

  it('renders a useful fallback for an unknown slug', () => {
    render(
      <MemoryRouter initialEntries={['/projects/unknown']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.getByText(/проект не найден/i)).toBeVisible()
    const backLink = screen.getByRole('link', { name: /к списку проектов/i })
    expect(backLink).toHaveAttribute('href', '/projects')
    expect(
      within(backLink).getByText('↗', { selector: '[aria-hidden="true"]' }),
    ).toBeVisible()
  })

  it('renders the instance sections in order', () => {
    document.title = 'Юлия Ешкилева — Personal System'
    const { unmount } = render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
    ).toEqual(instanceSectionHeadings)
    expect(screen.getByText('prototype / local')).toBeVisible()
    expect(screen.queryByRole('link', { name: /github|demo/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /следующий проект/i })).toHaveAttribute(
      'href',
      '/projects/web-experiments',
    )
    expect(document.title).toBe('Агент поиска работы — Досье проекта')

    unmount()
    expect(document.title).toBe('Юлия Ешкилева — Personal System')
  })

  it('keeps the preview visual decorative besides heading and label', () => {
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Превью' })).toBeVisible()
    expect(screen.getByText('Конвейер вакансий')).toBeVisible()
    expect(
      screen.getByRole('heading', { name: 'Превью' }).closest('section'),
    ).toContainElement(screen.getByText('Конвейер вакансий'))
  })

  it('opens the projects index when leaving a dossier', async () => {
    document.title = 'Юлия Ешкилева — Personal System'
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(document.title).toBe('Агент поиска работы — Досье проекта')
    fireEvent.click(
      screen.getByRole('link', { name: /к списку проектов/i }),
    )

    expect(
      await screen.findByRole('heading', { name: /системные инстансы/i }),
    ).toBeVisible()
    expect(screen.getAllByText(/открыть инстанс/i)).toHaveLength(2)
    expect(document.title).toBe(
      'Проекты — Personal System | Юлия Ешкилева',
    )
  })

  it('does not hide dossier content before animation', () => {
    render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /веб эксперименты/i }),
    ).toBeVisible()
    expect(screen.getByRole('heading', { name: /результат/i })).toBeVisible()
  })

  it('keeps dossier content visible when reduced motion is requested', () => {
    const matchMedia = vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }))
    const originalMatchMedia = window.matchMedia
    window.matchMedia = matchMedia

    render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(matchMedia).toHaveBeenCalledWith(
      '(min-width: 1280px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    expect(
      screen.getByRole('heading', { name: /веб эксперименты/i }),
    ).toBeVisible()
    expect(screen.getByRole('heading', { name: /результат/i })).toBeVisible()

    window.matchMedia = originalMatchMedia
  })

  it('lets the keyboard operate the Job Agent pipeline preview', () => {
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByText(/локальный прототип, не live demo/i)).toBeVisible()
    const collect = screen.getByRole('button', { name: /сбор/i })
    expect(collect).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(/собирать данные о вакансиях/i)).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: /telegram/i }))
    expect(screen.getByRole('button', { name: /telegram/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText(/результаты, состояния обработки/i)).toBeVisible()
    expect(screen.getByText('> Telegram / прототип')).toBeVisible()
  })

  it('selects the decorative signal for each project variant', () => {
    const webPage = render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const webSignal = webPage.container.querySelector(
      '[data-project-signal="wave"]',
    )
    expect(webSignal).not.toHaveAttribute('aria-hidden')
    expect(
      webSignal?.querySelectorAll('[data-experiment-window]'),
    ).toHaveLength(3)
  })

  it('lets the keyboard switch Web Experiments hypotheses', () => {
    render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByText(/локальный прототип, не live demo/i)).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: /эксперимент b/i }))
    expect(screen.getByRole('button', { name: /эксперимент b/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    const signal = document.querySelector('[data-project-signal="wave"]')
    expect(signal).not.toBeNull()
    expect(
      within(signal as HTMLElement).getByText(/контейнерная типографика/i),
    ).toBeVisible()
  })

  it('does not render the old chapter dossier UI', () => {
    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole('navigation', { name: /главы проекта/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /проблема/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /схема системы/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /ключевые решения/i }),
    ).not.toBeInTheDocument()
  })
})
