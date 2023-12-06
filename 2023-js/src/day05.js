import peggy from 'peggy'

import { readFile } from './helpers.js'

function makeMap({ lines }) {
  return lines.map(([dest, src, step]) => ({
    range: [src, src + step - 1],
    start: dest,
  }))
}

function doMapping(id, mapping) {
  const range = mapping.find((m) => {
    const [min, max] = m.range
    return min <= id && id <= max
  })

  if (range !== undefined) {
    const diff = id - range.range[0]
    return range.start + diff
  }

  return id
}

function toLocation(id, maps) {
  let start = id
  for (const map of maps) {
    start = doMapping(start, map)
  }

  return start
}

const peg = readFile('./day05.peggy')
const parser = peggy.generate(peg)

export function p1(input) {
  const [[, seeds], mapSources] = parser.parse(input)

  const maps = mapSources.map(makeMap)
  const res = seeds.map((seed) => toLocation(seed, maps))

  return Math.min(...res)
}

export const sample = readFile('./input/day05.sample.txt')
export const input = readFile('./input/day05.txt')
