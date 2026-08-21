import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getNextProject } from '../../../entities/project/model/selectors'
import type { Project } from '../../../entities/project/model/types'
import { projectPath } from '../../../shared/config/routes'

const statusLabel = {
  prototype: 'ПРОТОТИП',
  concept: 'КОНЦЕПЦИЯ',
  'in progress': 'В РАБОТЕ',
} as const

const instanceSections = [
  'Превью',
  'Обзор',
  'Роль',
  'Стек',
  'Архитектура',
  'Задачи',
  'Результат',
  'GitHub / Demo',
] as const

type ProjectViewerProps = {
  project: Project
  previewVisual: ReactNode
}

export function ProjectViewer({ project, previewVisual }: ProjectViewerProps) {
  const nextProject = getNextProject(project)
  const sectionCopy: Record<(typeof instanceSections)[number], ReactNode> = {
    Превью: (
      <>
        <p className="max-w-3xl text-lg leading-8 text-copy">{project.preview.label}</p>
        {previewVisual}
      </>
    ),
    Обзор: <CopyList items={project.overview} />,
    Роль: (
      <p className="max-w-3xl text-lg leading-8 text-copy">{project.role}</p>
    ),
    Стек: (
      <ul className="flex flex-wrap gap-3 p-0 font-mono text-xs uppercase tracking-[0.12em] text-project-meta">
        {project.stack.map((item) => (
          <li key={item} className="border border-line px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    ),
    Архитектура: <CopyList items={project.architecture} />,
    Задачи: <CopyList items={project.challenges} />,
    Результат: <CopyList items={project.results} />,
    'GitHub / Demo': <ProjectLinks links={project.links} />,
  }

  return (
    <>
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
            to="/projects"
            className="min-h-11 content-center text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
          >
            ← К списку проектов
          </Link>
          <span>
            Проект / {project.number} · {statusLabel[project.status]}
          </span>
          {nextProject ? (
            <Link
              to={projectPath(nextProject.slug)}
              aria-label={`Следующий проект: ${nextProject.title.join(' ')}`}
              className="min-h-11 content-center text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
            >
              Следующий проект →
            </Link>
          ) : null}
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
                <dd className="mt-2 text-electric">{statusLabel[project.status]}</dd>
              </div>
              <div>
                <dt className="text-label">Роль</dt>
                <dd className="mt-2 leading-6 text-project-meta">{project.role}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 xl:max-w-[90rem] xl:px-[6vw]">
        {instanceSections.map((heading) => (
          <InstanceSection
            key={heading}
            heading={heading}
            decorative={heading === 'Превью'}
          >
            {sectionCopy[heading]}
          </InstanceSection>
        ))}
      </div>
    </>
  )
}

function InstanceSection({
  heading,
  children,
  decorative = false,
}: {
  heading: string
  children: ReactNode
  decorative?: boolean
}) {
  return (
    <section
      data-project-layer
      className={
        decorative
          ? 'project-hero relative overflow-hidden border-b border-line py-16 sm:py-20 xl:py-24'
          : 'relative border-b border-line py-16 sm:py-20 xl:py-24'
      }
    >
      <h2 className="font-display text-[clamp(2.25rem,10cqw,5.75rem)] uppercase leading-[0.82] tracking-[-0.06em] text-ice">
        {heading}
      </h2>
      <div className="relative z-1 mt-8">{children}</div>
    </section>
  )
}

function ProjectLinks({ links }: { links: Project['links'] }) {
  const { github, demo } = links

  if (!github && !demo) {
    return (
      <p className="font-mono text-sm tracking-[0.08em] text-code">
        prototype / local
      </p>
    )
  }

  return (
    <ul className="flex flex-wrap gap-4 p-0 font-mono text-sm tracking-[0.08em]">
      {github ? (
        <li>
          <a
            href={github}
            className="text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
          >
            GitHub
          </a>
        </li>
      ) : null}
      {demo ? (
        <li>
          <a
            href={demo}
            className="text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
          >
            Demo
          </a>
        </li>
      ) : null}
    </ul>
  )
}

function CopyList({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-7 text-copy sm:text-lg sm:leading-8">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
}
