import test from 'ava'
import { run } from '../src/service/index.js'

const errorMessage = 'Arguments not provided!'

test.only('Throw error when days not a number', async (t) => {
  const error = await run(`${process.cwd()}`, 'fs', 'check')
  t.is(error.message, errorMessage)
})

test.only('Throw error when path not provided', async (t) => {
  const error = await run(null, 'fs', 'check')

  t.is(error.message, errorMessage)
})
test.only('Throw error when type is incorrect', async (t) => {
  const error = await run(null, 'fs', null)

  t.is(error.message, errorMessage)
})
