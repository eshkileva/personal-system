import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getNextProject,
  getProjectBySlug,
} from '../../../entities/project/model/selectors'
import type { Project } from '../../../entities/project/model/types'
import { seoFromRoute } from '../../../shared/config/seo'
import { useProjectMotion } from '../lib/useProjectMotion'
import { DecisionCard } from './DecisionCard'
import { NextProjectLink } from './NextProjectLink'
import { ProjectChapter } from './ProjectChapter'
import { ProjectChapterNav } from './ProjectChapterNav'
import { ProjectHero } from './ProjectHero'
import { ProjectNotFound } from './ProjectNotFound'
import { ProjectOutcome } from './ProjectOutcome'
import { SystemDiagram } from './SystemDiagram'

const INDEX_TITLE = seoFromRoute('/').title

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <ProjectNotFound />

  return <ProjectDossier key={project.slug} project={project} />
}

function ProjectDossier({ project }: { project: Project }) {
  const rootRef = useRef<HTMLElement>(null)
  const [activeChapterId, setActiveChapterId] = useState(
    project.chapters[0].id,
  )
  const nextProject = getNextProject(project)

  useProjectMotion(rootRef, true)

  useEffect(() => {
    document.title = project.seoTitle

    return () => {
      document.title = INDEX_TITLE
    }
  }, [project.seoTitle])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting)
        const nextId = activeEntry?.target.id
        if (!nextId) return

        setActiveChapterId((currentId) =>
          currentId === nextId
            ? currentId
            : (nextId as Project['chapters'][number]['id']),
        )
      },
      { rootMargin: '-25% 0px -60%' },
    )

    project.chapters.forEach(({ id }) => {
      const chapter = rootRef.current?.querySelector(`#${id}`)
      if (chapter) observer.observe(chapter)
    })

    return () => observer.disconnect()
  }, [project.chapters])

  return (
    <main ref={rootRef} className="min-w-0 overflow-x-clip">
      <ProjectHero
        project={project}
        nextProjectSlug={nextProject?.slug}
      />
      <div
        data-project-layer
        className="project-dossier-layout mx-auto grid max-w-4xl grid-cols-1 gap-8 px-5 sm:px-8 xl:max-w-[90rem] xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-14 xl:px-[6vw]"
      >
        <div className="pt-8 xl:pt-24">
          <ProjectChapterNav
            chapters={project.chapters}
            activeChapterId={activeChapterId}
          />
        </div>
        <div className="@container min-w-0">
          <ProjectChapter chapter={project.chapters[0]} />
          <ProjectChapter chapter={project.chapters[1]}>
            <SystemDiagram nodes={project.systemNodes} />
          </ProjectChapter>
          <ProjectChapter chapter={project.chapters[2]}>
            <div className="grid gap-4 lg:grid-cols-2">
              {project.decisions.map((decision, index) => (
                <DecisionCard
                  key={decision.title}
                  decision={decision}
                  number={index + 1}
                />
              ))}
            </div>
          </ProjectChapter>
          <ProjectChapter chapter={project.chapters[3]}>
            <ProjectOutcome outcome={project.outcome} />
          </ProjectChapter>
        </div>
      </div>
      <NextProjectLink project={nextProject} />
    </main>
  )
}
