<template>
  <div>
    <div class="title">dialog对话框组件</div>
      <div class="desc">今天来实现一个基础的<span class="highlight">对话框组件~</span></div>
      <div class="small-title">演示</div>
      <div class="desc">
        <ul class="desc-ul">
          <li>点击open按钮打开对话框</li>
          <li>点击取消在控制台打印出“已取消”，并关闭对话框</li>
          <li>点击确定在控制台打印出“已确定”，并关闭对话框</li>
        </ul>
      </div>
      <DialogApply></DialogApply>
      <div class="small-title">API</div>
      <div class="desc">
        <ul class="desc-ul">
          <li>mask：控制是否展示遮罩</li>
          <li>info：对话框显示内容</li>
          <li>icon：对话框提示图标，有success，error，info，question可选</li>
          <li>cancelText：设置取消按钮文字</li>
          <li>okText：设置确认按钮文字</li>
        </ul>
      </div>
      <div class="small-title">事件</div>
       <div class="desc">
        <ul class="desc-ul">
          <li>cancel：取消按钮的回调</li>
          <li>ok：点击确定回调</li>
        </ul>
      </div>
      <div class="small-title">基础组件dialog.vue</div>
      <div class="desc">说明：在dialog组件最外层div上设置@click.stop是为了防止事件冒泡触发上层点击事件。
        用require引入图片，否则在编译后是找不到图片的。</div>
      <pre v-highlightjs="DialogCode" class="code"><code class="html"></code></pre>
      <div class="small-title">应用组件dialog-apply.vue</div>
      <pre v-highlightjs="DialogApplyCode" class="code "><code class="html"></code></pre>
  </div>
</template>

<script type='text/ecmascript-6'>
import DialogCode from '!!raw-loader!../base/dialog'
import DialogApplyCode from '!!raw-loader!../components/dialog-apply'
import DialogApply from 'components/dialog-apply'
export default {
  data () {
    return {
      DialogCode,
      DialogApplyCode
    }
  },
  components: {
    DialogApply
  }
}
</script>

<style>

</style>
