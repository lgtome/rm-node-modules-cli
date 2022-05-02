function EventEmitter() {
  const list = new Map()

  return {
    /**@param {array} value - must be [] */
    subscribe: (key, value) => {
      const isInit = list.has(key)
      if (!isInit) return list.set(key, [value])

      list.set(key, list.get(key).concat(value))
    },
    getListOfErrors: () => list.get('errors'),
    getListOfProjects: () => list.get('projects'),
    getInformationOfProjects: () => list.get('info'),
  }
}

const emitter = EventEmitter()

export { emitter }
