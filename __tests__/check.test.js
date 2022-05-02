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
    })
  },
  { createCwd: false },
)
test.after('parse', () => {
  mock.restore()
})

test('Check parse should correct', async (t) => {
  const file = `${process.cwd()}/directory/index.md`

  const parsed = fs.readFileSync(file, 'utf8')

  t.is(parsed, 'rm-nm test')
})

test('Check method parse folders and not delete them if they correct', async (t) => {
  const folder = `${process.cwd()}/directory/node_modules`
  const selector = ['testFile']
  try {
    const entryPath = path.resolve(process.cwd(), 'directory')
    await run(entryPath, 0)
  } catch (e) {
    console.log('')
  }
  const parsed = fs.readdirSync(folder, 'utf8')

  return Timeout(2000).then(() => {
    t.deepEqual(parsed, selector)
    t.is(parsed.length, selector.length)
  })
})
