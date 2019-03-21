import * as h from 'hastscript'
import * as assert from 'power-assert'
import { text as t } from './hastscript-util'

describe('Ast', () => {
  describe('blocksBetween()', () => {
    ;[
      {
        name: 'should return blocks',
        body: h('body', h('p', t('')), h('p', t(''))),
        start: [0, 1],
        end: [1, 1],
        expected: [[0], [1]],
      },
    ].forEach(({ name, body, start, end, expected }) => {
      it(name, () => {
        const ast = new Ast(body)
        assert.deepEqual(
          ast.blocksBetween(ast.find(start), ast.find(end)),
          expected.map(indexes => ast.find(indexes)),
        )
      })
    })
  })
})
