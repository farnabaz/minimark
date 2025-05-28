import type { State, MinimarkElement } from '../types'
import { textContent } from '../utils'

export function code(node: MinimarkElement, _: State) {
  return `\`${textContent(node)}\``
}
