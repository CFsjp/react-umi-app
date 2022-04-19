import { createFromIconfontCN } from '@ant-design/icons'

// 详见 https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.12&manage_type=myprojects&projectId=2326520&keyword=&project_type=&page=
const ICONFONT_URL = '//at.alicdn.com/t/font_2326520_7fzficvi23x.js'

/**
 * @description Icon组件
 * @example
 * <Icon type="iconyulan"/>
 */
export const Icon = createFromIconfontCN({ scriptUrl: ICONFONT_URL })

export default Icon

/**
 * @description 删除icon
 * @param props 父传过来的属性
 */
export function DeleteIcon(props: any) {
  return <Icon type="iconshanchu" {...props} />
}
