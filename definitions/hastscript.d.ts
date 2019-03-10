declare module 'hastscript' {
  import Unist from 'unist'

  type Child = Unist.Node | string

  function f(selector: string, ...children: Array<Child>): Unist.Node

  function f(
    selector: string,
    properties: { [key: string]: string },
    ...children: Array<Child>
  ): Unist.Node

  namespace f {}

  export = f
}
