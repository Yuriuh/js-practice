const types = Object.freeze({
  'undefined': 'Undefined',
  'null': 'Null',
  'object': 'Object',
  'array': 'Array',
  'string': 'String',
  'boolean': 'Boolean',
  'number': 'Number',
  'function': 'Function',
  'symbol': 'Symbol',
})

// Hack: "[object Object]" slice(8, -1) 能获取到 Object 这部分
const getType = v => Object.prototype.toString.call(v).slice(8, -1)

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
