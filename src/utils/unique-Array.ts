/**
 * 去掉数组中相同的对象或者数组
 * @param arr
 * @returns
 */
export function uniqueArray(arr: Array<any>) {
  /**
   * const a = [
   *  { id: 1, name: '何' },
   *  { id: 1, name: '何' },
   *  { id: 1, name: '何' },
   *  { id: 1, name: '王' },
   *  { id: 1, name: '王' },
   *  [1, 2, 3],
   *  [1, 2, 3]
   * ]
   *
   * 结果：[
   *  { id: 1, name: '何' },
   *  { id: 1, name: '王' },
   *  [1, 2, 3]
   * ]
   */
  const tem = [...new Set(arr.map((c) => JSON.stringify(c)))]
  return tem.map((el) => JSON.parse(el))
}

/**
 * 以数组对象中某1个键值对为条件去重
 * @param arr：要去重的数组
 * @param key：以第几个key为条件去重
 * const a = [
 *  { id: 1, name: '何' },
 *  { id: 2, name: '何' },
 *  { id: 3, name: '何' },
 *  { id: 1, name: '王' },
 *  { id: 2, name: '王' },
 * ]
 *
 * 结果：[
 *  { id: 1, name: '何' },
 *  { id: 1, name: '王' }
 * ]
 */

export function uniqueArrayByKey(arr: Array<any>, key: string) {
  const map = new Map()
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item)
    }
  })
  return [...map.values()]
}
