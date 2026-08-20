import { describe, expect, it } from 'vitest'
import { getNextProject, getProjectBySlug } from './selectors'
import { projects } from './projects'

describe('project records', () => {
  it('preserves the approved project identities and navigation order', () => {
    expect(
      projects.map(
        ({
          slug,
          title,
          variant,
          stack,
          status,
          chapters,
          nextProjectSlug,
        }) => ({
          slug,
          title,
          variant,
          stack,
          status,
          chapters: chapters.map(({ id, number }) => `${number}:${id}`),
          nextProjectSlug,
        }),
      ),
    ).toEqual([
      {
        slug: 'job-agent',
        title: ['АГЕНТ', 'ПОИСКА РАБОТЫ'],
        variant: 'terminal',
        stack: ['TypeScript', 'Node.js', 'AI', 'Telegram Bot API'],
        status: 'prototype',
        chapters: ['01:idea', '02:system', '03:decisions', '04:result'],
        nextProjectSlug: 'web-experiments',
      },
      {
        slug: 'web-experiments',
        title: ['ВЕБ', 'ЭКСПЕРИМЕНТЫ'],
        variant: 'wave',
        stack: ['React', 'GSAP', 'CSS', 'TypeScript'],
        status: 'in progress',
        chapters: ['01:idea', '02:system', '03:decisions', '04:result'],
        nextProjectSlug: 'job-agent',
      },
    ])
  })

  it('resolves a project and its next project', () => {
    const jobAgent = getProjectBySlug('job-agent')
    expect(jobAgent?.title).toEqual(['АГЕНТ', 'ПОИСКА РАБОТЫ'])
    expect(getNextProject(jobAgent!)?.slug).toBe('web-experiments')
    expect(getNextProject(getNextProject(jobAgent!)!)?.slug).toBe('job-agent')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('missing')).toBeUndefined()
  })

  it('describes the approved project positioning', () => {
    const jobAgent = getProjectBySlug('job-agent')
    const webExperiments = getProjectBySlug('web-experiments')

    expect(jobAgent?.thesis).toMatch(/Telegram/)
    expect(jobAgent?.thesis).toMatch(/ваканс/i)
    expect(webExperiments?.thesis).toMatch(/React/)
    expect(webExperiments?.thesis).toMatch(/адаптив/i)
    expect(projects.map((project) => project.status)).toEqual([
      'prototype',
      'in progress',
    ])
  })

  it('keeps narrative copy free of unsupported claims', () => {
    const unsupportedMetricClaim =
      /(?:\d+(?:[.,]\d+)?\s*(?:%|пользовател\w*|клиент\w*|заказ\w*|продаж\w*|конверси\w*|(?:тыс(?:яч[аи]?)?|млн|миллион\w*)\s*(?:руб\w*|₽|\$|€))|(?:конверси\w*|выручк\w*|доход\w*|продаж\w*)[^.!?\d]{0,24}\d+(?:[.,]\d+)?)/iu
    const forbiddenClaimsPattern =
      /(?:работал(?:а)?\s+в|клиент[\p{L}\p{M}]*|заказчик[\p{L}\p{M}]*|отзыв[\p{L}\p{M}]*|\bsenior\b|(?<!не прош[её]л\s)(?<!без\s)коммерческ[\p{L}\p{M}]*|(?<!не\s)запущен[\p{L}\p{M}]*[^.!?]{0,48}\bprod\w*|пользовател[\p{L}\p{M}]*|увеличил(?:а)?[\p{L}\p{M}]*|повысил(?:а)?[\p{L}\p{M}]*|(?<!не)подтвержд[\p{L}\p{M}]*\s+результат[\p{L}\p{M}]*(?![^.!?]*(?:пока\s+нет|не\s+(?:было|получено|подтверждено))))/iu
    const narrative = projects.flatMap((project) => [
      project.thesis,
      ...project.chapters.flatMap((chapter) => [
        chapter.heading,
        ...chapter.body,
      ]),
      ...project.systemNodes.flatMap((node) => [node.label, node.detail]),
      ...project.decisions.flatMap((decision) => [
        decision.title,
        decision.rationale,
        decision.impact,
      ]),
      project.outcome.summary,
      ...project.outcome.learnings,
      ...project.outcome.nextSteps,
    ])

    const unsupportedExamples = [
      'рост конверсии на 35%',
      'продуктом пользуются 500 пользователей',
      'выручка 2 млн рублей',
    ]
    const permittedTechnicalNumbers = [
      'ПРОЕКТ / 00',
      'React 19',
      'TypeScript 6',
      'Node.js 24',
      'GSAP 3',
      'CSS 4',
      'API v2',
    ]
    const forbiddenClaimExamples = [
      'Работала в крупной компании.',
      'Собрала интерфейс для клиента.',
      'Получила отзыв заказчика.',
      'Senior frontend-разработчик.',
      'Есть коммерческий опыт.',
      'Сервис запущен в production.',
      'Продуктом пользуются тысячи пользователей.',
      'Увеличила конверсию.',
      'Повысил эффективность процесса.',
      'Подтверждён результат проекта.',
    ]

    for (const claim of unsupportedExamples) {
      expect(claim).toMatch(unsupportedMetricClaim)
    }
    for (const technicalName of permittedTechnicalNumbers) {
      expect(technicalName).not.toMatch(unsupportedMetricClaim)
    }
    for (const claim of forbiddenClaimExamples) {
      expect(claim).toMatch(forbiddenClaimsPattern)
    }
    expect(narrative.filter((line) => unsupportedMetricClaim.test(line))).toEqual(
      [],
    )
    expect(
      narrative.filter((line) => forbiddenClaimsPattern.test(line)),
    ).toEqual([])
    expect(projects[0].outcome.summary).toContain(
      'Запуска и подтверждённых результатов у проекта пока нет.',
    )
    expect(projects[1].outcome.summary).toContain(
      'находится в работе',
    )
  })

  it('documents the Job Agent data flow and prototype boundaries', () => {
    const jobAgent = getProjectBySlug('job-agent')
    const dossier = JSON.stringify(jobAgent)

    expect(jobAgent?.systemNodes).toHaveLength(5)
    expect(dossier).toMatch(/нормализ/i)
    expect(dossier).toMatch(/требован/i)
    expect(dossier).toMatch(/прозрачн/i)
    expect(dossier).toMatch(/состоян/i)
    expect(dossier).toMatch(/автоматиз/i)
    expect(dossier).toMatch(/Telegram/)
    expect(dossier).toMatch(/прототип/i)
    expect(dossier).toMatch(/провер|валидац/i)
  })

  it('documents Web Experiments as reusable accessible frontend practice', () => {
    const webExperiments = getProjectBySlug('web-experiments')
    const dossier = JSON.stringify(webExperiments)

    expect(webExperiments?.systemNodes).toHaveLength(4)
    expect(dossier).toMatch(/React/)
    expect(dossier).toMatch(/TypeScript/)
    expect(dossier).toMatch(/компонент/i)
    expect(dossier).toMatch(/адаптив/i)
    expect(dossier).toMatch(/контейнер/i)
    expect(dossier).toMatch(/GSAP/)
    expect(dossier).toMatch(/CSS/)
    expect(dossier).toMatch(/доступност/i)
    expect(dossier).toMatch(/reduced-motion/)
    expect(dossier).toMatch(/переиспольз/i)
    expect(webExperiments?.status).toBe('in progress')
  })

  it('uses natural Russian for message and keyboard accessibility states', () => {
    const jobAgent = getProjectBySlug('job-agent')
    const webExperiments = getProjectBySlug('web-experiments')
    const webExperimentsCopy = JSON.stringify(webExperiments)

    expect(JSON.stringify(jobAgent)).toContain('состояния интерфейса сообщений')
    expect(webExperimentsCopy).toContain(
      'оставаться понятным при навигации с клавиатуры',
    )
    expect(webExperimentsCopy).toContain('компоненты на React и TypeScript')
    expect(webExperimentsCopy).toContain(
      'проверить одну frontend-гипотезу, собрать небольшой компонент на React и оценить его на разных размерах контейнера без лишнего контекста',
    )
    expect(webExperimentsCopy).not.toContain('React и TypeScript-компонент')
    expect(webExperimentsCopy).not.toContain('frontend-вопрос')
  })
})
