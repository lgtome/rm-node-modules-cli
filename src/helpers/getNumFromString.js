export function getNumFromString(str) {
  const regex = /\d+\.?\d+/gm
  const matchNum = str.match(regex) || [0]
  return +matchNum[0]
}
