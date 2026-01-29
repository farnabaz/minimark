import { describe, it, expect } from 'vitest'
import { pre } from '../../src/handlers/pre'
import type { MinimarkElement } from '../../src/types'
import { state } from '../../src/utils/state'

describe('code handler', () => {
  it('should return a code block', () => {
    const node: MinimarkElement = [
      'pre',
      {
        language: 'html',
        filename: 'template.html',
        style: 'background-color:#24292e;color:#e1e4e8',
        class: 'shiki github-dark',
        tabindex: '0',
      },
      [
        'code',
        {
          class: 'language-html',
        },
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '&#x3C;',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'div',
        ],
        [
          'span',
          {
            style: 'color:#B392F0',
          },
          ' class',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '=',
        ],
        [
          'span',
          {
            style: 'color:#9ECBFF',
          },
          '"container"',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
        '\n',
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '  &#x3C;',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'h1',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>Title &#x26; Subtitle&#x3C;/',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'h1',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
        '\n',
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '  &#x3C;',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'p',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>Text with "quotes" and \'apostrophes\'&#x3C;/',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'p',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
        '\n',
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '  &#x3C;',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'script',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
        [
          'span',
          {
            style: 'color:#B392F0',
          },
          'alert',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '(',
        ],
        [
          'span',
          {
            style: 'color:#9ECBFF',
          },
          '\'XSS &#x3C; > test\'',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          ');&#x3C;/',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'script',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
        '\n',
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '&#x3C;/',
        ],
        [
          'span',
          {
            style: 'color:#85E89D',
          },
          'div',
        ],
        [
          'span',
          {
            style: 'color:#E1E4E8',
          },
          '>',
        ],
      ],
    ]
    expect(pre(node, state)).toBe(`\`\`\`html [template.html]
<div class="container">
  <h1>Title & Subtitle</h1>
  <p>Text with "quotes" and 'apostrophes'</p>
  <script>alert('XSS < > test');</script>
</div>
\`\`\`

`)
  })
})
