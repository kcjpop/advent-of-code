import { readFile, zip } from './helpers.js'

const sample = `Time:      7  15   30
Distance:  9  40  200`

const input = readFile('./input/day06.txt')

function parseToRaces(input) {
  const [time, distance] = input
    .trim()
    .split('\n')
    .map((s) => s.match(/\d+/g).map((n) => Number(n)))

  return zip(time, distance)
}

function processRace([time, record]) {
  let count = 0
  let hold = 1

  while (hold < time) {
    const speed = hold
    const remaining = time - hold
    const distance = speed * remaining

    if (distance > record) count = count + 1

    hold = hold + 1
  }

  return count
}

export function p1(input) {
  const races = parseToRaces(input)

  return races.map(processRace).reduce((acc, s) => acc * s, 1)
}

export function p2(input) {
  const [time, record] = input
    .replace(/\s+/g, '')
    .match(/\d+/g)
    .map((s) => Number(s))

  return processRace([time, record])
}

console.log(p2(input))
