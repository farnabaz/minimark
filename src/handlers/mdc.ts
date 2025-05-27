import type { State, MinimarkElement } from "../types"
import { htmlAttributes, indent } from "../utils"
import { html } from "./html"

export function mdc(node: MinimarkElement, state: State) {
  const [tag, attributes, ...children] = node

  if (tag === 'table') {
    return html(node, state)
  }

  const inline = children.every(child => typeof child === 'string')
  const content = children.map(child => state.one(child, state))
    .join('').trim()


  const attrs = Object.keys(attributes).length > 0 
    ? `{${htmlAttributes(attributes)}}` 
    : ''

  if (tag === 'span') {
    return `[${content}]${attrs}`
  }

  return inline
    ? `:${tag}${content && `[${content}]`}${attrs}`
    : `::${tag}${attrs}\n${content}\n::` + state.context.blockSeparator 
}