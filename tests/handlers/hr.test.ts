import { describe, it, expect } from 'vitest'
import { hr } from '../../src/handlers/hr'
import { state } from '../../src/state'

describe('hr handler', () => {
  it('should return ---', () => {
    expect(hr(['hr', {}], state)).toBe('---' + state.context.blockSeparator)
  })
})