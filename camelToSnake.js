const camelCaseToSnakeCase = str => str.split(/(?=[A-Z])/).join('_').toLowerCase()

const isPrimitive = val => Object(val) !== val

const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object

const isArray = val => Array.isArray(val)

const convertKeysToSnakeCase = obj => {
  let copy
  if (isPrimitive(obj)) return obj
  if (isArray(obj)) {
    copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = transformToUnderscoreKeys(obj[i])
    }
    return copy
  }
  if (isPlainObject(obj)) {
    copy = {}
    for (const [key, value] of Object.entries(obj)) {
      const newKey = camelCaseToSnakeCase(key)
      if (isPlainObject(value) || isArray(value)) {
        copy[newKey] = transformToUnderscoreKeys(value)
      } else {
        copy[newKey] = value
      }
    }
    return copy
  }
}
