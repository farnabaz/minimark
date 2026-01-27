import type { MinimarkElement } from '../types'
import { markdownAttributes } from '../utils'

export function img(node: MinimarkElement) {
  const [_, attrs] = node
  const { title, src, alt, ...rest } = attrs

  const attrsString = Object.keys(rest).length > 0
    ? markdownAttributes(rest)
    : ''

  return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})${attrsString}`
}
