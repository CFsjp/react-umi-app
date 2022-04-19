/**
 * @param root0
 * @param root0.slot
 * @description 测试组件
 */
function Son({ slot }) {
  return <div>
    <h1>Son组件</h1>
    <div>
      <h2>slot</h2>
      { slot }
    </div>
  </div>
}

export default Son