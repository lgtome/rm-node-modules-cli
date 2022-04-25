import path from 'path'
export function getResolvedPath(entryPath) {
  if (!entryPath) {
    console.log('Path not provided!')
    return process.exit(0)
  }
  return path.resolve(entryPath)
}
