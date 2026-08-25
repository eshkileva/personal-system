export type ProjectSlug = 'job-agent' | 'web-experiments' | 'kupilko'
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
  log: string
}

export type ProjectExperiment = {
  id: 'A' | 'B' | 'C'
  title: string
  hypothesis: string
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
  preview: { kind: 'svg' | 'static'; label: string }
  role: string
  overview: string[]
  architecture: string[]
  challenges: string[]
  results: string[]
  links: {
    github: string | null
    demo: string | null
    telegram: string | null
  }
  chapters: ProjectChapter[]
  systemNodes: SystemNode[]
  experiments?: ProjectExperiment[]
  decisions: ProjectDecision[]
  outcome: {
    summary: string
    learnings: string[]
    nextSteps: string[]
  }
  nextProjectSlug: ProjectSlug
}
