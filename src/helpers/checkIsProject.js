export function checkIsProject(currentItem) {
  switch (currentItem) {
    case 'package.json':
      return true
    case 'yarn.lock':
      return true
    default:
      return false
  }
}
