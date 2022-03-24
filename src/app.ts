import { message } from 'antd'
import { RequestConfig, Response } from 'umi';
import { history } from 'umi'


export const request: RequestConfig = {
  timeout: 50000,
  // prefix: process.env.NODE_ENV === "production" ? '' : 'api/',
  
  errorHandler: res => {
    const errMsg = res.resultMsg || '系统开小差了～'
    // const description = errMsg || '您的网络发生异常，无法连接服务器'
    // const message = errMsg ? '调用服务器错误' : '网络异常'
    // 登录的时候，如果是这种返回，则不会错误提示
    message.error(errMsg)
    return Promise.reject(res)
  },
  // 自定义端口规范
  errorConfig: {
    adaptor: res => {
      return {
        success: res.code === 200,
        data: res.data,
        errorCode: res.code,
        errorMessage: res.msg,
      };
    },
  },
  responseInterceptors: [
    async(response: Response) => {
      if (response.status === '502') {
        return Promise.reject()
      }
      const data = await response.clone().json()
      if (data.code !== 200) {
        if (data.code === 400) {
          history.replace('/login')
        }
        return Promise.reject(data) // 触发errorHandle执行
      }
      return response
    }
  ]
}