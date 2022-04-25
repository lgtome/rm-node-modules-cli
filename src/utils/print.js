const initialConfig = {
  condition: true,
  stop: false,
}
export function printToConsole(value, options = initialConfig) {
  const { condition, stop } = options
  if (!value || !condition) return null
  console.log(value)
  if (stop) {
    process.exit(0)
  }
}
