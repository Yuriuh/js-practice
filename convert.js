const snakeCaseToCamelCase = s => s.replace(/([-_][a-z])/g, (g) => g.toUpperCase().replace('-', '').replace('_', ''))

const camelCaseToSnakeCase = str => str.split(/(?=[A-Z])/).join('_').toLowerCase()

const isPrimitive = val => Object(val) !== val

const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object

const isArray = val => Array.isArray(val)

const convert = (obj, action) => {
  let copy
  if (isPrimitive(obj)) return obj
  if (isArray(obj)) {
    copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = convert(obj[i], action)
    }
    return copy
  }
  if (isPlainObject(obj)) {
    copy = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = action(key)
      if (isPrimitive(value)) {
        copy[newKey] = value
      } else {
        copy[newKey] = convert(value, action)
      }
    }
    return copy
  }
}

const convertKeysToCamelCase = (obj) => {
  return convert(obj, snakeCaseToCamelCase)
}

const convertKeysToSnakeCase = (obj) => {
  return convert(obj, snakeCaseToCamelCase)
}
