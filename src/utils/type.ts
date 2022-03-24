export function isType(type: string) {
  return function isParamType(param: any): boolean {
    return Object.prototype.toString.call(param) === `[object ${type}]`
  }
}

export const isObject = isType('Object')
export const isArray = isType('Array')
export const isFunction = isType('Function')
export const isNumber = isType('Number')
export const isInteger = (param: any) => isNumber(param) && param % 1 === 0
export const isString = isType('String')
export const isBoolean = isType('Boolean')
export const isNull = isType('Null')
export const isUndefined = (param: any) => typeof param === 'undefined'
export const isEmptyObj = (param: any) =>
  isObject(param) && !Object.keys(param).length
