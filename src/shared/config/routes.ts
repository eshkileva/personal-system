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
      'Системный индекс frontend-разработчика: профиль, проекты, стек, опыт и контакт.',
  },
  {
    path: '/profile',
    id: 'profile',
    label: 'profile',
    title: 'Профиль — Юлия Ешкилева | Personal System',
    description:
      'Frontend-разработчик на React и TypeScript: интерфейсы, состояния компонентов и системное мышление.',
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
      'Инструменты системы: React, TypeScript, системный анализ, AI-автоматизация и Telegram-боты.',
  },
  {
    path: '/experience',
    id: 'experience',
    label: 'experience',
    title: 'Траектория — Personal System | Юлия Ешкилева',
    description:
      'Направления роста: frontend-архитектура, системный анализ и личные инструменты автоматизации.',
  },
  {
    path: '/contact',
    id: 'contact',
    label: 'contact',
    title: 'Контакт — Personal System | Юлия Ешкилева',
    description:
      'Связаться с frontend-разработчиком: почта для работодателей и обсуждения задач.',
  },
]

export function getRouteByPath(path: string): SystemRoute | undefined {
  return systemRoutes.find((route) => route.path === path)
}

export function projectPath(slug: string) {
  return `/projects/${slug}`
}
