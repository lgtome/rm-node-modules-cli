module.exports = {
  files: ['__tests__/**/*.js', '!__tests__/helpers/**/*.js'],
  require: ['@babel/register'],
  workerThreads: false,
}
