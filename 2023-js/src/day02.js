import { readInput } from './helpers.js'

const s = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const ss = readInput('day02.txt')

const v = ss
  .trim()
  .split('\n')
  .map((line) => {
    const [game, settings] = line.split(':')

    const [, id] = game.match(/Game (\d+)/)
    const r2 = settings
      .split(';')
      .flatMap((str) => {
        const xs = str.split(/[;]/).flatMap((s) => {
          const pairs = s
            .trim()
            .split(', ')
            .map((s) => {
              const [val, key] = s.split(' ')
              return [key, Number(val)]
            })
          return Object.fromEntries(pairs)
        })
        return xs
      })
      .some((s) => s.red > 12 || s.green > 13 || s.blue > 14)
    return { id: Number(id), possible: !r2 }
  })
  .filter((g) => g.possible)
  .reduce((a, b) => a + b.id, 0)

console.log(v)

const vv = ss
  .trim()
  .split('\n')
  .map((line) => {
    const [game, settings] = line.split(':')

    const [, id] = game.match(/Game (\d+)/)
    const r2 = settings
      .split(';')
      .flatMap((str) => {
        const xs = str.split(/[;]/).flatMap((s) => {
          const pairs = s
            .trim()
            .split(', ')
            .map((s) => {
              const [val, key] = s.split(' ')
              return [key, Number(val)]
            })
          return Object.fromEntries(pairs)
        })
        return xs
      })
      .reduce((acc, s) => {
        acc.red = Math.max(s.red ?? 1, acc.red ?? 1)
        acc.blue = Math.max(s.blue ?? 1, acc.blue ?? 1)
        acc.green = Math.max(s.green ?? 1, acc.green ?? 1)
        return acc
      }, {})

    return r2.red * r2.blue * r2.green
  })
  .reduce((a, b) => a + b, 0)

console.log(vv)
