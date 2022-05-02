import mock from 'mock-fs'
import fs from 'fs'
import path from 'path'
import test from 'ava'
import { Timeout } from './helpers/index.js'
import { mockData } from './helpers/mock.js'
import { run } from '../src/service/index.js'

test.beforeEach(
  'parse',
  () => {
    mock({
      directory: {
        ...mockData.withModules,
      },
      withoutModules: {
        ...mockData.withoutModules,
      },
      emptyDirectory: {
        ...mockData.withoutMarkedFiles,
      },
    })
  },
  { createCwd: false },
)
test.after('parse', () => {
  mock.restore()
})
test('Execute should not affect if node_modules not defined', async (t) => {
  const folder = `${process.cwd()}/withoutModules/node_modules`
  try {
    const entryPath = path.resolve(process.cwd(), 'withoutModules')
    await run(entryPath, 14, 'execute')
    fs.readdirSync(folder)
  } catch (e) {
    t.pass()
  }
})
test('Execute should not affect if days not agreed', async (t) => {
  const folder = `${process.cwd()}/directory/node_modules`
  try {
    const entryPath = path.resolve(process.cwd(), 'directory')
    await run(entryPath, 14, 'execute')
  } catch (e) {
    console.log('')
  }
  const read = fs.readdirSync(folder)
  t.is(read.length, 1)
})
test('Execute should not affect if marked files do not exist', async (t) => {
  const folder = `${process.cwd()}/emptyDirectory/node_modules`
  try {
    const entryPath = path.resolve(process.cwd(), 'emptyDirectory')
    await run(entryPath, 0, 'execute')
  } catch (e) {
    console.log('')
  }
  const read = fs.readdirSync(folder)
  t.is(read.length, 1)
})
test.skip('Execute should delete if node_modules exist and days are correct', async (t) => {
  const folder = `${process.cwd()}/directory/node_modules`
  try {
    const entryPath = path.resolve(process.cwd(), 'directory')
    await run(entryPath, 0, 'execute')
    await Timeout()
    fs.readdirSync(folder)
  } catch (e) {
    t.pass()
  }
})
