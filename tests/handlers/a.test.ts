import { describe, it, expect } from 'vitest'
import { a } from '../../src/handlers/a'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('a handler', () => {
  it('should return a link', () => {
    const node: MinimarkElement = ['a', { href: 'https://www.google.com' }, 'Google']
    expect(a(node, state)).toBe('[Google](https://www.google.com)')
  })

  // text + code
  it('should return a link with text and code', () => {
    const node: MinimarkElement = ['a', { href: 'https://www.google.com' }, 'Google ', ['code', {}, 'console.log("Hello, world!")']]
    expect(a(node, state)).toBe('[Google `console.log("Hello, world!")`](https://www.google.com)')
  })
})