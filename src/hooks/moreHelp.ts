import { reactive, effect } from '@vue/reactivity'
import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
interface CurInstance {
  fn: Function
  timer: null | NodeJS.Timeout
}

/**
 * @description 在多次触发后，只去触发最后一次的fn回调，主要场景：多次切换点击，只触发最后一次接口调取获取数据，从而优化性能和提高用户体验
 * @param fn 用来减少触发的回调函数
 * @param delay 定时器触发时间
 * @param dep 依赖项
 * @returns 根据 dep 依赖项 返回一个防抖函数，根据 delay 时间去防止 fn 多次触发
 */
export function useDebounce(fn: Function, delay: number, dep: any[]) {
  // 定义ref来获取之前的防抖实例
  const { current } = useRef<CurInstance>({ fn, timer: null })

  // 从新设置防抖回调
  useEffect(() => {
    current.fn = fn
  }, [current, fn])

  // 返回防抖的useCallback
  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn(...args)
    }, delay)
  }, dep)
}

type Types = string | number | symbol
interface InitState {
  [key: Types]: any
}

/**
 * @description 把数据变成响应式的
 * @param initState 初始化数据
 * @returns reactiveState 响应式数据
 * @example
 * import useReactive from './useReactive'
 * const state = useReactive({ number: 1, name: 'alien' })
 */
export default function useReactive(initState: InitState) {
  const reactiveState = useRef(initState)
  const [, forceUpdate] = useState(0)

  const state = useMemo(() => reactive(reactiveState.current), [])

  useEffect(() => {
    let isdep = false

    effect(() => {
      for (const i in state) {
        state[i]
      } // 依赖收集

      isdep && forceUpdate((num) => num + 1) // 强制更新
      
      if (!isdep) isdep = true
    })
  }, [state])
  return state
}
