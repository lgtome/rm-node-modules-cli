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
  if (!entryPath || typeof day !== 'number' || !type) {
    return new Error('Arguments not provided!')
  }
  try {
    const projects = await promises.readdir(entryPath)
    const isProjectDir = projects.filter((proj) => checkIsProject(proj)).length

    projects.forEach(async (proj) => {
      const currentPath = path.join(entryPath, proj)
      const isDir = await fs.promises
        .lstat(currentPath)
        .then((data) => data.isDirectory())
        .catch((e) => {})

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
        emitter.subscribe('projects', entryPath)
        emitter.subscribe('info', { path: pathToModules, listOfDays: days })
        printToConsole(`Folder to delete 🍢 - ${pathToModules}`, true)
      }
      if (type !== 'check' && pathToModules) {
        const resultToPrint = deleteModules(pathToModules)
        printToConsole(resultToPrint)
      }
    }
  } catch (e) {
    const error = e.message ? e.message : e
    emitter.subscribe('errors', error)
  }
  return false
}
