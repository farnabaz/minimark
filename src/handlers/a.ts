import type { State, MinimarkElement } from '../types'
import { markdownAttributes } from '../utils'

// TODO: support title & attributes
export function a(node: MinimarkElement, state: State) {
  const [_, attrs] = node

  const { href, ...rest } = attrs
  const attrsString = Object.keys(rest).length > 0
    ? markdownAttributes(rest)
    : ''
  const content = state.flow(node, state)

  return `[${content}](${href})${attrsString}`
}
