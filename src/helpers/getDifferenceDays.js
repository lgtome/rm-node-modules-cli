export function getDifferenceDays(time) {
  const currentTime = new Date(new Date().toISOString())
  return Math.ceil(Math.abs(currentTime - time) / (1000 * 60 * 60 * 24))
}
