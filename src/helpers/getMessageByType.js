export function getMessageByType(type) {
  switch (type) {
    case 'check':
      return 'Thanks for usage, you can use `run` command for deleting files'
    case 'execute':
      return 'Thanks for usage. ✨'
    default:
      return 'Thanks for usage, you can use `run` command for deleting files'
  }
}
