#!/usr/bin/env node

import spawn from 'cross-spawn'

function run() {
  const argvS = process.argv.slice(2)
  const args = getArgs(argvS)
  console.log(args)
  doSpawn(args)
}

run()

function doSpawn(args) {
  spawn.sync(
    'npm',
    ['run', 'execute'],
    {
      encoding: 'utf8',
      stdio: 'inherit',
      env: { ...process.env, ...args },
    },
    { test: 1 },
  )
}

function getArgs(arr) {
  return arr.reduce((acc, arg) => {
    // if (arg.includes('--')) {

    // }
    // acc[arg] = arg
    return { ...acc, ...constructFromArgs(arg) }
    // return acc
  }, {})
}

function constructFromArgs(path, separator = '=', prefix = '--') {
  const prefixLength = prefix.length
  const separatorIndex = path.indexOf('=')
  if (!~separatorIndex) return { type: path }
  const resultPath = path.slice(prefixLength).split(separator)
  const resultObject = Object.fromEntries([resultPath])
  if (resultObject.path) {
    return { entryPath: resultObject.path }
  }
  return resultObject
}
