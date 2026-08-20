export type FieldMetric = {
  label: string
  value: string
  accent?: boolean
}

export type Field = {
  number: string
  title: string
  subtitle: string
  metrics: FieldMetric[]
}

export const fields: Field[] = [
  {
    number: '01 / СФЕРА',
    title: 'FRONTEND',
    subtitle: 'React / TypeScript / адаптивные интерфейсы',
    metrics: [
      { label: 'СТЕК', value: 'React / TypeScript', accent: true },
      { label: 'ФОКУС', value: 'СОСТОЯНИЯ / ЛОГИКА' },
      { label: 'ЭТАП', value: 'ПРАКТИКА' },
    ],
  },
  {
    number: '02 / СФЕРА',
    title: 'СИСТЕМНЫЙ АНАЛИЗ',
    subtitle: 'требования / процессы / данные / интеграции',
    metrics: [
      { label: 'ФОКУС', value: 'ТРЕБОВАНИЯ', accent: true },
      { label: 'СВЯЗИ', value: 'ДАННЫЕ / API' },
      { label: 'ЭТАП', value: 'ИЗУЧАЮ' },
    ],
  },
  {
    number: '03 / СФЕРА',
    title: 'AI-АВТОМАТИЗАЦИЯ',
    subtitle: 'агенты / сценарии / обработка информации',
    metrics: [
      { label: 'ИНСТРУМЕНТЫ', value: 'AI / API', accent: true },
      { label: 'ФОКУС', value: 'РУТИННЫЕ ЗАДАЧИ' },
      { label: 'ЭТАП', value: 'ЛИЧНЫЕ ПРОЕКТЫ' },
    ],
  },
  {
    number: '04 / СФЕРА',
    title: 'TELEGRAM-БОТЫ',
    subtitle: 'интерфейсы в чате / API / автоматизация',
    metrics: [
      { label: 'СРЕДА', value: 'Telegram', accent: true },
      { label: 'ФОКУС', value: 'СЦЕНАРИИ / СОСТОЯНИЯ' },
      { label: 'ЭТАП', value: 'ПРОТОТИПЫ' },
    ],
  },
]

export const nowItems = [
  {
    label: '01 / FRONTEND',
    text: 'Архитектура и поддерживаемость приложений на React и TypeScript.',
  },
  {
    label: '02 / СИСТЕМНЫЙ АНАЛИЗ',
    text: 'Требования, процессы, данные и интеграции между частями продукта.',
  },
  {
    label: '03 / АВТОМАТИЗАЦИЯ',
    text: 'Личные AI-инструменты, автоматизации и Telegram-боты.',
  },
] as const
