module.exports = (wallaby) => ({
  files: ['src/**/*.js', '!src/bin/**/*.js'],
  tests: ['__tests__/**/*.js'],
  env: {
    type: 'node',
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel({
      presets: ['@ava/babel-preset-stage-4'],
    }),
  },
  debug: true,
  testFramework: 'ava',
  runMode: 'onsave',
})
