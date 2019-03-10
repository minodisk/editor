declare module 'hast-util-to-html' {
  import Unist from 'unist'

  function toHTML(node: Unist.Node): string

  namespace toHTML {}

  export = toHTML
}
