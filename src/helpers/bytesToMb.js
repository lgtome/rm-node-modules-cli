export function bytesToMb(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const mb = 1e-6

  return `${(bytes * mb).toFixed(decimals)} mb`
}
