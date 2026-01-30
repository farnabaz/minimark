import { describe, it, expect } from 'vitest'
import { li } from '../../src/handlers/li'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('li handler', () => {
  it('should return a list item', () => {
    const node: MinimarkElement = ['li', {}, 'Hello']
    expect(li(node, state)).toBe('- Hello\n')
  })

  it('should return a task list item', () => {
    const node: MinimarkElement = ['li', { className: 'task-list-item' }, ['input', { type: 'checkbox', checked: true }], 'Hello']
    expect(li(node, state)).toBe('- [x] Hello\n')
  })

  it('should return valid task list item unchecked', () => {
    const node: MinimarkElement = [
      'li',
      {
        class: 'task-list-item',
      },
      [
        'input',
        {
          'class': 'task-list-item-checkbox',
          ':disabled': 'true',
          'type': 'checkbox',
        },
      ],
      ' TODO',
    ]
    expect(li(node, state)).toBe('- [ ] TODO\n')
  })
  it('should return valid task list item checked', () => {
    const node: MinimarkElement = [
      'li',
      {
        class: 'task-list-item',
      },
      [
        'input',
        {
          'class': 'task-list-item-checkbox',
          ':checked': 'true',
          ':disabled': 'true',
          'type': 'checkbox',
        },
      ],
      ' Done',
    ]
    expect(li(node, state)).toBe('- [x] Done\n')
  })
})
