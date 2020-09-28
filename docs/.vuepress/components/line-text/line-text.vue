<template>
  <div class="box-wrapper">
    <!-- 外层 -->
    <div class="left border-1px"></div>
    <!-- 左侧横线 -->
    <div class="text">{{content}}</div>
    <!-- 内容文字 -->
    <div class="right border-1px"></div>
    <!-- 右侧横线 -->
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    content: { /* 根据外部传入的content显示内容 */
      type: String,
      default: '加载中加载中加载中加载中加载中加载中加载中加载中加载中。。。'
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'

.box-wrapper
  display flex /* 外层设置flex布局 */
  width 100% /* 宽度100% */
  height 50px /* 高度50px，可自定义 */
  overflow hidden /* 超出隐藏 */
  .left, .right
    flex-shrink 1 /* 横线设置为可压缩 */
    width 49% /* 初始时横线宽度 */
    margin 0 10px
    transform translate(0, -50%) /* 向上偏移50% */
    border-1px(#ccc) /* mixin.styl中定义的border-1px方法 */
  .text
    flex-shrink 0 /* 内容设置为不可压缩 */
    text-align center
    line-height 50px
    max-width 40%
    no-wrap() /* 文字超出省略 */
</style>
