import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
const { entryPath, days, type } = process.env

const executeType = type === 'execute' ? 'execute' : 'check'

run(entryPath, days, executeType)
  .then(() => printToConsole('Thanks for usage. ✨'))
  .catch((error) => printToConsole('Something went wrong 😌', ' -> ', error))
