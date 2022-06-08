import path from 'path'
import { transformHomePath } from './transformHomePath.js'
export function getResolvedPath(entryPath) {
  if (!entryPath) {
    return path.resolve(process.cwd())
  }
  if (entryPath.startsWith('~')) {
    return transformHomePath(entryPath)
  }
  return path.resolve(entryPath)
}
