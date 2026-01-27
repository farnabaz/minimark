import fs from 'fs'
// @ts-expect-error no types for @nuxtjs/mdc/runtime
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { fromHast } from '../src/hast'

export async function getAST() {
  const makrdown = fs.readFileSync('tests/markdown.spec.md', 'utf8')
  const tree = await parseMarkdown(makrdown)
  return fromHast(tree.body)
}
