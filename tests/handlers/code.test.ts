import { describe, it, expect } from 'vitest'
import { code } from '../../src/handlers/code'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('code handler', () => {
  it('should return a code block', () => {
    const node: MinimarkElement = ['code', {}, 'Hello']
    expect(code(node, state)).toBe('`Hello`')
  })
})
