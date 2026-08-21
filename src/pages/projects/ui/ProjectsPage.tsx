import { Link } from 'react-router-dom'
import { projects } from '../../../entities/project/model/projects'
import { projectPath } from '../../../shared/config/routes'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/projects')

export function ProjectsPage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="02">ПРОЕКТЫ</SectionLabel>
      <h1
        aria-label="СИСТЕМНЫЕ ИНСТАНСЫ"
        className="mt-8 font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.84] tracking-[-0.04em]"
      >
        СИСТЕМНЫЕ
        <br />
        <span className="text-outline-strong">ИНСТАНСЫ</span>
      </h1>
      <ul className="mt-16 grid max-w-5xl list-none gap-5 p-0">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              to={projectPath(project.slug)}
              className="block cursor-pointer border border-line bg-project p-6 no-underline transition-colors duration-200 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric sm:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-project-meta">
                {project.eyebrow}
              </span>
              <h2 className="mt-6 font-display text-[clamp(2rem,7vw,5rem)] uppercase leading-[0.88]">
                {project.title.join(' ')}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-copy-soft">
                {project.thesis}
              </p>
              <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-electric">
                ОТКРЫТЬ ИНСТАНС <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageSection>
  )
}
