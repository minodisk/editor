import * as s from 'hast-util-select'
import * as assert from 'power-assert'
import { Node } from 'unist'
import Ast, { HastNode } from './Ast'

const select = (selector: string, node: HastNode): HastNode =>
  s.select(selector, node as Node) as any

describe('Ast', () => {
  describe('find()', () => {
    ;[
      {
        name: 'should return position of the first element',
        html: `<p id="a" />`,
        target: '#a',
        expected: [0],
      },
      {
        name: 'should return position of the second element',
        html: `<p id="a" /><p id="b" />`,
        target: '#b',
        expected: [1],
      },
      {
        name: 'should return position of deep element',
        html: `<div><p id="a" /><p id="b" /></div>`,
        target: '#b',
        expected: [0, 1],
      },
    ].forEach(({ name, html, target, expected }) => {
      it(name, () => {
        const ast = new Ast(`<html><body>${html}</body></html>`)
        assert.deepEqual(ast.find(select(target, ast.root)), expected)
      })
    })
  })

  describe('blocksBetween()', () => {
    ;[
      {
        name: 'should return blocks',
        html: `<p id="a" /><p id="b" />`,
        start: '#a',
        end: '#b',
        expected: [[0], [1]],
      },
    ].forEach(({ name, html, start, end, expected }) => {
      it(name, () => {
        const ast = new Ast(`<html><body>${html}</body></html>`)
        assert.deepEqual(
          ast.blocksBetween(select(start, ast.root), select(end, ast.root)),
          expected.map(indexes => ast.nodeAt(indexes)),
        )
      })
    })
  })
})
