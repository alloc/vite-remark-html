import type { Plugin } from 'vite'
import unified from 'unified'
import markdownParser from 'remark-parse'
import htmlGenerator from 'remark-html'
import { createFilter, FilterPattern } from '@rollup/pluginutils'

type HtmlOptions = typeof htmlGenerator extends unified.Plugin<infer P>
  ? Exclude<P[0], void>
  : never

export type Options = HtmlOptions & {
  include?: FilterPattern
  exclude?: FilterPattern
}

export type RemarkHtml = Plugin & {
  /** Add one or more Remark plugins to the processing pipeline. */
  use<S extends any[] = [unified.Settings?]>(
    plugin: unified.Plugin<S>,
    ...settings: S
  ): RemarkHtml
  use<S extends any[] = [unified.Settings?]>(
    preset: unified.Preset<S>
  ): RemarkHtml
  use<S extends any[] = [unified.Settings?]>(
    pluginTuple: unified.PluginTuple<S>
  ): RemarkHtml
  use(list: unified.PluggableList): RemarkHtml
  use(processorSettings: unified.ProcessorSettings): RemarkHtml
}

export default ({ include, exclude, ...opts }: Options = {}): RemarkHtml => {
  let filter: (id: unknown) => boolean
  let processor: unified.Processor
  let plugins: unified.Pluggable[] = []

  return {
    name: 'vite-remark-html',
    configResolved(config) {
      filter = createFilter(include, exclude, {
        resolve: config.root,
      })
      processor = unified()
        .use(markdownParser)
        .use(plugins)
        .use(htmlGenerator, opts)
    },
    async transform(code, id) {
      if (id.endsWith('.md') && filter(id)) {
        const result = await processor.process(code)
        return `export default ` + JSON.stringify(result.toString('utf8'))
      }
    },
    use(pluggable: any) {
      plugins.push(pluggable)
      return this
    },
  }
}
