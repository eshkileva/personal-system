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
    title: 'FRONTEND',
    subtitle: 'React / TypeScript / адаптивные интерфейсы',
    metrics: [
      { label: 'СТЕК', value: 'React / TypeScript', accent: true },
      { label: 'ФОКУС', value: 'СОСТОЯНИЯ / ЛОГИКА' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
  {
    number: '02 / СТЕК',
    title: 'СИСТЕМНЫЙ АНАЛИЗ',
    subtitle: 'требования / процессы / данные / интеграции',
    metrics: [
      { label: 'ФОКУС', value: 'ТРЕБОВАНИЯ', accent: true },
      { label: 'СВЯЗИ', value: 'ДАННЫЕ / API' },
      { label: 'ЭТАП', value: 'ИЗУЧАЮ' },
    ],
  },
  {
    number: '03 / СТЕК',
    title: 'AI-АВТОМАТИЗАЦИЯ',
    subtitle: 'агенты / сценарии / обработка информации',
    metrics: [
      { label: 'ИНСТРУМЕНТЫ', value: 'AI / API', accent: true },
      { label: 'ФОКУС', value: 'РУТИННЫЕ ЗАДАЧИ' },
      { label: 'ЭТАП', value: 'ЛИЧНЫЕ ПРОЕКТЫ' },
    ],
  },
  {
    number: '04 / СТЕК',
    title: 'TELEGRAM-БОТЫ',
    subtitle: 'интерфейсы в чате / API / автоматизация',
    metrics: [
      { label: 'СРЕДА', value: 'Telegram', accent: true },
      { label: 'ФОКУС', value: 'СЦЕНАРИИ / СОСТОЯНИЯ' },
      { label: 'ЭТАП', value: 'ПРОТОТИПЫ' },
    ],
  },
]
