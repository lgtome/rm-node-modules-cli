export function getResolvedType(type = 'check') {
  switch (type) {
    case 'check':
      return { resolvedType: 'check' }
    case 'execute':
      return { resolvedType: 'execute' }
    default:
      return { error: Error('Incorrect type!') }
  }
}
