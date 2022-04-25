#!/usr/bin/env/ node

import spawn from 'cross-spawn'

function run() {
  const argvS = process.argv.slice(2)
  const args = getArgs(argvS)
  if (args.check) {
    doSpawn(args, 'check')
  } else {
    doSpawn(args)
  }
}

run()

function doSpawn(args, type = 'execute') {
  spawn.sync(
    'npm',
    ['run', type],
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
    if (arg.includes('--')) {
      return { ...acc, ...constructFromArgs(arg) }
    }
    acc[arg] = arg
    return acc
  }, {})
}

function constructFromArgs(path, separator = '=', prefix = '--') {
  const prefixLength = prefix.length
  const separatorIndex = path.indexOf('=')
  if (!~separatorIndex) return {}
  const resultPath = path.slice(prefixLength).split(separator)
  const resultObject = Object.fromEntries([resultPath])
  if (resultObject.path) {
    return { entryPath: resultObject.path }
  }

  return resultObject
}
