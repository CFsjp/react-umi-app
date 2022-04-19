import style from './index.less'

/**
 * @description 页面展示效果优化---交互设计优化
 * @example
 * 1、过渡与动画   适当的增加过渡与动画，能够很好的让用户感知到页面的变化
 * 2、滚动优化
 * 滚动平滑：使用 scroll-behavior: smooth 让滚动丝滑 -- https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior
 * 使用 scroll-snap-type 优化滚动效果，滚动后自动滑动到区域块开头
 * 3、点击交互优化
 * 优化手势 -- 不同场景应用不同 cursor
 * cursor: pointer;    // 可点击
 * cursor: not-allowed;    // 不可点击
 * cursor: wait;    // loading
 * cursor: text; // 输入框手势
 * cursor: help; // 帮助手势
 * cursor: zoom-in、zoom-out // 放大缩小图片手势
 * 点击区域优化 -- 伪元素扩大点击区域
 * .btn::befoer{
 * content:"";
 * position:absolute;
 * top:-10px;
 * right:-10px;
 * bottom:-10px;
 * left:-10px;
 * }
 * 快速选择优化 -- user-select: all
 * 添加禁止选择 -- user-select: none
 * 文本按钮的快速点击，触发了浏览器的双击快速选择，导致文本被选中：
 * 翻页按钮的快速点击，触发了浏览器的双击快速选择：
 * 对于这种场景，我们需要把不可被选中元素设置为不可被选中，利用 CSS 可以快速的实现这一点：
 * user-select: none;
 */
function Css() {
  return (
    <div className={style.cssWrap}>
      <nav>
        <a href="/css/#1" className={style.a}>
          1
        </a>
        <a href="/css/#2" className={style.a}>
          2
        </a>
        <a href="/css/#3" className={style.a}>
          3
        </a>
        <i className="iconfont iconguanbi1x const-icon-close" />
      </nav>
      <div className={style['scrolling-box']}>
        <section id="1" className={style.section}>
          First section
        </section>
        <section id="2" className={style.section}>
          Second section
        </section>
        <section id="3" className={style.section}>
          Third section
        </section>
      </div>
    </div>
  )
}

export default Css
