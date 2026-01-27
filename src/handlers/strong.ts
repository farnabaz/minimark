import type { State, MinimarkElement } from '../types'
import { markdownAttributes } from '../utils'

export function strong(node: MinimarkElement, state: State) {
  const [_, attrs, ...children] = node

  const content = children.map(child => state.one(child, state))
    .join('')
    .trim()

  const attrsString = Object.keys(attrs).length > 0
    ? markdownAttributes(attrs)
    : ''

  return `**${content}**${attrsString}`
}
