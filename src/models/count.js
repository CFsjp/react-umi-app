/**
 * reducers中方法的名字不可和effects中方法名相同，会产生错误
 */

export default {
  namespace: 'count',
  state: {
    count: 0
  },
  reducers: { // 同步函数
    add(state) {
      state.count++
    },
    del(state) {
      state.count--
    },
  },
  // effects: { // 异步函数
  //   *add({ payload }, { put }) {
  //     yield put({ type: 'add1', payload })
  //   },
  //   *del({ payload }, { put }) {
  //     yield put({ type: 'del1', payload })
  //   }
  // }
};