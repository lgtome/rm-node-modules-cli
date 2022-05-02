import test from 'ava'
import { emitter } from '../src/service/eventEmitter.js'
import { run } from '../src/service/index.js'
import { Timeout } from './helpers/index.js'

const errorMessage = 'Arguments not provided!'

test('Throw error when days not a number', async (t) => {
  const error = await run(`${process.cwd()}`, 'fs', 'check')
  t.is(error.message, errorMessage)
})

test('Throw error when path not provided', async (t) => {
  const error = await run(null, 'fs', 'check')

  t.is(error.message, errorMessage)
})
test('Throw error when type is incorrect', async (t) => {
  const error = await run(null, 'fs', null)

  t.is(error.message, errorMessage)
})

test.serial(
  'Errors list from the emitter should return correct value if errors were committed ',
  async (t) => {
    await run(`${process.cwd()}/wrong/folder`, 0, 'check')
    await run(`${process.cwd()}/another/wrong/folder`, 0, 'check')

    const errors = emitter.getListOfErrors()

    t.is(errors?.length, 2)
  },
)
