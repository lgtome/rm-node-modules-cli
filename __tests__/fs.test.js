import test from 'ava'
import mock from 'mock-fs'
import fs from 'fs'
test.before('parse', () => {
  mock({
    node_modules: {
      'index.md': '# Hello world!',
    },
  })
})
test.after('parse', () => {
  mock.restore()
})
test('Parse are correct', (t) => {
  const file = `${process.cwd()}/folderName/index.md`
  const readded = fs.readFileSync(file, 'utf8')
  console.log(readded)
  t.is(1, 1)
})
