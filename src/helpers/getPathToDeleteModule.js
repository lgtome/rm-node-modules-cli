import path from 'path'
export function getPathToDeleteModule(timeToDelete, isExist, projectPath) {
  if (!isExist || !timeToDelete) return false
  const pathToModules = path.resolve(projectPath, 'node_modules')
  return pathToModules
}
