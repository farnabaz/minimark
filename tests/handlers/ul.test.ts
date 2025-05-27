import { describe, it, expect } from 'vitest'
import { ul } from '../../src/handlers/ul'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('ul handler', () => {
  it('should return a list', () => {
    const node: MinimarkElement = ['ul', {}, ['li', {}, 'Hello']]
    expect(ul(node, state)).toBe('- Hello\n\n')
  })

  it('should return a list with a nested list', () => {
    const node: MinimarkElement = ['ul', {}, ['li', {}, 'hello', ['ul', {}, ['li', {}, 'world']]]]
    expect(ul(node, state)).toBe('- hello\n  - world\n\n')
  })
})