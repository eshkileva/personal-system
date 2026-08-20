import { Link } from 'react-router-dom'

export function ProjectNotFound() {
  return (
    <main className="flex min-h-[50vh] flex-col items-start justify-center gap-6 px-[6vw] py-16">
      <p className="font-mono text-xs uppercase tracking-[0.13em] text-label">
        / ОШИБКА / 404
      </p>
      <h1 className="font-display text-[clamp(2rem,8vw,3.5rem)] uppercase leading-none tracking-tight text-ice">
        Проект не найден
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-copy">
        Этого досье не существует или оно было перемещено. Вернитесь к списку,
        чтобы посмотреть доступные проекты.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.13em] text-electric underline-offset-4 transition-colors hover:text-ice focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      >
        К списку проектов <span aria-hidden="true">↗</span>
      </Link>
    </main>
  )
}
