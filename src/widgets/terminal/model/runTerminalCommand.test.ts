import { describe, expect, it } from 'vitest'
import { runTerminalCommand } from './runTerminalCommand'

const context = {
  pathname: '/profile',
  bootStatus: 'SYSTEM READY' as const,
  reducedMotion: true,
  pointer: 'fine' as const,
}

describe('runTerminalCommand', () => {
  it('lists built-in commands for help', () => {
    const result = runTerminalCommand('help', context)
    expect(result.output.join('\n')).toMatch(/help|whoami|status|diagnostics|open|clear/)
    expect(result.navigateTo).toBeUndefined()
  })

  it('returns honest identity for whoami', () => {
    expect(runTerminalCommand('whoami', context).output).toEqual([
      'Юлия Ешкилева — FRONTEND-РАЗРАБОТЧИК',
    ])
  })

  it('returns the current boot status', () => {
    expect(runTerminalCommand('status', context).output).toEqual(['SYSTEM READY'])
  })

  it('returns honest diagnostics without hardware metrics', () => {
    const result = runTerminalCommand('diagnostics', context)
    expect(result.output.join('\n')).toContain('route: /profile')
    expect(result.output.join('\n')).toContain('reduced-motion: reduce')
    expect(result.output.join('\n')).toContain('pointer: fine')
    expect(result.output.join('\n')).not.toMatch(/cpu|ram/i)
  })

  it('resolves open targets for routes and project slugs', () => {
    expect(runTerminalCommand('open /stack', context).navigateTo).toBe('/stack')
    expect(runTerminalCommand('open profile', context).navigateTo).toBe('/profile')
    expect(runTerminalCommand('open job-agent', context).navigateTo).toBe(
      '/projects/job-agent',
    )
    expect(runTerminalCommand('open missing', context).navigateTo).toBeUndefined()
    expect(runTerminalCommand('open missing', context).output.join('\n')).toMatch(
      /не найден/i,
    )
  })

  it('clears the buffer and refuses unknown or sudo commands', () => {
    expect(runTerminalCommand('clear', context)).toEqual({
      output: [],
      clear: true,
    })
    expect(runTerminalCommand('sudo rm', context).output.join('\n')).toMatch(/отказ/i)
    expect(runTerminalCommand('hack', context).output.join('\n')).toMatch(
      /не найдена/i,
    )
    expect(runTerminalCommand('', context)).toEqual({ output: [] })
    expect(runTerminalCommand('   ', context)).toEqual({ output: [] })
  })
})
