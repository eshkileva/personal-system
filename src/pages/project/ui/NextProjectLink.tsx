import { Link } from 'react-router-dom'
import type { Project } from '../../../entities/project/model/types'

type NextProjectLinkProps = {
  project?: Pick<Project, 'number' | 'slug' | 'title'>
}

export function NextProjectLink({ project }: NextProjectLinkProps) {
  if (!project) return null

  return (
    <aside className="@container border-t border-line px-5 py-14 sm:px-8 sm:py-20 xl:px-[6vw] xl:py-24">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Следующий проект: ${project.title.join(' ')}`}
        className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      >
        <span className="font-mono text-xs uppercase tracking-[0.13em] text-electric">
          Следующий проект / {project.number}
        </span>
        <span className="mt-5 flex min-w-0 items-end justify-between gap-4">
          <span className="min-w-0 break-words font-display text-[clamp(1.85rem,8cqw,6.5rem)] uppercase leading-[0.82] tracking-[-0.055em] text-ice">
            {project.title.join(' ')}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 font-display text-4xl text-electric"
          >
            →
          </span>
        </span>
      </Link>
    </aside>
  )
}
