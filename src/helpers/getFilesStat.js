import { promises } from 'fs'
import { resolve } from 'path'
export async function getFilesStat(path) {
  const dir = await promises.readdir(path)
  const files = await Promise.all(
    dir.map(async (el) => {
      const stat = await promises.lstat(resolve(path, el))
      if (stat.isDirectory()) {
        return getFilesStat(resolve(path, el))
      }
      return stat
    }),
  )

  return files.flatMap((file) => file)
}
