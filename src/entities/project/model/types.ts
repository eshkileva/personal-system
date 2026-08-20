export type ProjectSlug = 'job-agent' | 'web-experiments'
export type ProjectVariant = 'terminal' | 'wave'

export type ProjectChapter = {
  id: 'idea' | 'system' | 'decisions' | 'result'
  number: string
  label: string
  heading: string
  body: string[]
}

export type SystemNode = {
  id: string
  label: string
  detail: string
}

export type ProjectDecision = {
  title: string
  rationale: string
  impact: string
}

export type Project = {
  slug: ProjectSlug
  number: string
  eyebrow: string
  title: [string, string]
  thesis: string
  status: 'prototype' | 'concept' | 'in progress'
  stack: string[]
  tags: string
  variant: ProjectVariant
  seoTitle: string
  chapters: ProjectChapter[]
  systemNodes: SystemNode[]
  decisions: ProjectDecision[]
  outcome: {
    summary: string
    learnings: string[]
    nextSteps: string[]
  }
  nextProjectSlug: ProjectSlug
}
