import type { State, MinimarkElement } from '../types'

// slot template
export function template(node: MinimarkElement, state: State) {
  const [_, attrs] = node

  const content = state.flow(node, state).trim()

  return `#${attrs.name}\n${content}` + state.context.blockSeparator
}
