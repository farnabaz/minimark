import { describe, expect, it } from 'vitest'
import { hr } from '../../src/handlers/hr'
import { state } from '../../src/utils/state'

describe('hr handler', () => {
  it('should return ---', () => {
    expect(hr(['hr', {}], state)).toBe(`---${state.context.blockSeparator}`)
  })
})
