export type StackMetric = {
  label: string
  value: string
  accent?: boolean
}

export type StackEntry = {
  number: string
  title: string
  subtitle: string
  metrics: StackMetric[]
}

export const stackEntries: StackEntry[] = [
  {
    number: '01 / СТЕК',
    title: 'АНАЛИЗ ТРЕБОВАНИЙ',
    subtitle: 'User Stories / Use Cases / критерии приёмки',
    metrics: [
      { label: 'ФОКУС', value: 'ТРЕБОВАНИЯ', accent: true },
      { label: 'ФОРМАТ', value: 'STORIES / ПРИЁМКА' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
  {
    number: '02 / СТЕК',
    title: 'ПРОЦЕССЫ И ДАННЫЕ',
    subtitle: 'BPMN / UML / моделирование данных',
    metrics: [
      { label: 'ФОКУС', value: 'ПРОЦЕССЫ', accent: true },
      { label: 'МОДЕЛИ', value: 'BPMN / UML' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
  {
    number: '03 / СТЕК',
    title: 'API И КОНТРАКТЫ',
    subtitle: 'REST / OpenAPI / SQL / PostgreSQL',
    metrics: [
      { label: 'ФОКУС', value: 'КОНТРАКТЫ', accent: true },
      { label: 'СПЕКИ', value: 'OpenAPI / Swagger' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
  {
    number: '04 / СТЕК',
    title: 'ТЕХНИЧЕСКИЙ БЭКГРАУНД',
    subtitle: 'React / TypeScript / чтение реализации',
    metrics: [
      { label: 'СТЕК', value: 'React / TypeScript', accent: true },
      { label: 'РОЛЬ', value: 'ИНСТРУМЕНТ' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
]
