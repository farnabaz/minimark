import { describe, it, expect } from 'vitest'
import { heading } from '../../src/handlers/heading'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/state'

describe('heading handler', () => {
  it('should return h1', () => {
    const node: MinimarkElement = ['h1', {}, 'Hello']
    expect(heading(node, state)).toBe('# Hello\n\n')
  })

  it('should return h2', () => {
    const node: MinimarkElement = ['h2', {}, 'Hello']
    expect(heading(node, state)).toBe('## Hello\n\n')
  })

  it('should return h3', () => {
    const node: MinimarkElement = ['h3', {}, 'Hello']
    expect(heading(node, state)).toBe('### Hello\n\n')
  })

  it('should return h4', () => {
    const node: MinimarkElement = ['h4', {}, 'Hello']
    expect(heading(node, state)).toBe('#### Hello\n\n')
  })

  it('should return h5', () => {
    const node: MinimarkElement = ['h5', {}, 'Hello']
    expect(heading(node, state)).toBe('##### Hello\n\n')
  })

  it('should return h6', () => {
    const node: MinimarkElement = ['h6', {}, 'Hello']
    expect(heading(node, state)).toBe('###### Hello\n\n')
  })
})