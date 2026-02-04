import type { State, MinimarkElement, MinimarkNode } from '../types'
import { indent, markdownAttributes, markdownYamlAttributes } from '../utils'
import { html } from './html'

export function mdc(node: MinimarkElement, state: State, parent?: MinimarkElement) {
  const [tag, attributes, ...children] = node

  if (tag === 'table') {
    return html(node, state)
  }

  const attributeEntries = Object.entries(attributes)
  const hasObjectAttributes = attributeEntries.some(([, value]) => typeof value === 'object')
  // if component has only text children, it is inline
  let inline = children.every((child: MinimarkNode) => typeof child === 'string')

  // if component has object attributes, it is not inline
  if (hasObjectAttributes) {
    inline = false
  }
  // components inside paragraphs are inline
  if (parent?.[0] === 'p') {
    inline = true
  }

  // if component has a text sibling, it is inline
  if (!inline && parent?.some((child, index) => index > 1 && typeof child === 'string')) {
    inline = true
  }

  const content = children.map((child: MinimarkNode) => state.one(child, { ...state, nodeDepthInTree: (state.nodeDepthInTree || 0) + 1 }, node))
    .join('').trimEnd()

  const attrs = attributeEntries.length > 0 ? markdownAttributes(attributes) : ''

  if (tag === 'span') {
    return `[${content}]${attrs}`
  }

  const fence = ':'.repeat((state.nodeDepthInTree || 0) + 2)

  let result = `:${tag}${content && `[${content}]`}${attrs}`

  if (!inline) {
    if (attrs.length > 64 || hasObjectAttributes) {
      const yamlAttrs = markdownYamlAttributes(attributes)
      result = `${fence}${tag}\n${yamlAttrs}${content ? `\n${content}` : ''}\n${fence}` + state.context.blockSeparator
    }
    else {
      result = `${fence}${tag}${attrs}\n${content}\n${fence}` + state.context.blockSeparator
    }
  }

  return inline ? result : indent(result, { level: parent ? 1 : 0 })
}
