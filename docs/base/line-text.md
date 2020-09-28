# flex实现中间文字，两边横线（1px）
学习了实现1px边框的实现方法。迫不及待的想要记录一下。顺便利用flex布局+1px边框实现一个 简单的中间文字，两边横线的组件。
## 演示
首先来看组件的需求：
- 左右两边的横线在移动端显示为1px。
- 中间内容部分可以随意传入文字内容。
- 同时不论文字的多少，两边的横线会随着内容增大而减小，直到内容占据的最大宽度为40%。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200224175207994.png)
根据以上需求，我们来制定步骤。
## 1px边框实现
### mixin.styl
首先在mixin.styl中定义一个方法border-1px。此时宽度在drp为1.5的设备下显示的是1.5px。 在dpr为2的设备下显示的是2px。接下来要在base.styl中设置缩放才能真正实现1px。

```bash
no-wrap() //  文字超出省略
  text-overflow ellipsis
  overflow hidden
  white-space nowrap

border-1px($color) // 底部1px的边框，可传入颜色
  position: relative
  &::after 
    display block
    position absolute
    left 0
    bottom 0
    width 100%
    border-top 1px solid $color
    content ' '
```
### base.styl
在base.styl下，查询设备dpr。再乘以缩放倍数使其达到1px的效果。

```bash
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
    .border-1px
        &::after
            -webkit-transform scaleY (0.7)
            transform scaleY(0.7)
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
    .border-1px
        &::after
            -webkit-transform scaleY (0.5)
            transform scaleY(0.5)
```
## 基础组件：line-text.vue
这里利用了flex布局的flex-shrink属性，当flex-shrink为1表示能够被压缩，所以设置横线部分的该属性为1， 同理，内容层应该被撑起宽度，直到40%。

```bash
<template>
  <div class="box-wrapper">                <!-- 外层 -->
    <div class="left border-1px"></div>    <!-- 左侧横线 -->
    <div class="text">{{content}}</div>    <!-- 内容文字 -->
    <div class="right border-1px"></div>   <!-- 右侧横线 -->
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
@import '../common/stylus/mixin'
.box-wrapper
  display flex                    /* 外层设置flex布局 */
  width 100%                      /* 宽度100% */
  height 50px                     /* 高度50px，可自定义 */
  overflow hidden                 /* 超出隐藏 */
  .left, .right
    flex-shrink 1                 /* 横线设置为可压缩 */
    width 49%                     /* 初始时横线宽度 */
    margin 0 10px
    transform translate(0, -50%)  /* 向上偏移50% */
    border-1px(#ccc)              /* mixin.styl中定义的border-1px方法 */
  .text
    flex-shrink 0                 /* 内容设置为不可压缩 */
    text-align center
    line-height 50px
    max-width 40%
    no-wrap()                     /* 文字超出省略 */
</style>
```
## 应用组件：line-text-apply.vue
示例如何将该组件放入应用组件中，传入的内容将被显示：

```bash
<template>
   <div>
     <LineText :content="content"></LineText>
   </div>
</template>

<script type='text/ecmascript-6'>
import LineText from 'base/line-text'
export default {
  data () {
    return {
      content: '未完待续'
    }
  },
  components: {
    LineText
  }
}
</script>

<style>

</style>
```
