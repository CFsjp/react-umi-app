

import { MouseEvent, ReactNode, useCallback, useState } from 'react'
import { Button, Modal } from 'antd'
import style from './index.less'


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
  
  const handleClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
  }, [])

  const handleModelClick = useCallback(() => {
    setModelVisible(!modelVisible)
  }, [modelVisible])

  return (
    <div className={style.studyWrap}>
      <h1 onClick={handleClick}>study page</h1>
      <div className={style.main}>
        <Button onClick={handleModelClick} >弹窗按钮</Button>
      </div>
      <Modal visible={modelVisible} onCancel={handleModelClick} onOk={handleModelClick}>我是弹窗</Modal>
    </div>
  )
}

export default Study
