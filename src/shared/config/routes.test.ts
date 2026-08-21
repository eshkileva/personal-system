import { describe, expect, it } from 'vitest'
import { getRouteByPath, projectPath, systemRoutes } from './routes'

describe('system routes', () => {
  it('exposes the seven system modules in file-tree order', () => {
    expect(systemRoutes.map((route) => route.path)).toEqual([
      '/',
      '/profile',
      '/projects',
      '/stack',
      '/experience',
      '/contact',
    ])
  })

  it('builds a project instance path', () => {
    expect(projectPath('job-agent')).toBe('/projects/job-agent')
    expect(getRouteByPath('/stack')?.label).toBe('stack')
  })
})
