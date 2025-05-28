# minimark

MiniMark is a minimal representation of Abstract Syntax Trees (AST) for Markdown.

Minimark takes advantage of JSON array format to reduce the size of the AST.

The difference between a normal AST and a minimark AST is visible in the example below. 
A normal AST is like this:
```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 2,
      "children": [
        {
          "type": "text",
          "value": "Documentations"
        }
      ]
    }
  ]
}
```

But with minimark, it's like this:
```json
{
  "type": "minimark",
  "value": [
    ["h2", {}, "Documentations"]
  ]
}
```

## Installation

```bash
npm install minimark
# or
pnpm add minimark
# or
yarn add minimark
```

## Usage

```js
import { stringify } from 'minimark/stringify';

const ast = [
  type: 'minimal',
  value: [
    ['h2', { id: 'documentations' }, '🎨 Documentations'],
    ['ul', {}, [
      ['li', {}, ['a', { href: '/nuxt/getting-started' }, 'Nuxt v3']],
      ['li', {}, ['a', { href: '/content/getting-started' }, 'Nuxt Content v3']],
    ]],
  ],
];

console.log(stringify(ast));
// Output:
// # Documentations
//
// - [Nuxt v3](https://nuxt.com/docs/getting-started)
// - [Nuxt Content v3](https://content.nuxtjs.org/getting-started)
```

## API

### `stringify(node, options?)`

- `node`: The AST node to stringify.
- `options`: (Optional) Configuration options.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT
