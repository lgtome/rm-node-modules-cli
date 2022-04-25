import { getDifferenceDays, getLastUpdateTime } from '../helpers/index.js'
export function findModulesAndProjectTime(files, entryPath) {
  const key = 'days'
  return files.reduce(
    (acc, file) => {
      if (file === 'node_modules') acc['isModulesFounded'] = true
      const time = getDifferenceDays(getLastUpdateTime(entryPath, file))
      acc[key] = acc[key] ? acc[key].concat(time) : [time]
      return acc
    },
    { isModulesFounded: false },
  )
}
