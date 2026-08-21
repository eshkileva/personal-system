export const WHOAMI_COMMAND = 'whoami'

export async function playWhoamiIntro(options: {
  write: (chunk: string) => void
  wait: (ms: number) => Promise<void>
  delayMs: number
  isCancelled: () => boolean
}): Promise<'typed' | 'cancelled'> {
  for (const character of WHOAMI_COMMAND) {
    if (options.isCancelled()) return 'cancelled'
    options.write(character)
    await options.wait(options.delayMs)
  }

  return options.isCancelled() ? 'cancelled' : 'typed'
}
