import fs from 'node:fs'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { fromHast } from '../src/hast'

export async function getAST() {
  const makrdown = fs.readFileSync('tests/markdown.spec.md', 'utf8')
  const tree = await parseMarkdown(makrdown)
  return fromHast(tree.body)
}
