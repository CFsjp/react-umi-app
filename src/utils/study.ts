/**
 * 一个方法：生成错误提示信息
 *
 * @param {string} message 提示信息，比如`you have a error`
 * @param {number | string} code 错误码，数字和字符都行
 *
 * [还不懂？点这里吧](https://www.google.com)
 *
 * ```js
 * // demo
 * genErrMsg('demo', 10086)
 *
 * ```
 */
export function genErrMsg(
  message: string,
  code: number | string
): string {
  return (message || `网络繁忙，请稍候再试`) + (code ? `(${code})` : ``)
}

genErrMsg('a', '11')