import { projects } from '../../../entities/project/model/projects'
import type { Project } from '../../../entities/project/model/types'
import { Link } from 'react-router-dom'
import {
  PageSection,
  SectionLabel,
  SectionTitle,
} from './SectionPrimitives'

function TerminalVisual() {
  return (
    <div
      className="mt-10 border border-line-strong/50 bg-void p-[22px] font-mono text-xs leading-[2] text-terminal xl:absolute xl:right-[4vw] xl:bottom-[4vw] xl:mt-0 xl:w-[36%]"
      data-terminal-visual
      aria-hidden="true"
    >
      &gt; вакансии собраны
      <br />
      &gt; данные нормализованы
      <br />
      &gt; требования извлечены
      <br />
      <span className="text-electric">&gt; совпадения объяснены</span>
      <br />
      &gt; Telegram / прототип
    </div>
  )
}

function WaveVisual() {
  return (
    <div
      className="visual-grid relative mt-10 hidden lg:block xl:absolute xl:right-[4vw] xl:bottom-[4vw] xl:left-[4vw] xl:mt-0"
      aria-hidden
    >
      <div className="wave" />
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isTerminal = project.variant === 'terminal'
  const desktopLayout = isTerminal
    ? 'xl:ml-[4%] xl:w-[76%] xl:-rotate-1'
    : 'xl:mt-[-5vw] xl:mr-[5%] xl:ml-auto xl:w-[55%] xl:rotate-[1.2deg]'
  const titleSize = isTerminal
    ? 'text-[clamp(2.15rem,10cqw,7.25rem)]'
    : 'text-[clamp(1.25rem,7.2cqw,5rem)]'

  return (
    <article
      className={`@container relative min-h-0 overflow-hidden border border-line bg-project p-[7vw] lg:min-h-[600px] lg:p-[4vw] xl:min-h-[650px] ${index === 0 ? 'mb-16 xl:mb-[10vw]' : ''} ${desktopLayout}`}
    >
      <div className="font-mono text-xs uppercase tracking-[0.13em] text-project-meta">
        {project.eyebrow}
      </div>
      <h3
        className={`mt-10 max-w-full wrap-break-word font-display uppercase leading-[0.84] tracking-[-0.03em] lg:mt-[7vw] ${titleSize}`}
      >
        {project.title[0]}
        <br />
        {project.title[1]}
      </h3>
      <p
        className={`mt-10 max-w-[540px] text-[clamp(1.0625rem,4vw,1.4375rem)] leading-[1.5] text-copy-soft lg:mt-[4vw] lg:text-[clamp(18px,1.4vw,23px)] ${isTerminal ? 'xl:ml-[8vw]' : ''}`}
      >
        {project.thesis}
      </p>

      {isTerminal ? <TerminalVisual /> : <WaveVisual />}

      <div className="mt-8 font-mono text-xs uppercase text-tags xl:absolute xl:bottom-[4vw] xl:left-[4vw] xl:mt-0">
        {project.tags}
      </div>

      <span className="mt-6 block font-mono text-xs uppercase tracking-[0.13em] text-electric lg:mt-8 xl:absolute xl:top-[4vw] xl:right-[4vw] xl:mt-0">
        ОТКРЫТЬ ДОСЬЕ <span aria-hidden="true">↗</span>
      </span>
    </article>
  )
}

function ProjectCardLink({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const to = `/projects/${project.slug}`
  const accessibleTitle =
    project.slug === 'job-agent'
      ? 'агента поиска работы'
      : 'веб-экспериментов'

  return (
    <Link
      to={to}
      viewTransition
      aria-label={`Открыть досье ${accessibleTitle}`}
      className="project-card-link block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      style={{ viewTransitionName: `project-card-${project.slug}` }}
    >
      <ProjectCard project={project} index={index} />
    </Link>
  )
}

export function WorkSection() {
  return (
    <PageSection className="lg:min-h-screen">
      <SectionLabel number="03">ЛИЧНЫЕ ПРОЕКТЫ</SectionLabel>

      <div className="mb-14 mt-8 block lg:mb-[8vw] lg:flex lg:items-end lg:justify-between">
        <SectionTitle className="work-title">
          ПРОЕКТЫ И
          <br />
          <span className="text-outline-strong">ЭКСПЕРИМЕНТЫ</span>
        </SectionTitle>
        <p className="mt-10 max-w-[260px] font-mono text-xs uppercase leading-[1.7] text-note lg:mt-0">
          Практика в интерфейсах, автоматизации и работе с данными.
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectCardLink
          key={project.slug}
          project={project}
          index={index}
        />
      ))}
    </PageSection>
  )
}
