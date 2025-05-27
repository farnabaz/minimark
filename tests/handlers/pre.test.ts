import { describe, it, expect } from 'vitest'
import { pre } from '../../src/handlers/pre'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

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
    expect(pre(node, state)).toBe('```showLineNumbers\nconst x = 1;\n```\n\n')
  })

  it('should format code block with multiple attributes', () => {
    const node: MinimarkElement = ['pre', { 
      language: 'javascript',
      filename: 'test.js',
      meta: 'showLineNumbers'
    }, 'const x = 1;']
    expect(pre(node, state)).toBe('```javascript [test.js]showLineNumbers\nconst x = 1;\n```\n\n')
  })

  it('should handle empty attributes', () => {
    const node: MinimarkElement = ['pre', {}, 'const x = 1;']
    expect(pre(node, state)).toBe('```\nconst x = 1;\n```\n\n')
  })

  it('should handle code in attributes', () => {
    const node: MinimarkElement = ['pre', { code: 'const x = 1;' }]
    expect(pre(node, state)).toBe('```\nconst x = 1;\n```\n\n')
  })
})
