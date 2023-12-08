import assert from 'node:assert/strict'

import { readFile } from './helpers.js'

function parseInstruction(ins) {
  return [...ins].map((c) => (c === 'L' ? 0 : 1))
}

assert.deepEqual(parseInstruction('LL'), [0, 0])
assert.deepEqual(parseInstruction('LLR'), [0, 0, 1])

function buildMap(lines) {
  const m = {}

  for (const line of lines) {
    const [dest, from, to] = line.match(/([0-9A-Z]+)/g)
    m[dest] = [from, to]
  }

  return m
}

assert.deepEqual(buildMap(['AAA = (BBB, CCC)']), { AAA: ['BBB', 'CCC'] })
assert.deepEqual(
  buildMap([
    'AAA = (BBB, CCC)',
    'BBB = (DDD, EEE)',
    'CCC = (ZZZ, GGG)',
    'DDD = (DDD, DDD)',
    'EEE = (EEE, EEE)',
    'GGG = (GGG, GGG)',
    'ZZZ = (ZZZ, ZZZ)',
  ]),
  {
    AAA: ['BBB', 'CCC'],
    BBB: ['DDD', 'EEE'],
    CCC: ['ZZZ', 'GGG'],
    DDD: ['DDD', 'DDD'],
    EEE: ['EEE', 'EEE'],
    GGG: ['GGG', 'GGG'],
    ZZZ: ['ZZZ', 'ZZZ'],
  }
)

function countSteps(instruction, map) {
  let step = 0
  let result = 'AAA'

  while (result !== 'ZZZ') {
    const currentStep = instruction[step % instruction.length]
    result = map[result][currentStep]
    step = step + 1
  }

  return step
}

export function p1(input) {
  const lines = input.split('\n')
  const instruction = parseInstruction(lines[0])
  const map = buildMap(lines.slice(2))

  return countSteps(instruction, map)
}

assert.deepEqual(
  p1(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`),
  2
)
assert.deepEqual(
  p1(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`),
  6
)

function allEndsWithZ(points) {
  for (const point of points) {
    if (point.at(-1) !== 'Z') return false
  }
  return true
}

function followSteps(instruction, map) {
  let step = 0
  let points = Object.keys(map)
    .filter((key) => key.endsWith('A'))
    .slice(0, 2)

  let allZ = false
  let logging = 0
  while (!allZ) {
    const currentStep = instruction[step % instruction.length]

    for (let i = 0; i < points.length; i++) {
      const key = points[i]
      const newVal = map[key][currentStep]
      if (i === 0) {
        if (logging < 2) console.log(newVal)

        if (newVal.at(-1) === 'Z') {
          console.log('---')
          logging++
        }
      }

      points[i] = newVal
    }

    allZ = allEndsWithZ(points)
    step = step + 1
  }

  return step
}

export function p2(input) {
  const lines = input.split('\n')
  const instruction = parseInstruction(lines[0])
  const map = buildMap(lines.slice(2))

  return followSteps(instruction, map)
}

assert.deepEqual(
  p2(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`),
  6
)

const input = readFile('./input/day08.txt')
console.log(p2(input))
