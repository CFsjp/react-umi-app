export const debounce = (
  action: (...args: any[]) => void,
  wait: number
): (() => void) => {
  let last: NodeJS.Timeout
  return function(this: any, ...args: any) {
    if (last) clearTimeout(last)
    last = setTimeout(() => {
      action.apply(this, args)
    }, wait)
  }
}

export const thorttle = (
  action: (...args: any[]) => void,
  wait: number
): (() => void) => {
  let flag = true
  return function (this: any, ...args: any) {
    if (!flag) return
    flag = false

    setTimeout(() => {
      action.apply(this, args)
      flag = true
    }, wait)
  }
}
