import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
import { emitter } from './service/eventEmitter.js'
import {
  getResolvedType,
  getMessageByType,
  getResolvedPath,
} from './helpers/index.js'

export function exec(args) {
  const { entryPath, days, type } = args
  const resolvedPath = getResolvedPath(entryPath)
  const { resolvedType, error } = getResolvedType(type)
  if (error) {
    console.log(error.message)
    return process.exit(0)
  }
  run(resolvedPath, days, resolvedType)
    .then(() => printToConsole(getMessageByType(resolvedType), true))
    .catch((error) =>
      printToConsole(`Something went wrong 😌 -> ${error}`, true),
    )
  process.on('exit', () => {
    if (emitter.getList().length <= 0) {
      console.log('Nothing to delete 🙄')
    }
  })
}
