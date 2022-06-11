import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
import { emitter } from './service/eventEmitter.js'
import {
  getResolvedType,
  getMessageByType,
  getResolvedPath,
  isVerbose,
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
    if (isVerbose(args)) {
      printToConsole(emitter.getInformationOfProjects(), true)
    }
    if (!emitter.getListOfProjects()) {
      console.log('Nothing to delete 🙄')
    }
  })
}
