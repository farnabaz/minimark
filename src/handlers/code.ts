import type { State, MinimarkElement } from "../types"
import { text } from "../utils"

export function code(node: MinimarkElement, _: State) {
  return `\`${text(node)}\``
}
