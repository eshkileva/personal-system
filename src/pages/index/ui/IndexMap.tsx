import { Link, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const nodes = systemRoutes.map((route, index) => ({
    ...route,
    ...nodePoint(index, systemRoutes.length),
  }))

  return (
    <nav
      aria-label="Карта модулей"
      className="index-map"
      data-index-map
    >
      <p className="index-map__legend">RADAR</p>
      <div className="index-map__stage">
        <svg
          aria-hidden="true"
          className="index-map__svg"
          viewBox="0 0 320 220"
        >
          {nodes.map((node) => (
            <line
              key={`line-${node.id}`}
              className="index-map__beam"
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
            />
          ))}
          <circle className="index-map__ring" cx={cx} cy={cy} r={radius} />
          <circle className="index-map__core" cx={cx} cy={cy} r="18" />
          <text
            className="index-map__core-label"
            textAnchor="middle"
            x={cx}
            y={cy + 4}
          >
            PS
          </text>
          {nodes.map((node) => (
            <circle
              className={
                node.path === pathname
                  ? 'index-map__node index-map__node--active'
                  : 'index-map__node'
              }
              cx={node.x}
              cy={node.y}
              key={`node-${node.id}`}
              r="5"
            />
          ))}
        </svg>
        <div aria-hidden="true" className="index-map__sweep" />
        {nodes.map((node) => (
          <Link
            aria-current={node.path === pathname ? 'page' : undefined}
            className="index-map__hit"
            key={node.id}
            style={{
              left: `${(node.x / 320) * 100}%`,
              top: `${(node.y / 220) * 100}%`,
            }}
            to={node.path}
          >
            {node.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
