import type { MinimarkNode } from "./types"

export function indent(text: string) {
  return text.split('\n').map(line => '  ' + line).join('\n')
}

export function text(node: MinimarkNode): string {
  if (typeof node === 'string') {
    return node as string
  }
  const [_, attributes, ...children] = node

  return children.map(child => text(child)).join('')
}

export function htmlAttributes(attributes: Record<string, any>) {
  return Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
}