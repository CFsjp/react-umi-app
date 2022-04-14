import { isFunction } from './type'
import { getFileSuffix } from './format'

interface CookieMap {
  [key: string]: string
}

/**
 * @description 对 cookies 的操作
 * @function get 获取 cookies
 * @function set 设置 cookies
 * @function remove 移除 cookies上的数据
 * @function removeUserToken 清除 cookies
 */
export const cookies = {
  get: (cname: string): string => {
    const cookiestr = document.cookie
    const cookieList = cookiestr.split('; ')
    const cookieMap: CookieMap = {}

    cookieList.forEach((cookie) => {
      const [cookieKey, cookieVal] = cookie.split('=')
      cookieMap[cookieKey] = cookieVal
    })

    return cookieMap[cname]
  },
  set: (cname: string, cval: string | number | boolean, exdays = 7): void => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)

    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${cname}=${cval};${expires}`
  },
  remove: (cname: string): void => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  },
  removeUserToken(): void {
    this.remove('token')
    this.remove('refresh_token')
  }
}

/**
 * @description 防抖
 * @param action 回调函数
 * @param wait 防抖时间
 * @returns 防抖函数
 */
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

/**
 * @description 节流
 * @param action 回调函数
 * @param wait 节流时间
 * @returns 节流函数
 */
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


/**
 * @description 复制文本函数
 * @param text 文本
 * @param callback 回调
 * @example copyText('需要复制的文本')
 */
export function copyText(text: string, callback: (msg: string) => void): void {
  if (!text) {
    throw new Error('文本为空')
  }

  const input = document.createElement('input')
  input.setAttribute('style', 'position: absolute; opacity: 0;')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  input.remove()

  if (isFunction(callback)) {
    callback('复制成功，快去粘贴吧~')
  }
}

/**
 * @description 下载图片函数
 * @param link 图片地址
 * @param picName 图片名字
 * @param errorCallback 错误回调
 * @param successCallback 成功毁掉
 * @example  downloadImage('www,baidu,com', '百度图片')
 */
export function downloadImage(
  link: string,
  picName?: string,
  errorCallback?: (msg: string) => void,
  successCallback?: () => void
): void {
  if (!link) {
    if (isFunction(errorCallback)) {
      errorCallback && errorCallback('图片地址为空, 无法下载')
    }
    return
  }

  const img = new Image()
  const toDataURL = `image/${getFileSuffix(link)}`
  img.setAttribute('crossOrigin', 'Anonymous')
  img.onload = function () {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context = <CanvasRenderingContext2D>canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    context.drawImage(img, 0, 0, img.width, img.height)
    const url: string = canvas.toDataURL(toDataURL)
    const a: HTMLAnchorElement = document.createElement('a')
    const event: MouseEvent = new MouseEvent('click')
    a.download = picName || ''
    a.href = url
    a.dispatchEvent(event)
    if (isFunction(successCallback)) {
      successCallback && successCallback()
    }
  }
  img.src = `${link}`
}

/**
 * @description 简单的下载函数
 * @param url 下载地址
 */
export function downloadURL(url: string): void {
  window.open(url)
}

/**
 * @description 生成随机字符串
 * @returns 随机字符串
 * @example const key = generateRandom()
 */
export function generateRandom(): string {
  const randomStr = Math.random().toString().slice(-6)
  const timeStamp = Date.now().toString()
  return randomStr + timeStamp
}


// /**
//    * @description: 下载动效。
//    *               拿到导出按钮的视口位置数据，再拿到下载中心元素的视口位置数据，绘制出一个长方形作为动画效果的容器。
//    *               （这个长方形的类名是animationContainer。未来有缘人来改这里话，加个背景色就看到了）
//    *               css中的动画处理仅有两种（左起始或右起始）
//    * @param {*}
//    * @return {*}
//    */
//  const AnimationFn = () => {
//   // 下载中心元素相关位置数据
//   const {
//     left: downloadCenter_left,
//     right: downloadCenter_right,
//     bottom: downloadCenter_bottom
//   } = document.getElementById('DOWNLOADCENTER').getBoundingClientRect()
//   const downloadCenter_centerX =
//     (downloadCenter_left + downloadCenter_right) / 2

//   // 导出按钮相关位置数据
//   const {
//     left: exportButton_left,
//     right: exportButton_right,
//     bottom: exportButton_bottom
//     // x: exportButton_x,
//     // y
//   } = exportBtnRef.current.getBoundingClientRect()
//   const exportButton_centerX = (exportButton_left + exportButton_right) / 2

//   // 判断导出按钮相对于下载中心是相对居左还是局右;_animationContainer_left赋值为更靠左（更小）的数值
//   const _animationName =
//     downloadCenter_centerX - exportButton_centerX >= 0
//       ? 'exportButtonBeginFromLeft'
//       : 'exportButtonBeginFromRight'
//   const _animationContainer_left =
//     downloadCenter_centerX - exportButton_centerX >= 0
//       ? exportButton_centerX
//       : downloadCenter_centerX

//   // 绘制动效容器
//   const animationContainer_styleData = {
//     width: Math.abs(downloadCenter_centerX - exportButton_centerX),
//     height: Math.abs(downloadCenter_bottom - exportButton_bottom),
//     top: downloadCenter_bottom,
//     left: _animationContainer_left
//   }
//   animationContainer.current.style.width =
//     `${animationContainer_styleData.width  }px`
//   animationContainer.current.style.height =
//     `${animationContainer_styleData.height  }px`
//   animationContainer.current.style.top =
//     `${animationContainer_styleData.top  }px`
//   animationContainer.current.style.left =
//     `${animationContainer_styleData.left  }px`

//   // 处理图标小icon
//   const timeId = `${new Date().getTime()  }movingIcon`
//   const iconBox = document.createElement('div')
//   iconBox.id = timeId
//   iconBox.className = 'movingIcon'
//   iconBox.style.animationName = _animationName
//   animationContainer.current.appendChild(iconBox)
//   const Timer = setTimeout(() => {
//     if (animationContainer.current) {
//       animationContainer.current.removeChild(
//         animationContainer.current.children[timeId]
//       )
//     }
//     clearTimeout(Timer)
//   }, 1.8 * 1000)
// }