import { handlers } from '../handlers'
import type { State, MinimarkElement, MinimarkNode, Context } from '../types'

export function one(node: MinimarkNode, state: State, parent?: MinimarkElement) {
  if (typeof node === 'string') {
    return node
  }

  if (state.context.html) {
    return state.handlers.html(node, state, parent)
  }

  const nodeHandler = state.context.handlers[node[0] as string] || state.handlers[node[0] as string]
  if (nodeHandler) {
    return nodeHandler(node, state, parent)
  }

  return state.context.format === 'markdown/mdc'
    ? state.handlers.mdc(node, state, parent)
    : state.handlers.html(node, state, parent)
}

export function flow(node: MinimarkElement, state: State, parent?: MinimarkElement) {
  const children = node.slice(2) as MinimarkElement[]

  let result = ''
  for (const child of children) {
    result += one(child, state, parent || node)
  }

  return result
}

export function createState(ctx: Record<string, unknown> = {}): State {
  const context = {
    blockSeparator: '\n\n',
    format: 'markdown/mdc',
    handlers: {}, // user defined node handlers
    ...ctx,
    // Enable html mode for text/html format
    html: ctx.format === 'text/html',
  } as Context

  return {
    handlers,
    context,
    flow,
    one,
    applyContext: (edit: Record<string, unknown>) => {
      const revert = {} as Record<string, unknown>

      for (const [key, value] of Object.entries(edit)) {
        revert[key] = context[key]
        context[key] = value
      }

      return revert
    },
  }
}

export const state: State = {
  handlers,
  context: {
    blockSeparator: '\n\n',
    format: 'markdown/mdc',
    handlers: {}, // user defined node handlers
  },
  flow,
  one,
  applyContext: (edit: Record<string, unknown>) => {
    const revert = {} as Record<string, unknown>

    for (const [key, value] of Object.entries(edit)) {
      revert[key] = state.context[key]
      state.context[key] = value
    }

    return revert
  },
}
