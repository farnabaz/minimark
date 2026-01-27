import type { State, MinimarkElement, MinimarkNode } from '../types'
import { indent, markdownAttributes, markdownYamlAttributes } from '../utils'
import { html } from './html'

export function mdc(node: MinimarkElement, state: State) {
  const [tag, attributes, ...children] = node

  if (tag === 'table') {
    return html(node, state)
  }

  const inline = children.every((child: MinimarkNode) => typeof child === 'string')
  const content = children.map((child: MinimarkNode) => state.one(child, { ...state, nodeDepthInTree: (state.nodeDepthInTree || 0) + 1 }))
    .join('').trim()

  const attrs = Object.keys(attributes).length > 0
    ? markdownAttributes(attributes)
    : ''

  if (tag === 'span') {
    return `[${content}]${attrs}`
  }

  const fence = ':'.repeat((state.nodeDepthInTree || 0) + 2)

  let result = `:${tag}${content && `[${content}]`}${attrs}`

  if (!inline) {
    if (attrs.length > 64) {
      const yamlAttrs = markdownYamlAttributes(attributes)
      result = `${fence}${tag}\n${yamlAttrs}\n${content}\n${fence}` + state.context.blockSeparator
    }
    else {
      result = `${fence}${tag}${attrs}\n${content}\n${fence}` + state.context.blockSeparator
    }
  }

  return indent(result, { level: state.nodeDepthInTree || 0 })
}
