import { Spin } from 'antd'
import styles from './index.less'


export default function Loading() {
  return (
    <div className={styles.loadingWrap}>
      <Spin size="large" />
    </div>
  )
}
