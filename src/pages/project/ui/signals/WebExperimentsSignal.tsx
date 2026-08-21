import { useState } from 'react'
import type { ProjectExperiment } from '../../../../entities/project/model/types'

type WebExperimentsSignalProps = {
  experiments: ProjectExperiment[]
}

export function WebExperimentsSignal({ experiments }: WebExperimentsSignalProps) {
  const [activeId, setActiveId] = useState(experiments[0]?.id)
  const active =
    experiments.find((experiment) => experiment.id === activeId) ??
    experiments[0]

  if (!active) return null

  return (
    <div
      data-project-signal="wave"
      className="project-signal project-signal--wave"
    >
      <p className="project-signal__caption">
        локальный прототип, не live demo
      </p>
      <div aria-hidden="true" className="project-wave-field">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="project-wave-field__line"
            style={{ '--wave-index': index } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="experiment-deck">
        {experiments.map((experiment, index) => (
          <button
            key={experiment.id}
            type="button"
            data-experiment-window
            className={[
              'experiment-panel',
              experiment.id === 'C' && experiment.id === active.id
                ? 'experiment-panel--motion'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ '--panel-index': index } as React.CSSProperties}
            aria-pressed={experiment.id === active.id}
            onClick={() => setActiveId(experiment.id)}
          >
            <span>Эксперимент {experiment.id}</span>
            <strong>{experiment.title}</strong>
          </button>
        ))}
      </div>
      <div className="project-terminal">
        <p>{active.hypothesis}</p>
      </div>
    </div>
  )
}
