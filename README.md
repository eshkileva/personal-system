# Personal System

Персональный сайт Юлии Ешкилевой: frontend-разработка, системный анализ, AI-автоматизация и Telegram-боты.

## Стек

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- Vitest

## Локальный запуск

```bash
npm ci
npm run dev
```

## Проверки

```bash
npm test
npm run lint
npm run build
```

GitHub Actions выполняет эти проверки для каждого pull request в `main` и сохраняет production-сборку как artifact.

## Vercel

Когда появится проект на Vercel, использовать настройки:

- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 22
- Production Branch: `main`

`vercel.json` переписывает клиентские маршруты (`/projects/:slug` и остальные) на `index.html`. Подключать аккаунт и домен в этом срезе не нужно.
