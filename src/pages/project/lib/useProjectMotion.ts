import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EXPERIMENTAL_MOTION_QUERY =
  '(min-width: 1280px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function useProjectMotion(
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!enabled || !root) return

    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add(EXPERIMENTAL_MOTION_QUERY, () => {
      const context = gsap.context(() => {
        gsap.from('[data-project-layer]', {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        })

        gsap.utils.toArray<HTMLElement>('[data-project-title-layer]').forEach(
          (layer, index) => {
            gsap.to(layer, {
              yPercent: (index + 1) * -9,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            })
          },
        )

        gsap.from('[data-experiment-window]', {
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: 'power2.out',
        })

        gsap.from('[data-terminal-line]', {
          x: -12,
          opacity: 0,
          duration: 0.3,
          stagger: 0.16,
          ease: 'power1.out',
        })
      }, root)

      return () => context.revert()
    })

    return () => media.revert()
  }, [enabled, rootRef])
}
