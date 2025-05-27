import type { State, MinimarkElement } from "../types"

export function hr(_: MinimarkElement, state: State) {
  return '---' + state.context.blockSeparator
}