import fs from 'fs'
import path from 'path'
export function getLastUpdateTime(folder, file) {
  return fs.statSync(path.join(folder, file)).atime
}
