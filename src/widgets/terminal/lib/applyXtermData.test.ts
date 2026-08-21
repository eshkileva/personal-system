import { describe, expect, it } from 'vitest'
import { applyXtermData } from './applyXtermData'

describe('applyXtermData', () => {
  it('echoes printable characters into the line buffer', () => {
    expect(applyXtermData('h', '')).toEqual({ buffer: 'h', write: 'h' })
    expect(applyXtermData('elp', 'h')).toEqual({
      buffer: 'help',
      write: 'elp',
    })
  })

  it('submits the line on carriage return', () => {
    expect(applyXtermData('\r', 'help')).toEqual({
      buffer: '',
      write: '\r\n',
      submit: 'help',
    })
  })

  it('erases one character on backspace', () => {
    expect(applyXtermData('\u007f', 'hel')).toEqual({
      buffer: 'he',
      write: '\b \b',
    })
    expect(applyXtermData('\u007f', '')).toEqual({ buffer: '', write: '' })
  })

  it('cancels the line on Ctrl+C and ignores escape sequences', () => {
    expect(applyXtermData('\u0003', 'sudo')).toEqual({
      buffer: '',
      write: '^C\r\n',
    })
    expect(applyXtermData('\u001b[A', 'help')).toEqual({
      buffer: 'help',
      write: '',
    })
  })
})
