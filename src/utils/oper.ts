import { isFunction } from './type'
import { getFileSuffix } from './format'

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

export function downloadURL(url: string): void {
  window.open(url)
}

export function generateRandom(): string {
  const randomStr = Math.random().toString().slice(-6)
  const timeStamp = Date.now().toString()
  return randomStr + timeStamp
}
