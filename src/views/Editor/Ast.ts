import * as rehypeParse from 'rehype-parse'
import * as rehypeStringify from 'rehype-stringify'
// import * as rehypeToReact from 'rehype-react'
import * as unified from 'unified'
import { Node } from 'unist'

export const toAst: (html: string) => HastNode = unified().use(rehypeParse)
  .parse as any
export const toHtml: (node: HastNode) => string = unified().use(rehypeStringify)
  .stringify
// const toReact: (root: HastNode) => React.ReactElement = unified().use(
//   rehypeToReact,
//   {
//     createElement: React.createElement,
//   },
// ).stringify as any

export interface HastNode extends Node {
  tagName: string
  properties: { [key: string]: string }
  children: Array<HastNode>
}

export default class Ast {
  public root!: HastNode
  // private count = 0

  constructor(html?: string) {
    if (!html) {
      return
    }
    this.update(html)
  }

  public update(html: string): void {
    const root = toAst(html)
    this.root = root.children[0].children[1] // root.html.body
  }

  public toHtml(): string {
    return this.root.children
      .map(node => {
        return toHtml(node)
      })
      .join('')
  }

  public find(indexes: Array<number>): HastNode {
    return this.downstream(this.root, indexes)
  }

  private downstream(node: HastNode, indexes: Array<number>): HastNode {
    const index = indexes.shift()
    if (index === undefined) {
      return node
    }
    return this.downstream(node.children[index], indexes)
  }

  // private addMark = (root: HastNode): HastNode => {
  //   if (root.type === 'element' && root.properties.id == null) {
  //     console.log(this.count)
  //     root.properties.id = `${this.count}`
  //     this.count = this.count + 1
  //   }
  //   if (root.children != null) {
  //     root.children.forEach(this.addMark)
  //   }
  //   return root
  // }
}
