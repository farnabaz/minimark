import { describe, expect, it } from 'vitest'
import { stringify } from '../src/stringify'
import { getAST } from './utils'

describe.skip('stringify', async () => {
  const makrdown = await getAST()
  // console.log(JSON.stringify(makrdown, null, 2))

  it('should stringify a minimal tree', () => {
    const str = stringify(makrdown, {
      // format: 'markdown/mdc',
      format: 'text/html',
    })
    expect(str).toBe('Hello\n')
  })
})
