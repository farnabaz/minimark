import type { State, MinimarkElement } from '../types'

// TODO: support title & attributes
export function a(node: MinimarkElement, state: State) {
  const [_, attributes] = node

  const content = state.flow(node, state)

  return `[${content}](${attributes.href})`
}
