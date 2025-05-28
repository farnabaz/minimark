import type { State, MinimarkElement, MinimarkNode } from '../types'
import { indent } from '../utils'

export function ol(node: MinimarkElement, state: State) {
  const children = node.slice(2) as MinimarkNode[]

  const revert = state.applyContext({ list: true, order: 1 })

  let result = children.map(child => state.one(child, state)).join('').trim()

  if (revert.list) {
    result = '\n' + indent(result)
  }
  else {
    result = result + state.context.blockSeparator
  }

  state.applyContext(revert)

  return result
}
