import type { State, MinimarkElement, MinimarkNode } from '../types'

export function blockquote(node: MinimarkElement, state: State) {
  const children = node.slice(2) as MinimarkNode[]

  const content = children.map((child) => state.one(child, state))
    .join('')
    .trim()
    .split('\n')
    .map((line) => `> ${line}`)
    .join('\n')

  return content + state.context.blockSeparator
}