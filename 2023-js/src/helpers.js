import fs from 'node:fs'

/**
 * Read and remove whitespaces in both ends of a file
 */
export function readFile(filePath) {
  const path = new URL(filePath, import.meta.url)

  return fs.readFileSync(path, 'utf-8').trim()
}

/**
 * Combine items of the same index of two arrays into one array.
 * Example: `zip([1, 2], [3, 4]) = [[1, 3], [2, 4]]`
 */
export function zip(a, b) {
  const res = []

  for (const i in a) {
    res.push([a[i], b[i]])
  }

  return res
}

export function for2d(board, fn) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      fn(board[i][j], i, j)
    }
  }
}
