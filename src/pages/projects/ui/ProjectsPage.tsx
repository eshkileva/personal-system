import { Link } from 'react-router-dom'
import { projects } from '../../../entities/project/model/projects'
import { projectPath } from '../../../shared/config/routes'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/projects')

const statusLabel = {
  prototype: 'ПРОТОТИП',
  concept: 'КОНЦЕПЦИЯ',
  'in progress': 'В РАБОТЕ',
} as const

export function ProjectsPage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="02">ПРОЕКТЫ</SectionLabel>
      <h1
        aria-label="СИСТЕМНЫЕ ИНСТАНСЫ"
        className="mt-8 font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.92] tracking-[0.02em]"
      >
        СИСТЕМНЫЕ
        <br />
        <span className="text-outline-strong">ИНСТАНСЫ</span>
      </h1>
      <ul className="instance-list">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link className="instance-window" to={projectPath(project.slug)}>
              <span className="instance-window__chrome">
                <span aria-hidden="true" className="instance-window__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>ADDR {projectPath(project.slug)}</span>
                <span className="instance-window__status">
                  {statusLabel[project.status]}
                </span>
              </span>
              <span className="instance-window__body">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-project-meta">
                  {project.eyebrow}
                </span>
                <h2 className="mt-6 font-display text-[clamp(2rem,7vw,5rem)] uppercase leading-[0.96] tracking-[0.04em]">
                  {project.title.join(' ')}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-copy-soft">
                  {project.thesis}
                </p>
                <span className="mt-8 block font-mono text-xs uppercase tracking-[0.14em] text-electric">
                  ОТКРЫТЬ ИНСТАНС <span aria-hidden="true">↗</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  )
}
