import type { State, MinimarkElement } from '../types'

// h1, h2, h3, h4, h5, h6
export function heading(node: MinimarkElement, state: State) {
  const [tag] = node

  const level = Number(tag.slice(1))

  const content = state.flow(node, state)

  return '#'.repeat(level) + ' ' + content + state.context.blockSeparator
}
