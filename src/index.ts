import { createState, one } from "./state"
import { StringifyOptions, MinimarkTree } from "./types"

const defaultOptions: Partial<StringifyOptions> = {
  format: 'markdown/mdc',
  removeLastStyle: true
}

export function stringify(node: MinimarkTree, options: Partial<StringifyOptions> = {}) {
  options = { ...defaultOptions, ...options }

  const _state = createState(options)

  const children = node.value

  const lastIndex = children.length - 1

  return children.map((child, index) => {
    if (index === lastIndex && options.removeLastStyle && child[0] === 'style') {
      return ''
    }
    return one(child, _state)
  }).join('').trim() + '\n'
}