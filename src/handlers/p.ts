import type { State, MinimarkElement, MinimarkNode } from '../types'

export function p(node: MinimarkElement, state: State) {
  const children = node.slice(2) as MinimarkNode[]

  return children.map(child => state.one(child, state, node)).join('') + state.context.blockSeparator
}
