import { useState, useEffect } from 'react'
import Son from './son'

/**
 * @description 学习
 */
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`)
    //   会依次打印出count的值，1，2，3，4，5...
    }, 3000)
  })

//   componentDidUpdate去实现的话，会在定时器触发时，直接打印出最终结果，5，5，5，5，5...
// useEffect 和 componentDidUpdate 还是不一样的

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
        <Son slot={<div>这是父组件的 slot</div>} />
    </div>
  )
}

export default Counter
