import type { State, MinimarkElement } from '../types'
import { textContent } from '../utils'

export function pre(node: MinimarkElement, state: State) {
  const [_, attributes, ...children] = node

  const codeClasses = (children[0]?.[1] as Record<string, string>)?.class

  const language = (attributes.language || (codeClasses?.split(' ').find(cls => cls.startsWith('language-')))?.slice(9)) || ''
  const filename = attributes.filename ? ' [' + attributes.filename + ']' : ''

  const result = '```' + language + filename + (attributes.meta || '') + '\n'
    + String(node[1]?.code || textContent(node)).trim()
    + '\n```'

  return result + state.context.blockSeparator
}
