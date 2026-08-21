export const XTERM_PROMPT = '\x1b[1;36msystem\x1b[0m \x1b[1;34m$\x1b[0m '

export type XtermKeyResult = {
  buffer: string
  write: string
  submit?: string
}

export function applyXtermData(data: string, buffer: string): XtermKeyResult {
  if (data === '\r') {
    return { buffer: '', write: '\r\n', submit: buffer }
  }

  if (data === '\u0003') {
    return { buffer: '', write: '^C\r\n' }
  }

  if (data === '\u007f' || data === '\b') {
    if (!buffer) return { buffer, write: '' }
    return { buffer: buffer.slice(0, -1), write: '\b \b' }
  }

  if (data.startsWith('\u001b')) {
    return { buffer, write: '' }
  }

  return { buffer: buffer + data, write: data }
}
