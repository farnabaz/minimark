import { describe, it, expect } from 'vitest'
import { pre } from '../../src/handlers/pre'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('pre handler', () => {
  it('should format code block with language', () => {
    const node: MinimarkElement = ['pre', { language: 'javascript' }, 'const x = 1;']
    expect(pre(node, state)).toBe('```javascript\nconst x = 1;\n```\n\n')
  })

  it('should format code block with filename', () => {
    const node: MinimarkElement = ['pre', { filename: 'test.js' }, 'const x = 1;']
    expect(pre(node, state)).toBe('``` [test.js]\nconst x = 1;\n```\n\n')
  })

  it('should format code block with meta', () => {
    const node: MinimarkElement = ['pre', { meta: 'showLineNumbers' }, 'const x = 1;']
    expect(pre(node, state)).toBe('``` showLineNumbers\nconst x = 1;\n```\n\n')
  })

  it('should format code block with multiple attributes', () => {
    const node: MinimarkElement = ['pre', {
      language: 'javascript',
      filename: 'test.js',
      meta: 'showLineNumbers',
    }, 'const x = 1;']
    expect(pre(node, state)).toBe('```javascript [test.js] showLineNumbers\nconst x = 1;\n```\n\n')
  })

  it('should handle empty attributes', () => {
    const node: MinimarkElement = ['pre', {}, 'const x = 1;']
    expect(pre(node, state)).toBe('```\nconst x = 1;\n```\n\n')
  })

  it('should handle code in attributes', () => {
    const node: MinimarkElement = ['pre', { code: 'const x = 1;' }]
    expect(pre(node, state)).toBe('```\nconst x = 1;\n```\n\n')
  })

  it('should handle code props', () => {
    const node: MinimarkElement = [
      'pre',
      {
        language: 'javascript',
        filename: '@[...slug].ts',
        highlights: [
          1,
          2,
          3,
          5,
          9,
          10,
          11,
        ],
        meta: 'meta=meta-value',
      },
      [
        'code',
        {
          class: 'language-javascript',
        },
        'function hello() {\n  console.log("Hello, World!");\n}\n',
      ],
    ]
    expect(pre(node, state)).toBe('```javascript [@[...slug\\\\].ts] {1-3,5,9-11} meta=meta-value\nfunction hello() {\n  console.log("Hello, World!");\n}\n```\n\n')
  })

  it('should handle code props 2', () => {
    const node: MinimarkElement = [
      'pre',
      {
        language: 'ts',
        filename: 'test.ts',
        highlights: [
          1,
          3,
          4,
          5,
          6,
        ],
      },
      [
        'code',
        {
          class: 'language-ts',
        },
        'function hello(a: number, b: number) {\n  return a + b;\n}\n',
      ],
    ]
    expect(pre(node, state)).toBe('```ts [test.ts] {1,3-6}\nfunction hello(a: number, b: number) {\n  return a + b;\n}\n```\n\n')
  })
})
