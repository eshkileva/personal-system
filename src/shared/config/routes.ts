export type SystemPath =
  | '/'
  | '/profile'
  | '/projects'
  | '/stack'
  | '/experience'
  | '/contact'

export type SystemRoute = {
  path: SystemPath
  id: string
  label: string
  title: string
  description: string
}

export const systemRoutes: SystemRoute[] = [
  {
    path: '/',
    id: 'index',
    label: 'index',
    title: 'Юлия Ешкилева — Personal System',
    description:
      'Системный индекс аналитика: профиль, проекты, стек, опыт и контакт.',
  },
  {
    path: '/profile',
    id: 'profile',
    label: 'profile',
    title: 'Профиль — Юлия Ешкилева | Personal System',
    description:
      'Аналитик с техническим бэкграундом: требования, сценарии, API-контракты и сверка с реализацией.',
  },
  {
    path: '/projects',
    id: 'projects',
    label: 'projects',
    title: 'Проекты — Personal System | Юлия Ешкилева',
    description:
      'Личные прототипы и эксперименты: Job Agent, веб-интерфейсы и сценарии автоматизации.',
  },
  {
    path: '/stack',
    id: 'stack',
    label: 'stack',
    title: 'Стек — Personal System | Юлия Ешкилева',
    description:
      'Практика аналитика: требования, процессы и данные, API-контракты и технический бэкграунд.',
  },
  {
    path: '/experience',
    id: 'experience',
    label: 'experience',
    title: 'Опыт — Personal System | Юлия Ешкилева',
    description:
      'Практика аналитика: требования, сценарии, контракты и технический контекст.',
  },
  {
    path: '/contact',
    id: 'contact',
    label: 'contact',
    title: 'Контакт — Personal System | Юлия Ешкилева',
    description:
      'Связаться с аналитиком: почта, GitHub и Telegram.',
  },
]

export function getRouteByPath(path: string): SystemRoute | undefined {
  return systemRoutes.find((route) => route.path === path)
}

export function projectPath(slug: string) {
  return `/projects/${slug}`
}
