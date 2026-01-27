import { describe, it, expect } from 'vitest'
import { stringify } from '../src/stringify'
import type { MinimarkTree } from '../src/types'

describe('stringify', () => {
  it('should stringify a minimark tree', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [['p', {}, 'Hello']] }
    expect(stringify(tree)).toBe('Hello\n')
  })

  it('should stringify a minimark tree with multiple children', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [['p', {}, 'Hello'], ['p', {}, 'World']] }
    expect(stringify(tree)).toBe('Hello\n\nWorld\n')
  })

  it('should stringify a minimark tree with nested children', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [['p', {}, 'Hello ', ['code', {}, 'world']]] }
    expect(stringify(tree)).toBe('Hello `world`\n')
  })

  // H1 + paragraph
  it('should stringify a minimark tree with a heading and a paragraph', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [['h1', {}, 'Hello'], ['p', {}, 'World']] }
    expect(stringify(tree)).toBe('# Hello\n\nWorld\n')
  })

  // H1 + paragraph + H2 + pre
  it('should stringify a minimark tree with a heading, a paragraph, a heading, and a pre', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [
      ['h1', {}, 'Hello'],
      ['p', {}, 'World'],
      ['h2', {}, 'Hello'],
      ['pre', {}, 'console.log("Hello, world!")'],
    ] }
    expect(stringify(tree)).toBe(`# Hello

World

## Hello

\`\`\`
console.log("Hello, world!")
\`\`\`
`)
  })

  // H1 + paragraph(text + link) + hr + paragraph(text + code)
  it('should stringify a minimark tree with a heading, a paragraph, a horizontal rule, and a paragraph with text and code', () => {
    const tree: MinimarkTree = { type: 'minimark', value: [
      ['h1', {}, 'Hello'],
      ['p', {}, 'World ', ['a', { href: 'https://www.google.com' }, 'Google']],
      ['hr', {}],
      ['p', {}, 'Hello ', ['code', {}, 'world']],
    ] }
    expect(stringify(tree)).toBe(`# Hello

World [Google](https://www.google.com)

---

Hello \`world\`
`)
  })

  // Table
  it('should stringify a table', () => {
    const tree: MinimarkTree = {
      type: 'minimark',
      value: [
        [
          'table',
          {},
          ['thead', {}, ['tr', {}, ['th', {}, 'Name'], ['th', {}, 'Age'], ['th', {}, 'City']]],
          [
            'tbody',
            {},
            ['tr', {}, ['td', {}, 'John'], ['td', {}, '25'], ['td', {}, 'NYC']],
            ['tr', {}, ['td', {}, 'Jane'], ['td', {}, '30'], ['td', {}, 'Los Angeles']],
            ['tr', {}, ['td', {}, 'Bob'], ['td', {}, '35'], ['td', {}, 'SF']],
          ],
        ],
      ],
    }
    expect(stringify(tree)).toBe(`| Name | Age | City        |
| ---- | --- | ----------- |
| John | 25  | NYC         |
| Jane | 30  | Los Angeles |
| Bob  | 35  | SF          |
`)
  })

  // Table with alignment
  it('should stringify a table with alignment', () => {
    const tree: MinimarkTree = {
      type: 'minimark',
      value: [
        [
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
        ],
      ],
    }
    expect(stringify(tree)).toBe(`| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |
`)
  })
})
