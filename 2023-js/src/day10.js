import assert from 'node:assert/strict'

import { readFile } from './helpers.js'

const input = readFile('./input/day10.txt')

const sample = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`

const Right = 0
const Left = 1
const Down = 2
const Up = 3

function parse(raw) {
  let start = null

  const graph = raw.split('\n').map((s, index) => {
    const chars = [...s]
    const sIndex = chars.indexOf('S')
    if (start === null && sIndex !== -1) start = [index, sIndex]

    return chars
  })

  return { graph, start }
}

function visit(graph, start, startDir) {
  const dirs = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ]

  let counter = 0
  let dir = startDir
  const queue = [start]

  while (queue.length > 0) {
    const [i, j] = queue.shift()
    const char = graph[i][j]

    if (!char || char === '.' || (char === 'S' && counter > 0)) {
      return counter
    }

    let nextDir = dir

    const goingRight = dir === Right
    const goingLeft = dir === Left
    const goingDown = dir === Down
    const goingUp = dir === Up

    // Go down or left
    if (char === '7') {
      if (goingRight) nextDir = Down
      if (goingUp) nextDir = Left
    }

    // Go left or up
    if (char === 'J') {
      if (goingRight) nextDir = Up
      if (goingDown) nextDir = Left
    }

    // Go up or right
    if (char === 'L') {
      if (goingDown) nextDir = Right
      if (goingLeft) nextDir = Up
    }

    // Go down or right
    if (char === 'F') {
      if (goingUp) nextDir = Right
      if (goingLeft) nextDir = Down
    }

    const [px, py] = dirs[nextDir]
    const nextNode = [i + px, j + py]

    dir = nextDir
    counter = counter + 1
    queue.push(nextNode)
  }

  return counter
}

function p1(raw) {
  const { graph, start } = parse(raw)
  const [i, j] = start

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  const res = []

  for (const dir in dirs) {
    const [x, y] = dirs[dir]
    const px = i + x
    const py = j + y

    if (px >= 0 && py >= 0) res.push(visit(graph, [px, py], Number(dir)))
  }

  return (Math.max(...res) + 1) / 2
}

assert.equal(p1(sample), 8)
