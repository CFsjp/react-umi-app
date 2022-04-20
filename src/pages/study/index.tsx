

import { MouseEvent, ReactNode, useCallback, useRef, useState } from 'react'
import { Button, Modal, Select } from 'antd'
import style from './index.less'

const { Option } = Select;
interface InitProps {
  [key: string]: any
}

/**
 * @param props {}
 * @description 学习ts使用页面
 * @author chengfeng
 * @since 2022/03/30
 * @version 1.0.0
 */
function Study(props: InitProps): ReactNode {
  const {} = props
  const [modelVisible, setModelVisible] = useState(false)
  const selectFatherRef = useRef<HTMLDivElement>(null)
  
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
  }, [])

  const handleModelClick = useCallback(() => {
    setModelVisible(!modelVisible)
  }, [modelVisible])

  return (
    <div className={style.studyWrap}>
      <h1 onClick={handleClick}>study page</h1>
      <div className={style.main} ref={selectFatherRef}>
        <Button onClick={handleModelClick} >弹窗按钮</Button>
        <h4>可滚动的区域 / scrollable area</h4>
        <h4>select 的 option 选择位置跟随select必须要以下：</h4>
        <p>1、getPopupContainer= () =&gt; selectFatherRef.current as HTMLDivElement</p>
        <p>2、父元素ref=selectFatherRef，并且position：relative</p>

        <Select defaultValue="lucy" getPopupContainer={() => selectFatherRef.current as HTMLDivElement}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      <Modal visible={modelVisible} onCancel={handleModelClick} onOk={handleModelClick}>我是弹窗</Modal>
    </div>
  )
}

export default Study
