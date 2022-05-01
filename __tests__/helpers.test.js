import test from 'ava'
import { run } from '../src/service/index.js'
import {
  compareDays,
  getResolvedPath,
  getResolvedType,
} from '../src/helpers/index.js'
import { emitter } from '../src/service/eventEmitter.js'
import sinon from 'sinon'

const errorMessage = 'Arguments not provided!'

test('Compare days should return false if a days incompatible', async (t) => {
  const res = compareDays(null, 1)
  t.false(res)
})

test('Get resolved path should not return a path if entry path not provided', async (t) => {
  const res = getResolvedPath(null)

  t.falsy(res)
})
test('Get resolved path should return a path if entry path provided', async (t) => {
  const res = getResolvedPath('.')

  t.truthy(res)
})
test('Get resolved type should return type if type provided correctly', async (t) => {
  const checkType = getResolvedType('check')
  const executeType = getResolvedType('execute')

  t.truthy(checkType.resolvedType)
  t.truthy(executeType.resolvedType)
})
test('Get resolved type should return error if type provided incorrectly', async (t) => {
  const type = getResolvedType('otherType')

  t.truthy(type.error)
})
test('Event emitter should return list of subscribers correctly', async (t) => {
  const spy = sinon.spy()
  emitter.subscribe(spy)
  emitter.subscribe(spy)
  emitter.subscribe(spy)
  const list = emitter.getList()

  t.is(list.length, 3)
})
