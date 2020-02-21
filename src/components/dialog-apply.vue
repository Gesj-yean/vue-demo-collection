<template>
  <div class="dia-apply" @click="isclick">
    <div class="operation">
      <div class="btn" @click="open">open</div>
    </div>
    <Dialog ref="dialog"
            :info="info"
            :icon="icon"
            :mask="mask"
            :cancelText="cancelText"
            :okText="okText"
            @cancel="onCancel"
            @ok="onOk"
    ></Dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import Dialog from 'base/dialog'
export default {
  data () {
    return {
      info: '确定要删除此项吗？',
      icon: 'question',
      cancelText: '取消',
      okText: '确定',
      mask: true
    }
  },
  methods: {
    open () {
      this.$refs.dialog.show()
    },
    close () {
      this.$refs.dialog.hidden()
    },
    onCancel () {
      console.log('已取消')
    },
    onOk () {
      console.log('已确定')
    },
    isclick () { /* 测试是否冒泡 */
      console.log('事件冒泡啦')
    }
  },
  components: {
    Dialog
  }
}
</script>

<style lang="stylus">
@import '../common/stylus/base.styl'
.dia-apply
  position relative
  margin 0 auto
  height 500px
  width 280px
  overflow hidden
  border 2px solid #ddd
  border-radius 10px
  .operation
    position absolute
    top 0
    left 0
    .btn
      height 20px
      width 100px
      text-align center
      line-height 20px
      margin 10px
      color $color-highlight
      border 1px solid $color-highlight
      border-radius 5px
</style>
