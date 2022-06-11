import test from 'ava'
import sinon from 'sinon'
import {
  compareDays,
  getResolvedPath,
  getResolvedType,
  transformHomePath,
  getMessageByType,
  isVerbose,
  bytesToMb,
  getNumFromString,
  getFilesStat,
  getDirSize,
} from '../src/helpers/index.js'
import { emitter } from '../src/service/eventEmitter.js'

test('Compare days should return false if a days incompatible', (t) => {
  const res = compareDays(null, 1)
  t.false(res)
})

test('Get resolved path should not return a path if entry path not provided', async (t) => {
  const res = getResolvedPath(null)

  t.deepEqual(res, process.cwd())
})
test('Get resolved path should return a path if entry path provided', (t) => {
  const res = getResolvedPath('.')

  t.truthy(res)
})
test('Get resolved path should returns home directory if entry path is ~', (t) => {
  const res = getResolvedPath('~')

  t.truthy(res)
})
test('Get resolved type should return type if type provided correctly', (t) => {
  const checkType = getResolvedType('check')
  const executeType = getResolvedType('execute')

  t.truthy(checkType.resolvedType)
  t.truthy(executeType.resolvedType)
})
test('Get resolved type should return error if type provided incorrectly', (t) => {
  const type = getResolvedType('otherType')

  t.truthy(type.error)
})
test('Event emitter should return list of subscribers with projects', (t) => {
  const spy = sinon.spy()
  emitter.subscribe('projects', spy)
  emitter.subscribe('projects', spy)
  emitter.subscribe('projects', spy)
  emitter.subscribe('projects', spy)
  const list = emitter.getListOfProjects()
  const errorsList = emitter.getListOfErrors()

  t.is(list.length, 4)
  t.falsy(errorsList)
})
test('Home path should return correctly', (t) => {
  const home = process.env.HOME
  const transformedPath = transformHomePath('~')

  t.is(home, transformedPath)
})

test('Message by type should return correctly if passed check method, or not passed at all', (t) => {
  const message =
    'Thanks for usage, you can use `execute` command for deleting files'
  const messageByTypeCheck = getMessageByType('check')
  const messageByTypeDefault = getMessageByType('')
  t.truthy(messageByTypeCheck.includes(message))
  t.truthy(messageByTypeDefault.includes(message))
})
test('Message by type should return correctly if passed check execute', (t) => {
  const message = 'Thanks for usage.'
  const messageByType = getMessageByType('execute')
  t.truthy(messageByType.includes(message))
})
test('Verbose function must return true if v or verbose flag passed', (t) => {
  const argsV = { v: 'v' }
  const argsVerbose = { verbose: 'verbose' }
  const v = isVerbose(argsV)
  const verbose = isVerbose(argsVerbose)

  t.truthy(v)
  t.truthy(verbose)
})
test('Verbose function must return false if v or verbose flag not passed', (t) => {
  const args = { someArg: 'someArgument' }
  const verbose = isVerbose(args)

  t.falsy(verbose)
})
test('bytesToMb should return transformed to mb value', (t) => {
  const size = 214781
  const mbDecimal2 = bytesToMb(size, 2)
  const mbDecimal4 = bytesToMb(size, 4)

  t.is(mbDecimal2, '0.21 mb')
  t.is(mbDecimal4, '0.2148 mb')
})
test('bytesToMb should return correct value if bytes is 0', (t) => {
  const size = 0
  const result = bytesToMb(size)

  t.is(result, '0 Bytes')
})
test('getNumFromString should return transformed to number', (t) => {
  const size = '214781.1 value'
  const num = getNumFromString(size)

  t.is(typeof num, 'number')
  t.is(num, 214781.1)
})
