# minimark

A utility for converting Abstract Syntax Trees (AST) into string representations.

## Features

- Converts AST nodes to readable strings
- Supports various AST formats
- Easy to use and extend

## Installation

```bash
npm install minimark
# or
yarn add minimark
```

## Usage

```js
import { stringify } from 'minimark';

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
