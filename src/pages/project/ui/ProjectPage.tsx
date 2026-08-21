import { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectBySlug } from '../../../entities/project/model/selectors'
import type { Project } from '../../../entities/project/model/types'
import { seoFromProject } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { ProjectViewer } from '../../../widgets/project-viewer/ui/ProjectViewer'
import { useProjectMotion } from '../lib/useProjectMotion'
import { ProjectNotFound } from './ProjectNotFound'
import { JobAgentSignal } from './signals/JobAgentSignal'
import { WebExperimentsSignal } from './signals/WebExperimentsSignal'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <ProjectNotFound />

  return <ProjectInstance key={project.slug} project={project} />
}

function ProjectInstance({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null)
  const seo = useMemo(
    () => seoFromProject(project.seoTitle, project.thesis, project.slug),
    [project.seoTitle, project.thesis, project.slug],
  )

  useProjectMotion(rootRef, true)

  return (
    <main ref={rootRef} className="min-w-0 overflow-x-clip">
      <DocumentMeta config={seo} />
      <ProjectViewer
        project={project}
        previewVisual={
          project.variant === 'terminal' ? (
            <JobAgentSignal nodes={project.systemNodes} />
          ) : (
            <WebExperimentsSignal experiments={project.experiments ?? []} />
          )
        }
      />
    </main>
  )
}
