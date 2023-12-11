import assert from 'node:assert/strict'

import { for2d, readFile } from './helpers.js'

const input = readFile('./input/day11.txt')

const sample = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

function parse(raw) {
  return raw.split('\n').map((s) => [...s])
}

function print(board, join = '') {
  return board.map((r) => r.join(join)).join('\n')
}

function transpose(board) {
  const rows = board.length
  const columns = board[0].length
  const res = []

  for (let j = 0; j < columns; j++) {
    res[j] = Array.from({ length: rows }, (_, i) => board[i][j])
  }

  return res
}

assert.deepEqual(
  transpose([
    [1, 2],
    [3, 4],
  ]),
  [
    [1, 3],
    [2, 4],
  ]
)

function expandEmpty(board, size) {
  return board.flatMap((row) => {
    if (!row.includes('#')) return Array.from({ length: size }, () => row)
    return [row]
  })
}

function expand(board, size = 2) {
  // Expand empty columns
  const columnExpanded = expandEmpty(transpose(board), size)

  // Expand empty rows
  return expandEmpty(transpose(columnExpanded), size)
}

assert.equal(
  print(expand(parse(sample))),
  `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`
)

function findGalaxy(board) {
  const res = []

  for2d(board, (val, row, col) => {
    if (val === '#') res.push([row, col])
  })

  return res
}

function visit(board, start) {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  const n = board.length
  const m = board[0].length

  const dist = Array.from({ length: n }, () => Array(m).fill(-1))

  const queue = [start]

  while (queue.length > 0) {
    const [px, py] = queue.shift()

    for (const [x, y] of dirs) {
      const a = px + x
      const b = py + y

      if (a >= 0 && b >= 0 && a < n && b < m && dist[a][b] === -1) {
        dist[a][b] = 1 + dist[px][py]
        queue.push([a, b])
      }
    }
  }

  return dist
}

function sumShortest(board) {
  const galaxies = findGalaxy(board)
  const n = galaxies.length

  let res = 0

  for (let i = 0; i < n; i++) {
    const galaxy = galaxies[i]
    const paths = visit(board, galaxy)

    for (let j = i + 1; j < n; j++) {
      const other = galaxies[j]
      const [x, y] = other
      res = res + paths[x][y] + 1
    }
  }

  return res
}

function p1(raw) {
  const board = parse(raw)
  const expanded = expand(board)

  return sumShortest(expanded)
}

assert.equal(p1(sample), 374)

function p2(raw) {
  // @TODO
}

console.log(p2(sample))
