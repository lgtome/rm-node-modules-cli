function EventEmitter() {
  let list = []

  return {
    subscribe: (value) => list.push(value),
    getList: () => list,
  }
}

const emitter = EventEmitter()

export { emitter }
