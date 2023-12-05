import fs from 'node:fs'

export function readInput(filename) {
  const path = new URL(`./input/${filename}`, import.meta.url)
  return fs.readFileSync(path, 'utf-8')
}
