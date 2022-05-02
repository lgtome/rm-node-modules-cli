import path from 'path'
export function transformHomePath(entryPath) {
  return path.join(process.env.HOME, entryPath.slice(1))
}
