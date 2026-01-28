import { describe, it, expect } from 'vitest'
import { p } from '../../src/handlers/p'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('line-break handler', () => {
  it('should return a line break', () => {
    const node: MinimarkElement = [
      'p',
      {},
      'Hello',
      ['br', {}],
      'World',
    ]
    expect(p(node, state)).toBe('Hello  \nWorld\n\n')
  })
})
