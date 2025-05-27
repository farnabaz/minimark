import { describe, it, expect } from 'vitest'
import { ol } from '../../src/handlers/ol'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('ol handler', () => {
  it('should return an ordered list', () => {
    const node: MinimarkElement = ['ol', {}, ['li', {}, 'Hello']]
    expect(ol(node, state)).toBe('1. Hello\n\n')
  })

  it('should return an ordered list with a nested list', () => {
    const node: MinimarkElement = ['ol', {}, ['li', {}, 'hello', ['ul', {}, ['li', {}, 'world']]]]
    expect(ol(node, state)).toBe('1. hello\n  - world\n\n')
  })
})
