import { describe, it, expect } from 'vitest'
import { stringify } from '../src/stringify'
import type { MinimarkTree } from '../src/types'

describe('stringify', () => {
  it('should stringify a minimal tree', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [['p', {}, 'Hello']] }
    expect(stringify(tree)).toBe('Hello\n')
  })

  it('should stringify a minimal tree with multiple children', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [['p', {}, 'Hello'], ['p', {}, 'World']] }
    expect(stringify(tree)).toBe('Hello\n\nWorld\n')
  })

  it('should stringify a minimal tree with nested children', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [['p', {}, 'Hello ', ['code', {}, 'world']]] }
    expect(stringify(tree)).toBe('Hello `world`\n')
  })

  // H1 + paragraph
  it('should stringify a minimal tree with a heading and a paragraph', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [['h1', {}, 'Hello'], ['p', {}, 'World']] }
    expect(stringify(tree)).toBe('# Hello\n\nWorld\n')
  })

  // H1 + paragraph + H2 + pre
  it('should stringify a minimal tree with a heading, a paragraph, a heading, and a pre', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [
      ['h1', {}, 'Hello'],
      ['p', {}, 'World'],
      ['h2', {}, 'Hello'],
      ['pre', {}, 'console.log("Hello, world!")']
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
  it('should stringify a minimal tree with a heading, a paragraph, a horizontal rule, and a paragraph with text and code', () => {
    const tree: MinimarkTree = { type: 'minimal', value: [
      ['h1', {}, 'Hello'],
      ['p', {}, 'World ', ['a', { href: 'https://www.google.com' }, 'Google']],
      ['hr', {}],
      ['p', {}, 'Hello ', ['code', {}, 'world']]
    ] }
    expect(stringify(tree)).toBe(`# Hello

World [Google](https://www.google.com)

---

Hello \`world\`
`)
  })
})