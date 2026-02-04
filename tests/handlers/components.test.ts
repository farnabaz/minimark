import { describe, it, expect } from 'vitest'
import { stringify } from '../../src/stringify'
import type { MinimarkTree } from '../../src/types'

describe('components handler', () => {
  it('should return a component', () => {
    const nestedAst = {
      type: 'minimark',
      value: [
        [
          'component',
          {},
          [
            'p',
            {},
            'First Paragraph',
          ],
          [
            'child',
            {},
            [
              'p',
              {},
              'Second Paragraph',
            ],
            [
              'grand-child',
              {},
              [
                'p',
                {},
                'Third Paragraph',
              ],
            ],
          ],
        ],
      ],
    }

    expect(stringify(nestedAst as MinimarkTree)).toBe(`::component
First Paragraph

  :::child
  Second Paragraph

    ::::grand-child
    Third Paragraph
    ::::
  :::
::
`)
  })

  it('should retuen valid nested markdown', () => {
    const ast: MinimarkTree = {
      type: 'minimark',
      value: [
        [
          'container',
          {
            padding: '0px',
          },
          [
            'container2',
            {
              styles: 'pre {\n  border: 1px solid red !important;\n\n  span {\n    line-height: 1;\n  }\n}\n',
            },
            [
              'p',
              {},
              'This container has a code block.',
            ],
            [
              'pre',
              {
                language: 'js',
                class: 'shiki github-dark',
                tabindex: '0',
                style: 'background-color:#FAFAFA;--shiki-dark-bg:#292D3E;color:#90A4AE;--shiki-dark:#babed8',
              },
              [
                'code',
                {
                  class: 'language-js',
                },
                [
                  'span',
                  {
                    class: 'line',
                  },
                  [
                    'span',
                    {
                      style: 'color:#9C3EDA;--shiki-dark:#C792EA',
                    },
                    'function',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#90A4AE;--shiki-dark:#BABED8',
                    },
                    ' ',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#6182B8;--shiki-dark:#82AAFF',
                    },
                    'test',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '()',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#90A4AE;--shiki-dark:#BABED8',
                    },
                    ' ',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '{',
                  ],
                ],
                '\n',
                [
                  'span',
                  {
                    class: 'line',
                  },
                  [
                    'span',
                    {
                      style: 'color:#E53935;--shiki-dark:#F07178',
                    },
                    '  ',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#90A4AE;--shiki-dark:#BABED8',
                    },
                    'console',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '.',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#6182B8;--shiki-dark:#82AAFF',
                    },
                    'log',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#E53935;--shiki-dark:#F07178',
                    },
                    '(',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '"',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#91B859;--shiki-dark:#C3E88D',
                    },
                    'test',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '"',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#E53935;--shiki-dark:#F07178',
                    },
                    ')',
                  ],
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    ';',
                  ],
                ],
                '\n',
                [
                  'span',
                  {
                    class: 'line',
                  },
                  [
                    'span',
                    {
                      style: 'color:#39ADB5;--shiki-dark:#89DDFF',
                    },
                    '}',
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    }
    expect(stringify(ast)).toBe([
      '::container{padding="0px"}',
      '  :::container2',
      '  ---',
      '  styles: |',
      '    pre {',
      '      border: 1px solid red !important;',
      '',
      '      span {',
      '        line-height: 1;',
      '      }',
      '    }',
      '  ---',
      '  This container has a code block.',
      '',
      '  ```js',
      '  function test() {',
      '    console.log("test");',
      '  }',
      '  ```',
      '  :::',
      '::',
      '',
    ].join('\n'))
  })

  it('should retuen valid nested markdown 1', () => {
    const ast: MinimarkTree = {
      type: 'minimark',
      value: [
        [
          'page-container',
          {
            'simple-array': [
              'item1',
              'item2',
              'item3',
            ],
          },
        ],
        [
          'page-container',
          {
            items: [
              {
                name: 'Item 1',
                description: 'First item',
              },
              {
                name: 'Item 2',
                description: 'Second item',
              },
            ],
          },
        ],
        [
          'page-container',
          {
            attributes: [
              {
                domains: [
                  'internal',
                ],
              },
              {
                env: [
                  'dev',
                  'staging',
                  'prod',
                ],
              },
              {
                dogs: [
                  'husky',
                  'beagle',
                ],
              },
            ],
          },
        ],
      ],
    }
    expect(stringify(ast)).toBe([
      '::page-container',
      '---',
      'simple-array:',
      '  - item1',
      '  - item2',
      '  - item3',
      '---',
      '::',
      '',
      '::page-container',
      '---',
      'items:',
      '  - name: Item 1',
      '    description: First item',
      '  - name: Item 2',
      '    description: Second item',
      '---',
      '::',
      '',
      '::page-container',
      '---',
      'attributes:',
      '  - domains:',
      '      - internal',
      '  - env:',
      '      - dev',
      '      - staging',
      '      - prod',
      '  - dogs:',
      '      - husky',
      '      - beagle',
      '---',
      '::',
      '',
    ].join('\n'))
  })

  it('should retuen valid nested markdown 1', () => {
    const ast: MinimarkTree = {
      type: 'minimark',
      value: [
        [
          'component',
          {},
          'hello ',
          [
            'world',
            {},
          ],
          ' ',
          [
            'universe',
            {
              ':data': [
                1,
                2,
                3,
              ],
            },
          ],
        ],
      ],
    }
    expect(stringify(ast)).toBe(`::component
hello :world :universe{:data="[1,2,3]"}
::
`)
  })

  it('should detect block components', () => {
    const ast: MinimarkTree = {
      type: 'minimark',
      value: [
        [
          'page-section',
          {},
          [
            'page-section',
            {},
            [
              'template',
              {
                name: 'tagline',
              },
              '{{ $doc.snippet.tagline }}',
            ],
            [
              'template',
              {
                name: 'title',
              },
              '{{ $doc.snippet.title }}',
            ],
            [
              'template',
              {
                name: 'description',
              },
              [
                'p',
                {},
                '{{ $doc.snippet.description }}',
              ],
              [
                'button',
                {
                  ':to': '$doc.snippet.link',
                  'appearance': 'primary',
                },
                'Button Text',
              ],
              [
                'button',
                {
                  ':to': '$doc.snippet.link',
                  'appearance': 'primary',
                },
                'Button Text',
              ],
              [
                'button',
                {
                  ':data-testid': '$doc.snippet.description',
                  'external': 'true',
                  ':to': '$doc.snippet.link',
                  'appearance': 'primary',
                },
                'Button Text',
              ],
            ],
          ],
        ],
      ],
    }
    expect(stringify(ast)).toBe(`::page-section
  :::page-section
  #tagline
  {{ $doc.snippet.tagline }}

  #title
  {{ $doc.snippet.title }}

  #description
  {{ $doc.snippet.description }}

    ::::button{:to="$doc.snippet.link" appearance="primary"}
    Button Text
    ::::

    ::::button{:to="$doc.snippet.link" appearance="primary"}
    Button Text
    ::::

    ::::button
    ---
    :data-testid: $doc.snippet.description
    external: true
    :to: $doc.snippet.link
    appearance: primary
    ---
    Button Text
    ::::
  :::
::
`)
  })
})
