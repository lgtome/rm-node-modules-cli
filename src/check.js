import path from 'path'
import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
const { entryPath, days } = process.env
const type = 'check'
const resolvedPath = path.resolve(entryPath)

run(resolvedPath, days, type)
  .then(() =>
    printToConsole(
      'Thanks for usage, you can use `run` command for deleting files',
    ),
  )
  .catch((error) => printToConsole('Something went wrong 😌', ' -> ', error))
