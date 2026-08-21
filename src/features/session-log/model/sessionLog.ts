export type SessionEvent = {
  id: number
  stamp: string
  line: string
}

let startedAt = 0
let nextId = 1
let lastLine = ''
let lastEvent: SessionEvent | null = null
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function stampNow() {
  if (!startedAt) startedAt = Date.now()
  const total = Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
  const minutes = String(Math.floor(total / 60)).padStart(2, '0')
  const seconds = String(total % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export function getLastSessionEvent() {
  return lastEvent
}

export function subscribeSessionLog(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function pushSessionEvent(line: string) {
  const trimmed = line.trim()
  if (!trimmed || trimmed === lastLine) return

  lastLine = trimmed
  lastEvent = { id: nextId, stamp: stampNow(), line: trimmed }
  nextId += 1
  emit()
}

export function resetSessionLog() {
  startedAt = 0
  nextId = 1
  lastLine = ''
  lastEvent = null
  emit()
}
