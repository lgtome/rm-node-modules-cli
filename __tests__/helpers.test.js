import test from 'ava'
import { run } from '../src/service/index.js'
import {
  compareDays,
  getResolvedPath,
  getResolvedType,
  transformHomePath,
  getMessageByType,
} from '../src/helpers/index.js'
import { emitter } from '../src/service/eventEmitter.js'
import sinon from 'sinon'

test('Compare days should return false if a days incompatible', (t) => {
  const res = compareDays(null, 1)
  t.false(res)
})

test('Get resolved path should not return a path if entry path not provided', async (t) => {
  const mock = sinon.stub(process, 'exit')
  const res = getResolvedPath(null)

  t.falsy(res)
  t.true(mock.calledOnce)
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
test('Event emitter should return list of subscribers correctly', (t) => {
  const spy = sinon.spy()
  emitter.subscribe(spy)
  emitter.subscribe(spy)
  emitter.subscribe(spy)
  const list = emitter.getList()

  t.is(list.length, 3)
})
test('Home path should return correctly', (t) => {
  const home = process.env.HOME
  const transformedPath = transformHomePath('~')

  t.is(home, transformedPath)
})

test('Message by type should return correctly if passed check method, or not passed at all', (t) => {
  const message =
    'Thanks for usage, you can use `run` command for deleting files'
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
