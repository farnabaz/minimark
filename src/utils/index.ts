import type { MinimarkNode } from '../types'
import { dump } from 'js-yaml'
import { decodeHTML } from 'entities'

export function indent(text: string, { ignoreFirstLine = false, level = 1 }: { ignoreFirstLine?: boolean, level?: number } = {}) {
  return text.split('\n').map((line, index) => {
    if (ignoreFirstLine && index === 0) {
      return line
    }
    return line ? '  '.repeat(level) + line : line
  }).join('\n')
}

export function textContent(node: MinimarkNode, options: { decodeUnicodeEntities?: boolean } = {}): string {
  if (typeof node === 'string') {
    if (options.decodeUnicodeEntities) {
      return decodeHTML(node)
    }
    return node as string
  }
  const children = node.slice(2) as MinimarkNode[]

  return children.map(child => textContent(child, options)).join('')
}

export function htmlAttributes(attributes: Record<string, unknown>) {
  return Object.entries(attributes)
    .map(([key, value]) => {
      if (key.startsWith(':')) {
        if (value === 'true') {
          return key.slice(1)
        }

        return `${key.slice(1)}="${value}"`
      }

      if (typeof value === 'object') {
        return `${key}="${JSON.stringify(value).replace(/"/g, '\\"')}"`
      }

      return `${key}="${value}"`
    })
    .join(' ')
}

export function markdownAttributes(attributes: Record<string, unknown>) {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => {
      if (key.startsWith(':') && value === 'true') {
        return key.slice(1)
      }
      if (key === 'id') {
        return `#${value}`
      }
      if (key === 'class') {
        return `.${value}`
      }
      return `${key}="${value}"`
    })

    .join(' ')

  return attrs.length > 0 ? `{${attrs}}` : ''
}

export function markdownYamlAttributes(attributes: Record<string, unknown>) {
  return `---\n${dump(attributes).trim()}\n---`
}
