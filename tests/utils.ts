import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { compressTree } from '@nuxt/content/runtime'
import fs from 'node:fs'

export async function getAST() {
  const makrdown = fs.readFileSync('tests/markdown.spec.md', 'utf8')
  const tree = await parseMarkdown(makrdown)
  return compressTree(tree.body)
}