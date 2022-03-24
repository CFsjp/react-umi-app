/**
 * reducers中方法的名字不可和effects中方法名相同，会产生错误
 */

interface stateProps {
  authList?: Array<any>
  user?: any
  topDepartment?: any
  tenant?: any
}

export default {
  namespace: 'auth',
  state: {
    authList: [],
    user: {},
    tenant: {},
    topDepartment: {}
  },
  reducers: {
    // 同步函数
    handleUserInfo(state: stateProps, data: stateProps) {
      const { payload } = data
      state.authList = payload.authList
      state.user = payload.user
    },
    handleTenantInfo(state: stateProps, data: stateProps) {
      const { payload } = data
      state.topDepartment = payload.topDepartment
      state.tenant = payload.tenant
    }
  },
  effects: {
    // 异步函数
    *updateUserInfo({ payload }, { put }) {
      yield put({ type: 'handleUserInfo', payload })
    },
    *updateTenantInfo({ payload }, { put }) {
      yield put({ type: 'handleUserInfo', payload })
    },
  }
}
