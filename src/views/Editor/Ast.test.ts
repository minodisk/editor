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
        assert.deepEqual(ast.indexesOf(select(target, ast.root)), expected)
      })
    })
  })

  describe('getBetween()', () => {
    ;[
      {
        name: 'should return blocks',
        html: `<p id="a" /><p id="b" /><p id="c" />`,
        start: '#a',
        end: '#a',
        expected: [[0]],
      },
      {
        name: 'should return blocks',
        html: `<p id="a" /><p id="b" /><p id="c" />`,
        start: '#a',
        end: '#b',
        expected: [[0], [1]],
      },
      {
        name: 'should return blocks',
        html: `<p id="a" /><p id="b" /><p id="c" />`,
        start: '#a',
        end: '#c',
        expected: [[0], [1], [2]],
      },
      {
        name: 'should return deep nodes',
        html: `<p><span /><a><span id="a" /></a></p><p id="b" /><p><a><span id="c" /></a></p>`,
        start: '#a',
        end: '#c',
        expected: [[0], [1], [2]],
      },
    ].forEach(({ name, html, start, end, expected }) => {
      it(name, () => {
        const ast = new Ast(`<html><body>${html}</body></html>`)
        const actual = ast.getBetween(
          select(start, ast.root),
          select(end, ast.root),
        )
        assert.deepEqual(actual.map(ast.indexesOf), expected)
      })
    })
  })
})
