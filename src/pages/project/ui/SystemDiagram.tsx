import type { SystemNode } from '../../../entities/project/model/types'

type SystemDiagramProps = {
  nodes: SystemNode[]
}

export function SystemDiagram({ nodes }: SystemDiagramProps) {
  return (
    <ol
      aria-label="Схема системы"
      data-system-diagram
      className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"
    >
      {nodes.map((node, index) => (
        <li
          key={node.id}
          data-diagram-node
          className="relative min-w-0 border border-line bg-project p-5"
        >
          <span className="font-mono text-xs text-electric">
            УЗЕЛ / {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-8 font-display text-xl uppercase tracking-[-0.03em] text-ice">
            {node.label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-copy">{node.detail}</p>
          {index < nodes.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -bottom-4 left-7 h-4 border-l border-line-strong xl:top-1/2 xl:-right-4 xl:bottom-auto xl:left-auto xl:h-auto xl:w-4 xl:border-t xl:border-l-0"
            />
          )}
        </li>
      ))}
    </ol>
  )
}
