import { readFile } from './helpers.js'

const intersect = (a, b) => {
  const res = []

  for (const i of a) {
    if (b.includes(i)) res.push(i)
  }

  return res
}

export function p1(input) {
  const process = (line) => {
    const [, win, current] = line
      .split(/[:|]/)
      .map((s) => s.match(/(\d+)/g).map(Number))

    const n = intersect(win, current).length

    return n > 0 ? 2 ** (n - 1) : 0
  }

  return input
    .split('\n')
    .map((line) => process(line.trim()))
    .reduce((a, b) => a + b, 0)
}

export function p2(input) {
  const process = (m, line) => {
    const [[cardId], win, current] = line
      .split(/[:|]/)
      .map((s) => s.match(/(\d+)/g).map(Number))

    m.set(cardId, (m.get(cardId) ?? 0) + 1)

    const n = intersect(win, current).length
    const total = m.get(cardId)

    let i = cardId + 1
    while (i <= cardId + n) {
      const current = m.get(i) ?? 0

      m.set(i, current + total)
      i = i + 1
    }

    return m
  }

  const map = input
    .split('\n')
    .reduce((m, line) => process(m, line.trim()), new Map())

  return [...map.values()].reduce((a, b) => a + b, 0)
}

export const sample = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

export const input = readFile('./input/day04.txt')
