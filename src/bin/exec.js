#!/usr/bin/env node

import { exec } from '../run.js'
function run() {
  const argvS = process.argv.slice(2)
  const args = getArgs(argvS)
  exec(args)
}

run()

function getArgs(arr) {
  return arr.reduce((acc, arg) => {
    return { ...acc, ...constructFromArgs(arg) }
  }, {})
}

function constructFromArgs(path, separator = '=', prefix = '--') {
  const prefixLength = prefix.length
  const separatorIndex = path.indexOf('=')
  if (!~separatorIndex && !path.includes(prefix)) return { type: path }
  const resultPath = path.slice(prefixLength).split(separator)
  if (resultPath.length === 1) {
    resultPath.push(true)
  }
  const resultObject = Object.fromEntries([resultPath])
  if (resultObject.path) {
    return { entryPath: resultObject.path }
  }
  return resultObject
}
