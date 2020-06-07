const types = Object.freeze({
  'undefined': 'undefined',
  'null': 'null',
  'object': 'Object',
  'array': 'Array',
  'string': 'String',
  'boolean': 'Boolean',
  'number': 'Number',
  'function': 'Function',
  'symbol': 'Symbol',
})

const getType = v => (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name)

const isPlainObject = v => getType(v) === types.object

const isArray = v => getType(v) === types.array

const isString = v => getType(v) === types.string

const isBoolean = v => getType(v) === types.boolean

const isNumber = v => getType(v) === types.number

const isUndefined = v => getType(v) === types.undefined

const isNull = v => getType(v) === types.null

const isFunction = v => getType(v) === types.function

const isSymbol = v => getType(v) === types.symbol

const isPrimitive = v => Object(v) !== v
