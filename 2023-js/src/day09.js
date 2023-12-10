import assert from 'node:assert/strict'

import { readFile } from './helpers.js'

function parseLines(input) {
  return input.split('\n').map((line) => line.match(/([-0-9]+)/g).map(Number))
}

function generateDifferences(xs) {
  const res = [xs]

  let allZero = false
  while (!allZero) {
    const ns = res.at(-1)
    let maybeAllZero = true

    const acc = []
    for (let i = 0; i < ns.length; i++) {
      if (ns[i + 1] !== undefined) {
        const diff = ns[i + 1] - ns[i]

        if (diff !== 0) maybeAllZero = false

        acc.push(diff)
      }
    }

    allZero = maybeAllZero
    res.push(acc)
  }

  return res
}

function findEnd(history) {
  let val = 0
  let i = history.length - 2

  while (i >= 0) {
    const last = history[i].at(-1)
    val = val + last
    i = i - 1
  }

  return val
}

function findStart(history) {
  let val = 0
  let i = history.length - 2

  while (i >= 0) {
    const start = history[i].at(0)
    val = start - val
    i = i - 1
  }

  return val
}

export function p1(input) {
  const lines = parseLines(input)

  return lines
    .map((line) => findEnd(generateDifferences(line)))
    .reduce((a, b) => a + b, 0)
}

export function p2(input) {
  const lines = parseLines(input)

  return lines
    .map((line) => findStart(generateDifferences(line)))
    .reduce((a, b) => a + b, 0)
}

const sample = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

assert.strictEqual(p1(sample), 114)
assert.strictEqual(p2(sample), 2)

const input = readFile('./input/day09.txt')
