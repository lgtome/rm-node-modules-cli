import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
import { emitter } from './service/eventEmitter.js'
import {
  getResolvedType,
  getMessageByType,
  getResolvedPath,
  isVerbose,
  getNumFromString,
} from './helpers/index.js'

export function exec(args) {
  const { entryPath, days = 14, type } = args
  const resolvedPath = getResolvedPath(entryPath)
  const { resolvedType, error } = getResolvedType(type)
  if (error) {
    console.log(error.message)
    return process.exit(0)
  }
  run(resolvedPath, +days, resolvedType)
    .then(() => printToConsole(getMessageByType(resolvedType), true))
    .catch((e) => printToConsole(`Something went wrong 😌 -> ${e}`, true))
  process.on('exit', () => {
    if (!emitter.getListOfProjects()) {
      return console.log('Nothing to delete 🙄')
    }
    if (isVerbose(args)) {
      const projectsInfos = emitter.getInformationOfProjects()
      projectsInfos.forEach((projectInfo) =>
        printToConsole(`\n ${JSON.stringify(projectInfo, null, 2)} \n`, true),
      )
    }
    const projectsInfos = emitter.getInformationOfProjects()
    const sizeToDelete = projectsInfos.reduce(
      (acc, { size }) => acc + getNumFromString(size),
      0,
    )
    printToConsole(`\n Will be deleted: ${sizeToDelete} mb \n`, true)
  })
}
