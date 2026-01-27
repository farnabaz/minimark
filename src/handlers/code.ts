import type { MinimarkElement } from '../types'
import { markdownAttributes, textContent } from '../utils'

export function code(node: MinimarkElement) {
  const [_, attrs] = node
  const attrsString = Object.keys(attrs).length > 0
    ? markdownAttributes(attrs)
    : ''
  const content = textContent(node)
  const fence = content.includes('`') ? '``' : '`'

  return `${fence}${content}${fence}${attrsString}`
}
