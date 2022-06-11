export function getMessageByType(type) {
  switch (type) {
    case 'check':
      return '\n Thanks for usage, you can use `execute` command for deleting files \n'
    case 'execute':
      return '\n Thanks for usage. ✨ \n'
    default:
      return '\n Thanks for usage, you can use `execute` command for deleting files \n'
  }
}
