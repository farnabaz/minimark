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

      if (typeof value === 'object') {
        return `${key}="${JSON.stringify(value).replace(/"/g, '\\"')}"`
      }

      return `${key}="${value}"`
    })

    .join(' ')

  return attrs.length > 0 ? `{${attrs}}` : ''
}

export function markdownYamlAttributes(attributes: Record<string, unknown>) {
  const yaml = dump(attributes, {
    replacer: (_key, value) => {
      if (value === 'true' || value === 'false') {
        return Boolean(value)
      }
      return value
    },
  })
  return `---\n${unquoteColonKeys(yaml).trim()}\n---`
}

/**
 * js-yaml wraps keys with quotes if they start with a colon. This function removes the quotes.
 * `':test': true` becomes `:test: true`
 *
 * Using js-yaml and this function is faster than using other libraries like yaml.
 */
function unquoteColonKeys(yamlOutput: string) {
  const lines = yamlOutput.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trimStart()

    // Check if line starts with a quote followed by colon
    if (trimmed[0] === '\'' || trimmed[0] === '"') {
      const quote = trimmed[0]
      if (trimmed[1] === ':') {
        // Find the closing quote
        const quoteEnd = trimmed.indexOf(quote, 1)
        if (quoteEnd > 1 && trimmed[quoteEnd + 1] === ':') {
          // Remove quotes: keep indentation + unquoted key + rest
          const indent = line.length - trimmed.length
          lines[i] = ' '.repeat(indent) + trimmed.slice(1, quoteEnd) + trimmed.slice(quoteEnd + 1)
        }
      }
    }
  }
  return lines.join('\n')
}
