<template>
  <div class="shadow-wrapper" :class="mask?'shadow-bg':''" v-if="visible" @click.stop ref="mask">
    <!-- 遮罩层 -->
    <div class="dialog-wrapper">
      <!-- 对话框 -->
      <div class="info-wrapper">
        <!-- 对话框内容部分 -->
        <img class="icon" :src="require(`../common/images/${icon}-circle.png`)" />
        <div class="text">{{info}}</div>
      </div>
      <div class="btn-wrapper">
        <!-- 对话框按钮部分 -->
        <div class="btn" @click="onCancel">{{cancelText}}</div>
        <div class="btn" @click="onOk">{{okText}}</div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    mask: { /* 控制遮罩 */
      type: Boolean,
      default: true
    },
    icon: { /* 图标类型 */
      type: String,
      default: 'info'
    },
    info: { /* 文字内容 */
      type: String,
      default: '内容'
    },
    cancelText: { /* 取消按钮文字 */
      type: String,
      default: ''
    },
    okText: { /* 确认按钮文字 */
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: true /* 控制对话框显示 */
    }
  },
  methods: {
    show () { /* 打开对话框 */
      this.visible = true
    },
    hidden () { /* 关闭对话框 */
      this.visible = false
    },
    onCancel () { /* 点击取消 */
      this.$emit('cancel')
      this.hidden()
    },
    onOk () { /* 点击确认 */
      this.$emit('ok')
      this.hidden()
    }
  }
}
</script>

<style lang="stylus">
// @import '../../common/stylus/mixin'
.shadow-wrapper /* 覆盖整个页面 */
  position absolute
  top 0
  left 0
  height 100%
  width 100%
  .dialog-wrapper /* 垂直居中 */
    position relative
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 220px
    background #ffffff
    border solid 1px #ccc
    border-radius 10px
    box-shadow 0 0 5px #ccc
    color #777777
    .info-wrapper
      min-height 80px /* dialog随内容撑开高度 */
      text-align center
      font-weight bold
      margin-bottom 50px
      .icon
        margin-top 10px
        height 30px
        width 30px
      .text
        line-height 30px
        color #666
    .btn-wrapper
      position absolute
      display flex
      height 40px
      width 100%
      bottom 0
      .btn
        padding 0 10px
        flex 1
        text-align center
        line-height 40px
        border-top 1px solid #ccc
        no-wrap()
        &:first-of-type
          border-right 1px solid #ccc
.shadow-bg
  background rgba(0, 0, 0, 0.3)
</style>
