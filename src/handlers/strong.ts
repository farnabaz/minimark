import type { State, MinimarkElement } from '../types'
import { textContent } from '../utils'

export function strong(node: MinimarkElement, _: State) {
  return `**${textContent(node)}**`
}
