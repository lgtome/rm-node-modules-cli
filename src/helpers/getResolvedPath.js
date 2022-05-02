import path from 'path'
import { transformHomePath } from './transformHomePath.js'
export function getResolvedPath(entryPath) {
  if (!entryPath) {
    console.log('Path not provided!')
    return process.exit(0)
  }
  if (entryPath.startsWith('~')) {
    return transformHomePath(entryPath)
  }
  return path.resolve(entryPath)
}
