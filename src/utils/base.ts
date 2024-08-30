export function isURL(target: unknown): target is URL {
  return target instanceof URL || !!(target as URL)?.href
}

// Array.isArray
export const isArray = Array.isArray
// Object.assign
export const extend = Object.assign

export const rawToString = Object.prototype.toString

// is Undefined
export function isUndefined(target: unknown): target is undefined {
  return target === undefined
}

// is Null
export function isNull(target: unknown): target is null {
  return target === null
}

// is String
export function isString(target: unknown): target is string {
  return typeof target === 'string'
}

// is Boolean
export function isBoolean(target: unknown): target is boolean {
  return typeof target === 'boolean'
}

export const toTypeString = (value: unknown): string => rawToString.call(value)

// is Number
export function isNumber(target: unknown): target is number {
  return typeof target === 'number'
}

// is function
export function isFunction(target: unknown): target is Function {
  return typeof target === 'function'
}

// is PlainObject
export function isPlainObject<T = Record<PropertyKey, unknown>>(target: unknown): target is T {
  return toTypeString(target) === '[object Object]'
}

// is Object
export function isObject(target: unknown): target is object {
  return !isNull(target) && typeof target === 'object'
}

// is Promise
export function isPromise(target: unknown): target is Promise<unknown> {
  return toTypeString(target) === '[object Promise]'
}
