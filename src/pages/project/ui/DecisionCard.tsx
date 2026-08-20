import type { ProjectDecision } from '../../../entities/project/model/types'

type DecisionCardProps = {
  decision: ProjectDecision
  number: number
}

export function DecisionCard({ decision, number }: DecisionCardProps) {
  return (
    <article className="border border-line bg-project p-5 sm:p-7">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-electric">
        Решение / {String(number).padStart(2, '0')}
      </p>
      <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-[-0.04em] text-ice">
        {decision.title}
      </h3>
      <dl className="mt-7 space-y-6">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-label">
            Обоснование
          </dt>
          <dd className="mt-2 text-sm leading-6 text-copy">
            {decision.rationale}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-label">
            Влияние
          </dt>
          <dd className="mt-2 text-sm leading-6 text-copy">
            {decision.impact}
          </dd>
        </div>
      </dl>
    </article>
  )
}
