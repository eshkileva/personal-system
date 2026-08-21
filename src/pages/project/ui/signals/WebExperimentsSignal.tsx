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
      <div className="project-pipeline">
        {experiments.map((experiment) => (
          <button
            key={experiment.id}
            type="button"
            className="project-pipeline__node"
            aria-pressed={experiment.id === active.id}
            onClick={() => setActiveId(experiment.id)}
          >
            Эксперимент {experiment.id}
          </button>
        ))}
      </div>
      <div className="project-terminal">
        <p>{active.hypothesis}</p>
      </div>
      <div aria-hidden="true" className="project-wave-field">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="project-wave-field__line"
            style={{ '--wave-index': index } as React.CSSProperties}
          />
        ))}
      </div>
      <div aria-hidden="true" className="project-experiment-windows">
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            data-experiment-window
            className={[
              'project-experiment-window',
              experiment.id === 'C' && experiment.id === active.id
                ? 'project-experiment-window--motion'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span>ЭКСП / {experiment.id}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
