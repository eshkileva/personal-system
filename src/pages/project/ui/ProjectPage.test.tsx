import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../../../app/router/AppRoutes'
import { HomePage } from '../../home/ui/HomePage'

afterEach(cleanup)

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
    expect(backLink).toHaveAttribute('href', '/')
    expect(
      within(backLink).getByText('↗', { selector: '[aria-hidden="true"]' }),
    ).toBeVisible()
  })

  it('hides the decorative terminal visual from assistive technology', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(
      container.querySelector('[data-terminal-visual][aria-hidden="true"]'),
    ).not.toBeNull()
  })

  it('links the home project cards to their dossiers', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /открыть досье агента поиска работы/i }))
      .toHaveAttribute('href', '/projects/job-agent')
    expect(
      screen.getByRole('link', {
        name: /открыть досье веб-экспериментов/i,
      }),
    ).toHaveAttribute('href', '/projects/web-experiments')
  })

  it('renders the wildcard route fallback', () => {
    render(
      <MemoryRouter initialEntries={['/not-a-project-route']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByText(/проект не найден/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /к списку проектов/i }))
      .toHaveAttribute('href', '/')
  })

  it('hides decorative project-card glyphs from screen readers', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    const webExperimentsLink = screen.getByRole('link', {
      name: /открыть досье веб-экспериментов/i,
    })
    expect(
      within(webExperimentsLink).getByText('↗', { selector: '[aria-hidden="true"]' }),
    ).toBeVisible()
  })

  it('exposes chapter state when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const chapterNav = screen.getByRole('navigation', {
      name: /главы проекта/i,
    })
    expect(within(chapterNav).getByRole('link', { name: /01.*идея/i }))
      .toHaveAttribute('aria-current', 'location')
    expect(within(chapterNav).getByRole('list')).toHaveClass('grid-cols-2')

    vi.unstubAllGlobals()
  })

  it('renders the complete dossier structure', () => {
    document.title = 'Юлия Ешкилева — Frontend-разработчик'
    const { unmount } = render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const chapterNav = screen.getByRole('navigation', {
      name: /главы проекта/i,
    })
    expect(chapterNav).toBeVisible()
    expect(within(chapterNav).getByRole('link', { name: /идея/i }))
      .toHaveAttribute('aria-current', 'location')
    expect(screen.getByRole('heading', { name: /проблема/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /схема системы/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /ключевые решения/i })).toBeVisible()
    expect(screen.getByRole('heading', { name: /результат/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /следующий проект/i })).toHaveAttribute(
      'href',
      '/projects/web-experiments',
    )
    expect(document.title).toBe('Агент поиска работы — Досье проекта')

    unmount()
    expect(document.title).toBe('Юлия Ешкилева — Frontend-разработчик')
  })

  it('restores the home title when navigating from a project', () => {
    document.title = 'Юлия Ешкилева — Frontend-разработчик'
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
      screen.getByRole('heading', { name: /пишу код.*разбираю системы/i }),
    ).toBeVisible()
    expect(document.title).toBe('Юлия Ешкилева — Frontend-разработчик')
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

  it('selects the decorative signal for each project variant', () => {
    const { container, unmount } = render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const jobSignal = container.querySelector(
      '[data-project-signal="terminal"]',
    )
    expect(jobSignal).toHaveAttribute('aria-hidden', 'true')
    expect(
      jobSignal?.querySelectorAll('[data-pipeline-node]'),
    ).toHaveLength(5)
    expect(
      Array.from(
        jobSignal?.querySelectorAll('[data-pipeline-node]') ?? [],
        (node) => node.textContent?.replace(/^\d+/, ''),
      ),
    ).toEqual([
      'СБОР',
      'НОРМАЛИЗАЦИЯ',
      'ИЗВЛЕЧЕНИЕ',
      'РАНЖИРОВАНИЕ',
      'TELEGRAM',
    ])
    expect(
      Array.from(
        jobSignal?.querySelectorAll('[data-terminal-line]') ?? [],
        (line) => line.textContent,
      ),
    ).toEqual([
      '> вакансии собраны',
      '> данные нормализованы',
      '> требования извлечены',
      '> совпадения объяснены',
      '> Telegram / прототип',
    ])

    unmount()

    const webPage = render(
      <MemoryRouter initialEntries={['/projects/web-experiments']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const webSignal = webPage.container.querySelector(
      '[data-project-signal="wave"]',
    )
    expect(webSignal).toHaveAttribute('aria-hidden', 'true')
    expect(
      webSignal?.querySelectorAll('[data-experiment-window]'),
    ).toHaveLength(3)
  })

  it('tracks the active chapter with one observer and disconnects it', () => {
    let observerCallback: IntersectionObserverCallback | undefined
    const observe = vi.fn()
    const disconnect = vi.fn()
    const observer = vi.fn(function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      observerCallback = callback
      expect(options?.rootMargin).toBe('-25% 0px -60%')
      return { observe, disconnect }
    })
    vi.stubGlobal('IntersectionObserver', observer)

    const { unmount } = render(
      <MemoryRouter initialEntries={['/projects/job-agent']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(observer).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledTimes(4)

    const systemSection = document.getElementById('system')
    expect(systemSection).not.toBeNull()
    if (!systemSection) throw new Error('Expected the system chapter to render')
    act(() => {
      observerCallback?.(
        [
          {
            isIntersecting: true,
            target: systemSection,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      )
    })

    const chapterNav = screen.getByRole('navigation', {
      name: /главы проекта/i,
    })
    expect(within(chapterNav).getByRole('link', { name: /система/i }))
      .toHaveAttribute('aria-current', 'location')

    unmount()
    expect(disconnect).toHaveBeenCalledTimes(1)
    vi.unstubAllGlobals()
  })
})
