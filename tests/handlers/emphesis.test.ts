import { describe, it, expect } from 'vitest'
import { emphesis } from '../../src/handlers/emphesis'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('emphesis handler', () => {
  it('should return an emphesis element', () => {
    const node: MinimarkElement = ['emphesis', {}, 'Hello']
    expect(emphesis(node, state)).toBe('*Hello*')
  })
})
