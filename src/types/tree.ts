export type MinimarkText = string

export type MinimarkElement = [string, Record<string, unknown>, ...MinimarkNode[]]

export type MinimarkNode = MinimarkElement | MinimarkText

export type MinimarkTree = {
  type: 'minimark'
  value: MinimarkNode[]
}

export type MinimalTree = {
  type: 'minimal'
  value: MinimarkNode[]
}
