import { message } from 'antd'
interface error {
  name: string
  data: any
  type: string
  response: {
    status: number
    statusText: string
    url: string
  }
  errortext: string
  code: string
  resultMsg: string
}

/**
 * @description 异常处理程序
 */
const errorHandler = (error: error) => {
  if (error.name === 'RequestError') {
    message.error(error.errortext || '请求超时')
    return
  }
  message.error(error.resultMsg)
}

export default errorHandler
