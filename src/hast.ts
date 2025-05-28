import type { MinimarkElement, MinimarkNode, MinimarkTree } from './types'

interface HastNode {
  type: 'element' | 'text' | 'comment'
  tag?: string
  value?: string
  props?: Record<string, unknown>
  children?: HastNode[]
}

// -- to minimark

export function hastToMinimark(input: { type: 'root', children: HastNode[] }): MinimarkTree {
  return {
    type: 'minimark',
    value: input.children.map(hastToMinimarkNode).filter(v => v !== undefined) as MinimarkNode[],
  }
}

function hastToMinimarkNode(input: HastNode): MinimarkNode | undefined {
  if (input.type === 'comment') {
    return undefined
  }
  if (input.type === 'text') {
    return input.value
  }

  // remove empty class
  if (input.tag === 'code' && input.props?.className && (input.props.className as string[]).length === 0) {
    delete input.props.className
  }

  return [
    input.tag!,
    input.props || {},
    ...(input.children || []).map(hastToMinimarkNode)
      .filter(v => v !== undefined) as MinimarkNode[],
  ]
}

// -- to hast

export function minimarkToHast(input: MinimarkTree): { type: 'root', children: HastNode[] } {
  return {
    type: 'root',
    children: input.value.map(minimarkToHastNode),
  }
}

function minimarkToHastNode(input: MinimarkNode): HastNode {
  if (typeof input === 'string') {
    return {
      type: 'text',
      value: input,
    }
  }

  const [tag, props, ...children] = input as MinimarkElement
  return {
    type: 'element',
    tag,
    props,
    children: children.map(minimarkToHastNode),
  }
}
