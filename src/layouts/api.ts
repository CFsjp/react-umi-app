import { request } from 'umi'


export const getUserInfo = () => {
  return request('/apiCore/user/getUserInfo', { method: 'get' })
}

export const getTenantInfo = () => { // 当前租户信息
  return request('/apiCore/tenant/getTenantInfo', { method: 'get' })
}

export const logoutFunc = () => {
  return request('/apiCore/logout', { method: 'post' })
}