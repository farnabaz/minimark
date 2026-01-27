import { describe, it, expect } from 'vitest'
import { table } from '../../src/handlers/table'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('table handler', () => {
  it('should return a simple table with thead and tbody', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age']]],
      ['tbody', {}, ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']]],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age |\n'
      + '| ---- | --- |\n'
      + '| John | 25  |\n\n',
    )
  })

  it('should handle table with multiple body rows', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30']],
        ['tr', {}, ['td', {}, 'Bob'], ['td', {}, '35']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age |\n'
      + '| ---- | --- |\n'
      + '| John | 25  |\n'
      + '| Jane | 30  |\n'
      + '| Bob  | 35  |\n\n',
    )
  })

  it('should handle table with three columns', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age'], ['th', {}, 'City']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25'], ['td', {}, 'NYC']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30'], ['td', {}, 'LA']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age | City |\n'
      + '| ---- | --- | ---- |\n'
      + '| John | 25  | NYC  |\n'
      + '| Jane | 30  | LA   |\n\n',
    )
  })

  it('should handle table without thead (direct tr children)', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age']],
      ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age |\n'
      + '| ---- | --- |\n'
      + '| John | 25  |\n\n',
    )
  })

  it('should handle table with only tbody (no explicit headers)', () => {
    const node: MinimarkElement = [
      'table',
      {},
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Column 1 | Column 2 |\n'
      + '| -------- | -------- |\n'
      + '| John     | 25       |\n'
      + '| Jane     | 30       |\n\n',
    )
  })

  it('should handle cells with longer content', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Description']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, 'Software Engineer']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, 'Product Manager']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Description       |\n'
      + '| ---- | ----------------- |\n'
      + '| John | Software Engineer |\n'
      + '| Jane | Product Manager   |\n\n',
    )
  })

  it('should handle cells with inline elements', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Status']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, ['strong', {}, 'Active']]],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, ['code', {}, 'pending']]],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Status     |\n'
      + '| ---- | ---------- |\n'
      + '| John | **Active** |\n'
      + '| Jane | `pending`  |\n\n',
    )
  })

  it('should handle empty cells', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age'], ['th', {}, 'City']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25'], ['td', {}, '']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, ''], ['td', {}, 'LA']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age | City |\n'
      + '| ---- | --- | ---- |\n'
      + '| John | 25  |      |\n'
      + '| Jane |     | LA   |\n\n',
    )
  })

  it('should handle rows with missing cells', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age'], ['th', {}, 'City']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']],
        ['tr', {}, ['td', {}, 'Jane']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age | City |\n'
      + '| ---- | --- | ---- |\n'
      + '| John | 25  |      |\n'
      + '| Jane |     |      |\n\n',
    )
  })

  it('should return empty string for table with no rows', () => {
    const node: MinimarkElement = ['table', {}, ['tbody', {}]]
    expect(table(node, state)).toBe('')
  })

  it('should handle single column table', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John']],
        ['tr', {}, ['td', {}, 'Jane']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name |\n'
      + '| ---- |\n'
      + '| John |\n'
      + '| Jane |\n\n',
    )
  })

  it('should handle left-aligned columns', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', { style: 'text-align:left' }, 'Name'], ['th', { style: 'text-align:left' }, 'City']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, 'NYC']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, 'LA']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | City |\n'
      + '| :--- | :--- |\n'
      + '| John | NYC  |\n'
      + '| Jane | LA   |\n\n',
    )
  })

  it('should handle center-aligned columns', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', { style: 'text-align:center' }, 'Name'], ['th', { style: 'text-align:center' }, 'Age']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age |\n'
      + '| :--: | :-: |\n'
      + '| John | 25  |\n'
      + '| Jane | 30  |\n\n',
    )
  })

  it('should handle right-aligned columns', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', { style: 'text-align:right' }, 'Name'], ['th', { style: 'text-align:right' }, 'Price']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'Apple'], ['td', {}, '$2.50']],
        ['tr', {}, ['td', {}, 'Orange'], ['td', {}, '$1.75']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name   | Price |\n'
      + '| -----: | ----: |\n'
      + '| Apple  | $2.50 |\n'
      + '| Orange | $1.75 |\n\n',
    )
  })

  it('should handle mixed alignment columns', () => {
    const node: MinimarkElement = [
      'table',
      {},
      [
        'thead',
        {},
        [
          'tr',
          {},
          ['th', { style: 'text-align:left' }, 'Left-aligned'],
          ['th', { style: 'text-align:center' }, 'Center-aligned'],
          ['th', { style: 'text-align:right' }, 'Right-aligned'],
        ],
      ],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'git status'], ['td', {}, 'git status'], ['td', {}, 'git status']],
        ['tr', {}, ['td', {}, 'git diff'], ['td', {}, 'git diff'], ['td', {}, 'git diff']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Left-aligned | Center-aligned | Right-aligned |\n'
      + '| :----------- | :------------: | ------------: |\n'
      + '| git status   | git status     | git status    |\n'
      + '| git diff     | git diff       | git diff      |\n\n',
    )
  })

  it('should handle columns with and without alignment', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', { style: 'text-align:center' }, 'Age'], ['th', {}, 'City']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'John'], ['td', {}, '25'], ['td', {}, 'NYC']],
        ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30'], ['td', {}, 'LA']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name | Age | City |\n'
      + '| ---- | :-: | ---- |\n'
      + '| John | 25  | NYC  |\n'
      + '| Jane | 30  | LA   |\n\n',
    )
  })

  it('should escape pipe characters in cell content', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Command'], ['th', {}, 'Description']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'echo "a|b"'], ['td', {}, 'Prints a|b']],
        ['tr', {}, ['td', {}, 'cmd | grep'], ['td', {}, 'Uses pipe operator']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Command     | Description        |\n'
      + '| ----------- | ------------------ |\n'
      + '| echo "a\\|b" | Prints a\\|b        |\n'
      + '| cmd \\| grep | Uses pipe operator |\n\n',
    )
  })

  it('should handle newlines in cell content by converting to spaces', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Description']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, 'Item 1'], ['td', {}, 'Line 1\nLine 2']],
        ['tr', {}, ['td', {}, 'Item 2'], ['td', {}, 'Single line']],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Name   | Description   |\n'
      + '| ------ | ------------- |\n'
      + '| Item 1 | Line 1 Line 2 |\n'
      + '| Item 2 | Single line   |\n\n',
    )
  })

  it('should handle cells with both pipes and special formatting', () => {
    const node: MinimarkElement = [
      'table',
      {},
      ['thead', {}, ['tr', {}, ['th', {}, 'Code'], ['th', {}, 'Output']]],
      [
        'tbody',
        {},
        ['tr', {}, ['td', {}, ['code', {}, 'a|b']], ['td', {}, ['strong', {}, 'result|value']]],
      ],
    ]
    expect(table(node, state)).toBe(
      '| Code   | Output            |\n'
      + '| ------ | ----------------- |\n'
      + '| `a\\|b` | **result\\|value** |\n\n',
    )
  })
})
