export const profile = {
  role: 'АНАЛИТИК',
  heading: 'СОБИРАЮ ТРЕБОВАНИЯ. ОПИСЫВАЮ ПОВЕДЕНИЕ СИСТЕМЫ.',
  lead:
    'Работаю аналитиком над web-приложениями: уточняю требования, декомпозирую задачи на User Stories и Use Cases, фиксирую бизнес-правила и критерии приёмки.',
  paragraphs: [
    'Проектирую логику интерфейса и сценарии: успех, ошибка API, пустые данные, сессия, повторная отправка, параллельные изменения. Согласовываю API-контракты по OpenAPI/Swagger.',
    'Технический бэкграунд — React, TypeScript, REST — помогает читать реализацию и находить расхождения между требованиями и фактическим поведением системы.',
  ],
  identity: [
    {
      id: '01',
      title: 'ТРЕБОВАНИЯ',
      text: 'Сбор и уточнение, User Stories, Use Cases, критерии приёмки, бизнес-правила.',
    },
    {
      id: '02',
      title: 'СИСТЕМА',
      text: 'Сценарии, граничные случаи, API-контракты, данные и валидация.',
    },
    {
      id: '03',
      title: 'РЕАЛИЗАЦИЯ',
      text: 'Чтение кода и спецификаций, сверка ожидаемого и фактического поведения.',
    },
  ],
  contacts: [
    {
      id: 'mail',
      kind: 'MAIL',
      href: 'mailto:eshkileva69@gmail.com',
      label: 'eshkileva69@gmail.com',
    },
    {
      id: 'github',
      kind: 'GITHUB',
      href: 'https://github.com/eshkileva',
      label: 'github.com/eshkileva',
    },
    {
      id: 'telegram',
      kind: 'TELEGRAM',
      href: 'https://t.me/tknusnm',
      label: 't.me/tknusnm',
    },
  ],
} as const
