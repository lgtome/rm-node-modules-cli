import path from 'path'
import { run } from './service/index.js'
import { printToConsole } from './utils/print.js'
import {
  getResolvedType,
  getMessageByType,
  getResolvedPath,
} from './helpers/index.js'
const { entryPath, days, type } = process.env

const resolvedPath = getResolvedPath(entryPath)
const { resolvedType, error } = getResolvedType(type)

if (error) {
  console.log(error.message)
  process.exit(0)
}

run(resolvedPath, days, resolvedType)
  .then(() => printToConsole(getMessageByType(resolvedType)))
  .catch((error) => printToConsole('Something went wrong 😌', ' -> ', error))
