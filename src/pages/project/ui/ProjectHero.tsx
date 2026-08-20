import { Link } from 'react-router-dom'
import type { Project } from '../../../entities/project/model/types'
import { JobAgentSignal } from './signals/JobAgentSignal'
import { WebExperimentsSignal } from './signals/WebExperimentsSignal'

type ProjectHeroProps = {
  project: Pick<
    Project,
    | 'eyebrow'
    | 'number'
    | 'slug'
    | 'stack'
    | 'status'
    | 'thesis'
    | 'title'
    | 'variant'
  >
  nextProjectSlug?: Project['nextProjectSlug']
}

export function ProjectHero({ project, nextProjectSlug }: ProjectHeroProps) {
  const statusLabel = {
    prototype: 'ПРОТОТИП',
    concept: 'КОНЦЕПЦИЯ',
    'in progress': 'В РАБОТЕ',
  }[project.status]
  const signal =
    project.variant === 'terminal' ? (
      <JobAgentSignal />
    ) : (
      <WebExperimentsSignal />
    )

  return (
    <header
      data-project-layer
      className="project-hero @container relative overflow-hidden border-b border-line px-5 py-6 sm:px-8 sm:py-10 xl:px-[6vw] xl:py-12"
      style={{ viewTransitionName: `project-card-${project.slug}` }}
    >
      <nav
        aria-label="Навигация по проекту"
        className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.13em] text-label"
      >
        <Link
          to="/"
          className="min-h-11 content-center text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
        >
          ← К списку проектов
        </Link>
        <span>
          Проект / {project.number} · {statusLabel}
        </span>
        {nextProjectSlug && (
          <Link
            to={`/projects/${nextProjectSlug}`}
            aria-label="Открыть следующее досье"
            className="min-h-11 content-center text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
          >
            Следующий проект →
          </Link>
        )}
      </nav>

      <div className="relative z-1 grid gap-8 pt-10 sm:pt-14 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] xl:items-end">
        <div data-project-layer className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-label">
            {project.eyebrow}
          </p>
          <h1
            aria-label={project.title.join(' ')}
            className="project-title mt-5 min-w-0 max-w-full font-display text-[clamp(2rem,10.5cqw,8.5rem)] uppercase leading-[0.84] tracking-[-0.03em] text-ice"
          >
            <span data-project-title-layer className="block wrap-break-word">
              {project.title[0]}
            </span>
            <span
              data-project-title-layer
              className="text-outline-strong block wrap-break-word"
            >
              {project.title[1]}
            </span>
          </h1>
        </div>

        <div
          data-project-layer
          className="max-w-xl border-l border-line pl-5 sm:pl-7"
        >
          <p className="text-[clamp(1.125rem,3cqw,1.65rem)] leading-[1.35] tracking-[-0.025em] text-copy">
            {project.thesis}
          </p>
          <dl className="mt-7 grid gap-5 font-mono text-xs uppercase tracking-[0.11em] sm:grid-cols-2">
            <div>
              <dt className="text-label">Статус</dt>
              <dd className="mt-2 text-electric">{statusLabel}</dd>
            </div>
            <div>
              <dt className="text-label">Стек</dt>
              <dd className="project-technical-id mt-2 leading-6 text-project-meta">
                {project.stack.join(' / ')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {signal}
    </header>
  )
}
