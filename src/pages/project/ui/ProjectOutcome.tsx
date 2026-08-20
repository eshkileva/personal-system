import type { Project } from '../../../entities/project/model/types'

type ProjectOutcomeProps = {
  outcome: Project['outcome']
}

export function ProjectOutcome({ outcome }: ProjectOutcomeProps) {
  return (
    <article className="border border-line bg-project p-5 sm:p-8">
      <p className="max-w-3xl text-lg leading-8 text-ice sm:text-xl">
        {outcome.summary}
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <OutcomeList title="Выводы" items={outcome.learnings} />
        <OutcomeList title="Следующие шаги" items={outcome.nextSteps} />
      </div>
    </article>
  )
}

function OutcomeList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-electric">
        {title}
      </h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-copy"
          >
            <span aria-hidden="true" className="text-signal">
              +
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
