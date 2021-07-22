import type { Plugin } from 'vite'
import unified, { Plugin as UnifiedPlugin } from 'unified'
import markdownParser from 'remark-parse'
import htmlGenerator from 'remark-html'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

type HtmlOptions = typeof htmlGenerator extends UnifiedPlugin<infer P>
  ? Exclude<P[0], void>
  : never

export type Options = HtmlOptions & {
  include?: FilterPattern
  exclude?: FilterPattern
}

export default ({ include, exclude, ...opts }: Options = {}): Plugin => {
  let filter: (id: unknown) => boolean

  const processor = unified().use(markdownParser).use(htmlGenerator, opts)

  return {
    name: 'vite-remark-html',
    configResolved(config) {
      filter = createFilter(include, exclude, {
        resolve: config.root,
      })
    },
    async transform(code, id) {
      if (id.endsWith('.md') && filter(id)) {
        const result = await processor.process(code)
        return `export default ` + JSON.stringify(result.toString('utf8'))
      }
    },
  }
}
