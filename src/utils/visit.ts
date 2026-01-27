import type { MinimarkNode, MinimarkTree } from '../types'

export function visit(tree: MinimarkTree, checker: (node: MinimarkNode) => boolean, visitor: (node: MinimarkNode) => MinimarkNode | undefined) {
  function walk(node: MinimarkNode, parent: MinimarkNode | MinimarkNode[], index: number) {
    if (checker(node)) {
      const res = visitor(node)
      if (res !== undefined) {
        (parent as MinimarkNode[])[index] = res
      }
    }
    if (Array.isArray(node) && node.length > 2) {
      for (let i = 2; i < node.length; i++) {
        walk(node[i] as MinimarkNode, node, i)
      }
    }
  }

  tree.value.forEach((node, i) => {
    walk(node, tree.value, i)
  })
}
