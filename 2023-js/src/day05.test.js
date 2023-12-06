import test from 'node:test'
import assert from 'node:assert'

import { p1, sample } from './day05.js'

test('Day 05', (t) => {
  assert.strictEqual(p1(sample), 35)
})
