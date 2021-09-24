import { isInteger } from './type'
import { isNumber } from './type'

/**
 * 获取百分数(纯数字，不带单位)
 * @param son 分子
 * @param mon 分母
 * @param decimals 保留几位有效数字, 默认2
 * @param type fixed: 直接抹去 | round: 四舍五入, 默认fixed
 * @returns 百分数
 */
export function getPercentNum(
  son: number,
  mon: number,
  decimals = 2,
  type?: 'fixed' | 'round'
): number {
  if (!son || !mon) {
    return 0
  }

  const perc = (son / mon) * 100

  if (isInteger(perc)) return perc

  type = type || 'fixed'
  let num = 0
  if (type === 'fixed') {
    num = Number(perc.toFixed(decimals))
  } else {
    const multiple = Math.pow(10, decimals)
    num = Math.round(perc * multiple) / multiple
  }
  return num
}

/**
 * 获取百分数 (带单位)
 * @param son 分子
 * @param mon 分母
 * @param decimals 保留几位有效数字, 默认2
 * @param type fixed: 直接抹去 | round: 四舍五入, 默认fixed
 * @param unit 单位, 默认%
 * @returns
 */
export function getPercentStr(
  son: number,
  mon: number,
  decimals = 2,
  type?: 'fixed' | 'round',
  unit = '%'
): number | string {
  const num = getPercentNum(son, mon, decimals, type)
  if (!num) return 0

  return `${num}${unit}`
}

/**
 * 根据oss地址获取文件名
 * @param ossUrl oss地址
 * @returns 文件名
 */
export function getFileNameFromOssUrl(ossUrl: string): string {
  if (!ossUrl) return ''

  const ExpireTagIdx = ossUrl.lastIndexOf('?Expires')
  const lastLineIdx = ossUrl.lastIndexOf('/') + 1
  if (ExpireTagIdx > -1) {
    return ossUrl.substring(lastLineIdx, ExpireTagIdx)
  }

  return ossUrl.substring(lastLineIdx)
}

/**
 * 根据oss地址获取文件后缀，如果是jpg，则映射成jpeg
 * @param url oss地址
 * @returns 文件后缀
 */
export function getFileSuffix(url: string): string {
  const filename = getFileNameFromOssUrl(url)
  const lastPoint = filename.split('.')

  return lastPoint[1] === 'jpg' ? 'jpeg' : lastPoint[1]
}

/**
 * 数字的千分符方法 1000 => 1,000
 * @param data 数字或者字符串
 * @returns 1000 => 1,000
 */
export const thousandth = (data: number | string) => {
  if (isNumber(data)) {
    return data.toLocaleString()
  } else if (typeof data === 'string') {
    const reg = /\d(?=(?:\d{3})+(?:\.\d+|$))/g
    return data.replace(reg, '$&,')
  } else {
    throw TypeError('期待输入的是一个number或者string类型的数字')
  }
}


/**
 * 手机号的校验
 */
export const validPhone = (rule: any, value: string, callback: (val?: any) => {}) => {
  const reg = /^1[345789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入11位手机号'))
  } else {
    callback()
  }
}

/**
 * 手机号的校验
 */
 export const validEmail = (rule: any, value: string, callback: (val?: any) => {}) => {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}