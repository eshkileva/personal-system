import { systemRoutes } from '../../../shared/config/routes'

const cx = 160
const cy = 110
const radius = 78

function nodePoint(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  }
}

export function IndexMap() {
  const nodes = systemRoutes.map((route, index) => ({
    ...route,
    ...nodePoint(index, systemRoutes.length),
  }))

  return (
    <svg
      aria-hidden="true"
      className="index-map"
      data-index-map
      viewBox="0 0 320 220"
    >
      {nodes.map((node) => (
        <line
          key={`line-${node.id}`}
          className="index-map__link"
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
        />
      ))}
      <circle className="index-map__core" cx={cx} cy={cy} r="18" />
      <text className="index-map__core-label" x={cx} y={cy + 4} textAnchor="middle">
        PS
      </text>
      {nodes.map((node) => (
        <g key={node.id}>
          <circle className="index-map__node" cx={node.x} cy={node.y} r="5" />
          <text
            className="index-map__label"
            x={node.x}
            y={node.y + 18}
            textAnchor="middle"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
