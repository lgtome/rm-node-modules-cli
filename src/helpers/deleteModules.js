import fs from 'fs'
export function deleteModules(pathToModules) {
  fs.rm(pathToModules, { recursive: true }, (e) => {
    console.log(e)
  })
  return `Success✨ - ${pathToModules}`
}
