import { bytesToMb } from './bytesToMb.js'
import { getFilesStat } from './getFilesStat.js'

export async function getDirSize(path) {
  const files = await getFilesStat(path)
  const finalSize = files.reduce((acc, { size }) => acc + size, 0)
  return bytesToMb(finalSize)
}
