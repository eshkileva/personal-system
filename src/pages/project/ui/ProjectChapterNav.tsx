import type { ProjectChapter as Chapter } from '../../../entities/project/model/types'

type ProjectChapterNavProps = {
  chapters: Chapter[]
  activeChapterId: Chapter['id']
}

export function ProjectChapterNav({
  chapters,
  activeChapterId,
}: ProjectChapterNavProps) {
  return (
    <nav
      aria-label="Главы проекта"
      className="project-chapter-nav border-y border-line py-3 xl:sticky xl:top-12 xl:border-y-0 xl:border-l xl:py-0 xl:pl-5"
    >
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex xl:flex-col">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeChapterId

          return (
            <li key={chapter.id} className="min-w-0">
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`flex min-h-11 items-center gap-3 px-3 font-mono text-xs uppercase tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric xl:px-0 ${
                  isActive ? 'text-electric' : 'text-label'
                }`}
              >
                <span aria-hidden="true">{isActive ? '●' : '○'}</span>
                <span>{chapter.number}</span>
                <span>{chapter.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
