# vite-remark-html

[![npm](https://img.shields.io/npm/v/vite-remark-html.svg)](https://www.npmjs.com/package/vite-remark-html)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

> Process markdown with [remark-html](https://www.npmjs.com/package/remark-html)

Basically, when you import a `.md` file, you'll get back a JS module with an HTML string as its default export. There are various options to customize the HTML output.

&nbsp;

## Usage

```ts
import remarkHtml from 'vite-remark-html'

export default {
  plugins: [remarkHtml()],
}
```

### Filter options

Markdown files can be filtered, in case you only want a subset to be processed by this plugin. For more details, see [here](https://github.com/rollup/plugins/tree/master/packages/pluginutils#include-and-exclude).

```
remarkHtml({
  exclude: /\/node_modules\//
})
```

### HTML options

All options listed [here](https://github.com/syntax-tree/hast-util-to-html/tree/7.1.3#tohtmltree-options) are also supported.

```
remarkHtml({
  allowDangerousHtml: true
})
```

### Using the HTML

In your client code, you can use `import` or dynamic `import()` to load the HTML string.

```ts
import html from './test.md'
// or
const htmlPromise = import('./test.md').then(module => module.default)
```

Then you can use that as the `innerHTML` of another element.

```tsx
document.getElementById('markdown').innerHTML = html
// or
<div dangerouslySetInnerHtml={{ __html: html }} />
```

[Try the demo](./demo) to see it in action.
