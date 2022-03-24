/* eslint-disable no-restricted-syntax */
// 使用方式：https://juejin.cn/post/6947835848813445128
// 使用vue响应式来写react，别问，就是玩～～～
import { reactive, effect } from '@vue/reactivity'
import { useRef, useEffect, useMemo, useState } from 'react'


export default function useReactive(initState) {
  const reactiveState = useRef(initState) // state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [a, forceUpdate] = useState(0)
  const state = useMemo(
    () => reactive(reactiveState.current),
    [reactiveState.current]
  )

  useEffect(() => {
    let isdep = false
    effect(() => {
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      for (const i in state) {
        state[i]
      } // 依赖收集
      isdep && forceUpdate((num) => num + 1) // 强制更新
      if (!isdep) isdep = true
    })
  }, [state])
  return state
}

// import useReactive from './useReactive'


// export default function Index() {
//   const state = useReactive({ number: 1, name: 'alien' })
//   return (
//     <div className="box">
//       <div className="show">
//         <div> 你的姓名是: {state.name} </div>
//         <div>{new Array(state.number).fill(0).map(() => '👽')}</div>
//       </div>
//       <div className="constrol">
//         <div>
//           {' '}
//           <button onClick={() => state.number++}>👽++</button>{' '}
//         </div>
//         <div>
//           {' '}
//           <button onClick={() => state.number--}>👽--</button>{' '}
//         </div>
//         <input
//           placeholder="姓名"
//           value={state.name}
//           onChange={(e) => {state.name = e.target.value}}
//         />
//       </div>
//     </div>
//   )
// }
