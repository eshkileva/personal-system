import { useLayoutEffect } from 'react'
import type { SeoConfig } from '../../config/seo'
import { seoFromRoute } from '../../config/seo'

let metaGeneration = 0

function upsertNamedMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertPropertyMeta(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function applySeo(config: SeoConfig) {
  document.title = config.title
  upsertNamedMeta('description', config.description)
  upsertPropertyMeta('og:title', config.ogTitle)
  upsertPropertyMeta('og:description', config.ogDescription)
  upsertCanonical(config.canonical)
}

function restoreIndexSeo() {
  applySeo(seoFromRoute('/'))
}

type DocumentMetaProps = {
  config: SeoConfig
}

export function DocumentMeta({ config }: DocumentMetaProps) {
  useLayoutEffect(() => {
    const generation = ++metaGeneration
    applySeo(config)

    return () => {
      if (generation === metaGeneration) {
        restoreIndexSeo()
      }
    }
  }, [config])

  return null
}
