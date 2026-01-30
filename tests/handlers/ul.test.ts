import { describe, it, expect } from 'vitest'
import { ul } from '../../src/handlers/ul'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('ul handler', () => {
  it('should return a list', () => {
    const node: MinimarkElement = ['ul', {}, ['li', {}, 'Hello']]
    expect(ul(node, state)).toBe('- Hello\n\n')
  })

  it('should return a list with a nested list', () => {
    const node: MinimarkElement = ['ul', {}, ['li', {}, 'hello', ['ul', {}, ['li', {}, 'world']]]]
    expect(ul(node, state)).toBe('- hello\n  - world\n\n')
  })

  it('should return valid task list', () => {
    const node: MinimarkElement = [
      'ul',
      {
        class: 'contains-task-list',
      },
      [
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
      ],
      [
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
        ' todo',
      ],
    ]
    expect(ul(node, state)).toBe('- [x] Done\n- [ ] todo\n\n')
  })
})
