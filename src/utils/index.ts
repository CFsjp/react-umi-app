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

export { cookies } from './cookie'

export { debounce, thorttle } from './debounce-throttle'

export {
  getPercentNum,
  getPercentStr,
  getFileNameFromOssUrl,
  getFileSuffix,
  thousandth
} from './format'

export { copyText, downloadImage, downloadURL, generateRandom } from './oper'

export { Pubsub } from './pubsub'

export { forEachValue } from './share'

export { uniqueArray, uniqueArrayByKey } from './unique-Array'
