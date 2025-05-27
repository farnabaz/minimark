import type { State, MinimarkElement, MinimarkNode } from "../types"

export function li(node: MinimarkElement, state: State) {
  let children = node.slice(2) as MinimarkNode[]

  const order = state.context.order
  let prefix = order ? `${order}. ` : '- '

  const className = (node[1].className as string) && Array.isArray(node[1].className)
    ? node[1].className.join(' ')
    : String(node[1].className)

  const taskList = className.includes('task-list-item')
  
  if (taskList) {
    const input = children.shift() as MinimarkElement
    prefix += input[1].checked ? '[x] ' : '[ ] '
  }

  const result = children.map(child => state.one(child, state).trimEnd()).join('').trim()

  if (order) {
    state.applyContext({ order: order + 1 })
  }

  return `${prefix}${result}\n`
}