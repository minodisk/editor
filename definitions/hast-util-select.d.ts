declare module 'hast-util-select' {
  import Unist from 'unist'

  export function matches(selector: string, node: Unist.Node): boolean;
  export function select(selector: string, tree: Unist.Node): Unist.Node;
}
