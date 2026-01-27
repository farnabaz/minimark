export type MinimarkText = string

export type MinimarkElement = [string, Record<string, unknown>, ...MinimarkNode[]]

export type MinimarkNode = MinimarkElement | MinimarkText

export type MinimarkTree = {
  type: 'minimark'
  value: MinimarkNode[]
}

/**
 * @deprecated Use MinimarkTree instead
 */
export type MinimalTree = {
  type: 'minimal'
  value: MinimarkNode[]
}
