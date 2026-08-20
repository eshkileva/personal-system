import { useEffect, useRef } from 'react'

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const media = matchMedia(
      '(min-width: 53.125rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let animationFrame = 0
    let pointerX = 0
    let pointerY = 0

    const paint = () => {
      element.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
      animationFrame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!animationFrame) animationFrame = requestAnimationFrame(paint)
    }

    const syncListener = () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (media.matches) {
        window.addEventListener('pointermove', onPointerMove, { passive: true })
      }
    }

    syncListener()
    media.addEventListener('change', syncListener)

    return () => {
      media.removeEventListener('change', syncListener)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <div ref={ref} className="cursor-orb" aria-hidden />
}

function HeroOrb() {
  return (
    <div
      className="relative hidden h-[min(52vw,680px)] place-items-center xl:grid"
      aria-hidden
    >
      <div className="orb">
        <div className="orb-glow" />
        <div className="orb-core">Ю</div>
        <div className="orb-label orb-label-1">
          FRONTEND / АКТИВНО
          <br />
          СИСТЕМЫ / ИЗУЧАЮ
          <br />
          AI / АВТОМАТИЗИРУЮ
        </div>
        <div className="orb-label orb-label-2">
          React / TypeScript
          <br />
          ИНТЕРФЕЙСЫ / ЛОГИКА
        </div>
        <div className="orb-label orb-label-3">ОТ ИДЕИ / К ПОНЯТНОЙ СИСТЕМЕ</div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <>
      <CursorGlow />
      <section className="relative overflow-x-clip border-b border-line px-[7vw] py-8 lg:px-[5vw] lg:pt-[6vh] lg:pb-[5vh] xl:min-h-screen">
        <div className="relative z-[5] flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.13em]">
          <span>ЛИЧНАЯ СИСТЕМА / 2026</span>
          <span className="hidden text-right text-electric sm:inline">
            ОТКРЫТА К FRONTEND-РОЛЯМ
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-[3vw] pt-[clamp(8rem,18vh,10rem)] pb-[clamp(6rem,14vh,8rem)] xl:min-h-[88vh] xl:grid-cols-[1.05fr_0.95fr] xl:py-0">
          <div className="@container">
            <h1 className="relative z-[3] font-display text-[clamp(2.75rem,17cqw,13.125rem)] uppercase leading-[0.8] tracking-[-0.04em]">
              <span className="block">ЮЛИЯ</span>
              <span className="text-outline ml-[2vw] block text-[0.57em] xl:ml-[6vw] xl:text-[0.76em]">
                ЕШКИЛЕВА
              </span>
            </h1>
            <p className="relative z-[4] mt-8 max-w-full wrap-break-word font-mono text-xs uppercase tracking-widest text-electric xl:ml-[8vw]">
              FRONTEND-РАЗРАБОТЧИК
            </p>

            <p className="relative z-[4] mt-[5vh] max-w-[650px] text-[clamp(1.375rem,5cqw,2.4375rem)] leading-[1.08] tracking-[-0.04em] xl:mt-[7vh] xl:ml-[8vw]">
              Создаю понятные интерфейсы, разбираюсь в логике систем и
              автоматизирую рутину с помощью AI.
            </p>

            <div className="mt-[5vh] flex flex-wrap gap-x-5 gap-y-3 xl:mt-[7vh] xl:ml-[8vw] xl:gap-7">
              <div className="flex min-w-0 items-center gap-2.5 wrap-break-word font-mono text-xs uppercase tracking-[0.08em] text-status">
                <i
                  className="inline-block size-1.5 shrink-0 animate-blink rounded-full bg-signal shadow-[0_0_18px_var(--color-signal)]"
                  aria-hidden
                />
                ОТКРЫТА К FRONTEND-РОЛЯМ / РАЗВИВАЮСЬ В СИСТЕМНОМ АНАЛИЗЕ
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-code">
                React / TypeScript / AI
              </div>
            </div>
          </div>

          <HeroOrb />
        </div>
      </section>
    </>
  )
}
