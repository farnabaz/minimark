import type { State, MinimarkElement } from '../types'

export function img(node: MinimarkElement, _: State) {
  const [tag, attrs] = node

  return `![${attrs.alt}](${attrs.src})`
}