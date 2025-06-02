import type { MinimarkNode } from '../types'

export function indent(text: string, { ignoreFirstLine = false }: { ignoreFirstLine?: boolean } = {}) {
  return text.split('\n').map((line, index) => {
    if (ignoreFirstLine && index === 0) {
      return line
    }
    return '  ' + line
  }).join('\n')
}

export function textContent(node: MinimarkNode): string {
  if (typeof node === 'string') {
    return node as string
  }
  const children = node.slice(2) as MinimarkNode[]

  return children.map(child => textContent(child)).join('')
}

export function htmlAttributes(attributes: Record<string, unknown>) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
}
