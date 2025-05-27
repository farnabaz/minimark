import { describe, it, expect } from 'vitest'
import { li } from '../../src/handlers/li'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('li handler', () => {
  it('should return a list item', () => {
    const node: MinimarkElement = ['li', {}, 'Hello']
    expect(li(node, state)).toBe('- Hello\n')
  })

  it('should return a task list item', () => {
    const node: MinimarkElement = ['li', { className: 'task-list-item' }, ['input', { type: 'checkbox', checked: true }], 'Hello']
    expect(li(node, state)).toBe('- [x] Hello\n')
  })


})