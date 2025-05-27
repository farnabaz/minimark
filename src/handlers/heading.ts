import type { State, MinimarkElement } from "../types"

// h1, h2, h3, h4, h5, h6
export function heading(node: MinimarkElement, state: State) {
  const [tag, _, ...children] = node

  const level = Number(tag.slice(1))
  
  return '#'.repeat(level) + ' ' + children.join('') + state.context.blockSeparator
}