import fs from 'node:fs'

export function readFile(filePath) {
  const path = new URL(filePath, import.meta.url)
  return fs.readFileSync(path, 'utf-8')
}
