import test from 'node:test'
import assert from 'node:assert'

import { p1, p2, sample, input } from './day04.js'

test('Day 04', (t) => {
  assert.strictEqual(p1(sample), 13)
  assert.strictEqual(p1(input), 28750)

  assert.strictEqual(p2(sample), 30)
  assert.strictEqual(p2(input), 10212704)
})
