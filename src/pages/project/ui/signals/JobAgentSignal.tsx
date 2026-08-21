import { useState } from 'react'
import type { SystemNode } from '../../../../entities/project/model/types'

type JobAgentSignalProps = {
  nodes: SystemNode[]
}

export function JobAgentSignal({ nodes }: JobAgentSignalProps) {
  const [activeId, setActiveId] = useState(nodes[0]?.id)
  const active = nodes.find((node) => node.id === activeId) ?? nodes[0]

  if (!active) return null

  return (
    <div
      data-project-signal="terminal"
      className="project-signal project-signal--terminal"
    >
      <p className="project-signal__caption">
        локальный прототип, не live demo
      </p>
      <div className="project-pipeline">
        {nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            data-pipeline-node
            className="project-pipeline__node"
            aria-pressed={node.id === active.id}
            onClick={() => setActiveId(node.id)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {node.label}
          </button>
        ))}
      </div>
      <div className="project-terminal">
        <p>{active.detail}</p>
        <span data-terminal-line>{active.log}</span>
      </div>
    </div>
  )
}
