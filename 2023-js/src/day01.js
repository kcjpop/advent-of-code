import { readInput } from './helpers.js'

const s = readInput('day01.txt')

{
  const map = new Map([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
  ])

  const regex = /(one|two|three|four|five|six|seven|eight|nine)/

  const findFromEnd = (s) => {
    let i = -1
    const n = s.length

    const isDigit = (s) => {
      const hasDigit = s.match(/\d/)
      if (hasDigit !== null) return hasDigit[0]

      const hasWord = s.match(regex)
      if (hasWord !== null) {
        return map.get(hasWord[1])
      }

      return false
    }

    while (i >= -n) {
      const char = isDigit(s.slice(i))
      if (char !== false) return char
      i = i - 1
    }
  }

  const findFromStart = (line) => {
    const translated = line.replace(regex, (_, x) => map.get(x))
    const chars = translated.match(/\d/)
    return chars.at(0)
  }

  const v = s
    .trim()
    .split('\n')
    .map((line) => {
      const code = findFromStart(line) + findFromEnd(line)
      return parseInt(code, 10)
    })
    .reduce((a, b) => a + b, 0)

  console.log(v)
}
