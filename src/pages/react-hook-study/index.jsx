import { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import Son from './son'


/**
 * @function ReactHookStudy
 * @description 用来学习react hook的组件示例
 */
function ReactHookStudy() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('乘风')
  const [disabled, setDisavle] = useState(true)

  const add = useCallback((num) => {
    setCount(num + 1)
    setName('张三')
  }, [])

  // const calc = useMemo(() => {
  //   setCount(count + 1)
  // }, [count])

  useEffect(() => {
    document.title = `You clicked ${count} times`
    setTimeout(() => {
      setDisavle(false)
    }, 3000)
  }, [count])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>ReactHookStudy</h1>
      <div>count: {count}</div>
      <div>name: {name}</div>
      <div>
        <Button disabled={disabled} onClick={() => add(count)}>add</Button>
      </div>
      对于子组件，建议使用memo包起来，子组件上面传入的方法，建议使用useCallback包一层，
      因为，父组件重新渲染，会把方法重新渲染，这样就会导致子组件重新渲染，这是没有必要的。
      <Son count={count} />
    </div>
  )
}

export default ReactHookStudy
