import { describe, it, expect } from 'vitest'
import { p } from '../../src/handlers/p'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('p handler', () => {
  it('should return a paragraph', () => {
    const node: MinimarkElement = ['p', {}, 'Hello']
    expect(p(node, state)).toBe('Hello\n\n')
  })
})
