import * as rehypeParse from 'rehype-parse'
import * as rehypeStringify from 'rehype-stringify'
// import * as rehypeToReact from 'rehype-react'
import * as unified from 'unified'
import { Node } from 'unist'

export const toAst: (html: string) => HastNode = unified().use(rehypeParse)
  .parse as any
export const toHtml: (node: HastNode) => string = unified().use(rehypeStringify)
  .stringify
// const toReact: (node: HastNode) => React.ReactElement = unified().use(
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
  private node!: HastNode
  private count = 0

  constructor(html?: string) {
    if (!html) {
      return
    }
    this.update(html)
  }

  public update(html: string): void {
    const root = toAst(html)
    // this.node = this.addMark(root.children[0].children[1]) // root.html.body
    this.node = root.children[0].children[1] // root.html.body
  }

  public toHtml(): string {
    return this.node.children
      .map(node => {
        return toHtml(node)
      })
      .join('')
  }

  private addMark = (node: HastNode): HastNode => {
    if (node.type === 'element' && node.properties.id == null) {
      console.log(this.count)
      node.properties.id = `${this.count}`
      this.count = this.count + 1
    }
    if (node.children != null) {
      node.children.forEach(this.addMark)
    }
    return node
  }
}
