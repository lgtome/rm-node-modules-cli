import path from 'path'
import fs from 'fs'
import {
  compareDays,
  getPathToDeleteModule,
  checkIsProject,
  deleteModules,
} from '../helpers/index.js'
import { emitter } from './eventEmitter.js'
import { printToConsole, findModulesAndProjectTime } from '../utils/index.js'

const { promises } = fs

export async function run(entryPath, day = 14, type = 'check') {
  if (!entryPath || !typeof day === 'number' || !type)
    return Error('Arguments not provided!')
  let obs = false
  const projects = await promises.readdir(entryPath)
  const isProjectDir = projects.filter((proj) => checkIsProject(proj)).length
  projects.forEach(async (proj) => {
    const currentPath = path.join(entryPath, proj)
    const isDir = fs.lstatSync(currentPath).isDirectory()
    if (isDir && !isProjectDir && !currentPath.includes('.')) {
      await run(currentPath, day, type)
    }
  })

  if (isProjectDir) {
    const files = await promises.readdir(entryPath)
    const result = findModulesAndProjectTime(files, entryPath)
    const { isModulesFounded, days } = result
    const isDeleteNeeded = compareDays(days, day)
    const pathToModules = getPathToDeleteModule(
      isDeleteNeeded,
      isModulesFounded,
      entryPath,
    )
    if (isModulesFounded && isDeleteNeeded) {
      emitter.subscribe(true)
      printToConsole(`Folder to delete 🍢 - ${pathToModules}`, true)
    }
    if (type !== 'check' && pathToModules) {
      const resultToPrint = deleteModules(pathToModules)
      printToConsole(resultToPrint)
    }
  }
  return false
}
