export function WebExperimentsSignal() {
  return (
    <div
      aria-hidden="true"
      data-project-signal="wave"
      className="project-signal project-signal--wave hidden xl:block"
    >
      <div className="project-wave-field">
        {Array.from({ length: 7 }, (_, index) => (
          <span
            key={index}
            className="project-wave-field__line"
            style={{ '--wave-index': index } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="project-experiment-windows">
        {['A', 'B', 'C'].map((label) => (
          <div
            key={label}
            data-experiment-window
            className="project-experiment-window"
          >
            <span>ЭКСП / {label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
