export function compareDays(days, day) {
  if (!days) return false
  return Math.min(...days) >= day
}
