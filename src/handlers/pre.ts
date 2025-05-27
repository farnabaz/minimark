import type { State, MinimarkElement } from "../types"

export function pre(node: MinimarkElement, state: State) {
  const [_, attributes, ...children] = node
  
  const language = (attributes.language || '')
  const filename = attributes.filename ? ' [' + attributes.filename + ']' : ''

  const result = '```' + language + filename + (attributes.meta || '') + '\n'
      + String(node[1]?.code || children.join('')).trim()
      + '\n```'
  
  return result + state.context.blockSeparator
}