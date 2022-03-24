import { request } from 'umi'


export const departmentTree = () => { // 展示部门
  return request('/apiCore/department/tree', { method: 'get' })
}
