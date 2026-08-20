const pipelineNodes = [
  'СБОР',
  'НОРМАЛИЗАЦИЯ',
  'ИЗВЛЕЧЕНИЕ',
  'РАНЖИРОВАНИЕ',
  'TELEGRAM',
]
const terminalLines = [
  '> вакансии собраны',
  '> данные нормализованы',
  '> требования извлечены',
  '> совпадения объяснены',
  '> Telegram / прототип',
]

export function JobAgentSignal() {
  return (
    <div
      aria-hidden="true"
      data-project-signal="terminal"
      className="project-signal project-signal--terminal hidden xl:block"
    >
      <div className="project-pipeline">
        {pipelineNodes.map((node, index) => (
          <div
            key={node}
            data-pipeline-node
            className="project-pipeline__node"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {node}
          </div>
        ))}
      </div>
      <div className="project-terminal">
        {terminalLines.map((line) => (
          <span key={line} data-terminal-line>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
