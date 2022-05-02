export function Timeout(ms = 2000, data = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })
}
