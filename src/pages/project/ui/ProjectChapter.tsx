import type { ReactNode } from 'react'
import type { ProjectChapter as Chapter } from '../../../entities/project/model/types'

type ProjectChapterProps = {
  chapter: Chapter
  children?: ReactNode
}

export function ProjectChapter({ chapter, children }: ProjectChapterProps) {
  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      data-project-chapter
      className="project-chapter relative scroll-mt-8 overflow-hidden border-b border-line py-16 sm:py-20 xl:py-24"
    >
      <span
        aria-hidden="true"
        data-chapter-scan
        className="project-chapter-scan"
      />
      <div className="grid gap-8 md:grid-cols-[9rem_minmax(0,1fr)]">
        <p className="font-mono text-xs uppercase tracking-[0.13em] text-label">
          / {chapter.number} · {chapter.label}
        </p>
        <div className="min-w-0">
          <h2
            id={`${chapter.id}-heading`}
            className="font-display text-[clamp(2.25rem,10cqw,5.75rem)] uppercase leading-[0.82] tracking-[-0.06em] text-ice"
          >
            {chapter.heading}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-7 text-copy sm:text-lg sm:leading-8">
            {chapter.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {children && <div className="mt-12">{children}</div>}
        </div>
      </div>
    </section>
  )
}
