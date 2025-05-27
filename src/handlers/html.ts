import type { State, MinimarkElement } from "../types"
import { htmlAttributes, indent, text } from "../utils"

const selfCloseTags = ['br', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']

export function html(node: MinimarkElement, state: State, parent?: MinimarkElement) {
  const [tag, attributes, ...children] = cleanup(node)

  const inline = parent?.[0] === 'p' && children.every(child => typeof child === 'string')
  const isSelfClose = selfCloseTags.includes(tag as string)

  // Do not modify context if we are already in html mode
  const revert = !state.context.html ? state.applyContext({ html: true }) : null

  const content = children.map(child => state.one(child, state, node))
    .join('').trim()

  // Revert, only if we modified the context
  revert && state.applyContext(revert)

  const attrs = Object.keys(attributes).length > 0 
    ? ` ${htmlAttributes(attributes)}` 
    : ''

  if (selfCloseTags.includes(tag as string)) {
    return `<${tag}${attrs} />` + (inline ? '' : state.context.blockSeparator)
  }

  return inline
    ? `<${tag}${attrs}>${content}</${tag}>`
    : `<${tag}${attrs}>\n${indent(content)}\n</${tag}>` + state.context.blockSeparator
}

function cleanup(node: MinimarkElement): MinimarkElement {
  const [tag, attributes, ...children] = node

  if (tag === 'pre') {
    return [
      tag,
      {
        language: attributes.language,
      },
      attributes.code || text(node)
    ] as unknown as MinimarkElement
  }
  

  return node
}