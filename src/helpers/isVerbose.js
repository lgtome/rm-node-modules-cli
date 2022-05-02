export function isVerbose(args) {
  const { v, verbose } = args
  return v || verbose
}
