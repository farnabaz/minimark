import type { MinimarkElement, MinimarkNode } from './tree'

export interface StringifyOptions {
  /**
   * @default '\n\n'
   */
  blockSeparator: string

  /**
   * @default 'markdown/mdc'
   */
  format: 'markdown/mdc' | 'markdown/html' | 'text/html'
  /**
   * user defined node handlers
   */
  handlers: Record<string, NodeHandler>

  /**
   * @default true
   */
  removeLastStyle?: boolean
}

export type NodeHandler = (node: MinimarkElement, state: State, parent?: MinimarkElement) => string

export interface Context extends StringifyOptions {
  /**
   * true if node is inside html scope
   */
  html?: boolean

  /**
   * true if node is inside a list
   */
  list?: boolean

  /**
   * number if node is inside an ordered list
   */
  order?: number

  [key: string]: unknown
}

export type State = {
  handlers: Record<string, NodeHandler>
  context: Context
  flow: NodeHandler
  one: (node: MinimarkNode, state: State, parent?: MinimarkElement) => string
  applyContext: (edit: Record<string, unknown>) => Record<string, unknown>
}
