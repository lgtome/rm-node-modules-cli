import path from 'path'
import fs from 'fs'
import {
  compareDays,
  getPathToDeleteModule,
  checkIsProject,
  deleteModules,
} from '../helpers/index.js'
import { printToConsole, findModulesAndProjectTime } from '../utils/index.js'

const { promises } = fs

export async function run(entryPath, day = 14, type = 'check') {
  if (!entryPath || !typeof day === 'number' || !type)
    return Error('Arguments not provided!')

  const projects = await promises.readdir(entryPath)
  const isProjectDir = projects.filter((proj) => checkIsProject(proj)).length
  projects.forEach((proj) => {
    const currentPath = path.join(entryPath, proj)
    const isDir = fs.lstatSync(currentPath).isDirectory()
    if (isDir && !isProjectDir && !currentPath.includes('.')) {
      run(currentPath, day, type)
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
    printToConsole(`Folder to delete 🍢 - ${pathToModules}`, pathToModules)

    if (type !== 'check') {
      const resultToPrint = deleteModules(pathToModules)
      printToConsole(resultToPrint)
    }
  }
}
