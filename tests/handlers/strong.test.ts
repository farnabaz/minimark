import { describe, it, expect } from 'vitest'
import { strong } from '../../src/handlers/strong'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('strong handler', () => {
  it('should return a strong element', () => {
    const node: MinimarkElement = ['strong', {}, 'Hello']
    expect(strong(node, state)).toBe('**Hello**')
  })
})