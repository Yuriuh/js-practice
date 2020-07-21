function updateView() {
  console.log('update view')
}

function defineReactive(target, key, value) {
  observer(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      observer(newValue)
      value = newValue
      updateView()
    }
  })
}

function getReactiveArrPrototype() {
  const arrProto = Array.prototype
  const newArrProto = Object.create(arrProto)
  const arrMethods = ['push', 'pop', 'shift', 'unshift', 'splice']
  arrMethods.forEach(method => {
    newArrProto[method] = function() {
      arrProto[method].apply(this, arguments)
      updateView()
    }
  })
  return newArrProto
}
const reactiveArrProto = getReactiveArrPrototype()
console.log('reactiveArrProto', reactiveArrProto)

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  if (Array.isArray(target)) {
    target.__proto__ = reactiveArrProto
    console.log('is array')
    return
  }

  Object.keys(target).forEach(key => {
    const value = target[key]
    defineReactive(target, key, value)
  })
}

const data = {
  name: 'hehe',
  friends: [1, 2, 3],
  info: {
    height: 180,
    isMarried: false,
  }
}

observer(data)
