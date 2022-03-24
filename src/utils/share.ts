/**
 * 循环遍历对象
 * @param { Object } obj 对象
 * @param { Function } fn 处理函数
 */
export function forEachValue(
  obj: Record<string, unknown>,
  fn: (value: any, key: string) => void
): void {
  Object.keys(obj).forEach((key) => {
    fn(obj[key], key)
  })
}
