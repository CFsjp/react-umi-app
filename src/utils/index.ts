export const noop = (): void => {}

export {
  isType,
  isObject,
  isArray,
  isFunction,
  isNumber,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isEmptyObj
} from './type'

export {
  getPercentNum,
  getPercentStr,
  getFileNameFromOssUrl,
  getFileSuffix,
  thousandth
} from './format'

export {
  copyText,
  downloadImage,
  downloadURL,
  generateRandom,
  debounce,
  thorttle,
  cookies
} from './help'

export { Pubsub } from './pubsub'

export { uniqueArray, uniqueArrayByKey } from './unique-Array'
