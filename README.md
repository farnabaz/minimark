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


### `visit(tree, predicate, callback)`

- `tree`: The minimark tree to visit.
- `predicate`: A function that returns a boolean indicating whether the node should be visited.
- `callback`: A function that will be called with the node and its children.

```ts
import { visit } from 'minimark';

const ast = [
  type: 'minimal',
  value: [
    ['h2', { id: 'documentations' }, '🎨 Documentations'], // ...
  ],
];

visit(ast, (node) => node[0] === 'h2', (node) => {
  console.log(node);
});
```

### `textContent(node)`

- `node`: The AST node to get the text content of.

```ts
import { textContent } from 'minimark';
const ast = [
  type: 'minimal',
  value: [
    ['h2', { id: 'documentations' }, '🎨 Documentations'], // ...
  ],
];

console.log(textContent(ast.value[0])); // "🎨 Documentations"
```

### `toHast(tree)`

- `tree`: The Minimark tree to convert to hast.

```ts
import { toHast } from 'minimark/hast';

const ast = [
  type: 'minimal',
  value: [
    ['h2', { id: 'documentations' }, '🎨 Documentations'], // ...
  ],
];

const hast = toHast(ast);
console.log(hast);
```

### `fromHast(tree)`

- `tree`: The hast tree to convert to minimark.

```ts

const hast = {
  type: 'root',
  children: [
    { type: 'element', tag: 'h2', props: { id: 'documentations' }, children: [{ type: 'text', value: '🎨 Documentations' }] },
  ],
};

const minimark = fromHast(hast);
console.log(minimark);
```


## Contributing

Contributions are welcome! Please open issues and submit pull requests.

## License

MIT
