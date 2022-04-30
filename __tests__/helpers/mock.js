export const mockData = {
  withModules: {
    node_modules: {
      testFile: 'testFile',
    },
    'index.md': 'rm-nm test',
    'package.json': '',
  },
  withoutModules: {
    'index.md': 'rm-nm test',
    'package.json': '',
    'yarn.lock': '',
  },
  withoutMarkedFiles: {
    node_modules: {
      testFile: 'testFile',
    },
    'index.md': 'rm-nm test',
  },
}
