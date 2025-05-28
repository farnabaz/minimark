import type { State, MinimarkElement } from '../types'
import { htmlAttributes, indent, textContent } from '../utils'

const textBlocks = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'])
const selfCloseTags = new Set(['br', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const fullHtmlTags = new Set(['table'])

export function html(node: MinimarkElement, state: State, parent?: MinimarkElement) {
  const [tag, attributes, ...children] = cleanup(node)

  const inline = textBlocks.has(String(parent?.[0])) && children.every(child => typeof child === 'string')
  const isSelfClose = selfCloseTags.has(String(tag))

  // Do not modify context if we are already in html mode
  const revert = !state.context.html && fullHtmlTags.has(String(tag)) ? state.applyContext({ html: true }) : null

  const content = children.map(child => state.one(child, state, node))
    .join('').trim()

  // Revert, only if we modified the context
  if (revert) {
    state.applyContext(revert)
  }

  const attrs = Object.keys(attributes).length > 0
    ? ` ${htmlAttributes(attributes)}`
    : ''

  if (isSelfClose) {
    return `<${tag}${attrs} />` + (inline ? '' : state.context.blockSeparator)
  }

  return inline
    ? `<${tag}${attrs}>${content}</${tag}>`
    : `<${tag}${attrs}>\n${paddNoneHtmlContent(content, state)}\n</${tag}>` + state.context.blockSeparator
}

function paddNoneHtmlContent(content: string, state: State) {
  if (state.context.html) {
    return indent(content)
  }

  return (
    (content.trim().startsWith('<') ? '' : '\n')
    + content
    + (content.trim().endsWith('>') ? '' : '\n')
  )
}

function cleanup(node: MinimarkElement): MinimarkElement {
  const [tag, attributes] = node

  if (tag === 'pre') {
    return [
      tag,
      {
        language: attributes.language,
      },
      attributes.code || textContent(node),
    ] as unknown as MinimarkElement
  }

  return node
}
