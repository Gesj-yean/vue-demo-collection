<template>
  <div>
    <div class="title">flex实现中间文字，两边横线（1px）</div>
    <div class="desc">学习了实现1px边框的实现方法。迫不及待的想要记录一下。顺便利用<span class="highlight">flex布局+1px边框实现一个</span>
      简单的中间文字，两边横线的组件。
    </div>
    <div class="small-title">演示</div>
    <div class="desc">首先来看组件的需求：
      <ul class="desc-ul">
        <li>左右两边的横线在移动端显示为1px。</li>
        <li>中间内容部分可以随意传入文字内容。</li>
        <li>同时不论文字的多少，两边的横线会随着内容增大而减小，直到内容占据的最大宽度为40%。</li>
      </ul>
    </div>
    <LineTextApply></LineTextApply>
    <div class="desc">根据以上需求，我们来制定步骤。</div>
    <div class="small-title">1px边框实现</div>
    <div class="small-title">mixin.styl</div>
    <div class="desc">首先在mixin.styl中定义一个方法border-1px。此时宽度在drp为1.5的设备下显示的是1.5px。
      在dpr为2的设备下显示的是2px。接下来要在base.styl中设置缩放才能真正实现1px。
    </div>
    <pre v-highlightjs="MixinCode" class="code"><code class="css"></code></pre>
    <div class="small-title">base.styl</div>
    <div class="desc">在base.styl下，查询设备dpr。再乘以缩放倍数使其达到1px的效果。</div>
    <pre v-highlightjs class="code"><code class="css">@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
    .border-1px
        &::after
            -webkit-transform scaleY (0.7)
            transform scaleY(0.7)
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
    .border-1px
        &::after
            -webkit-transform scaleY (0.5)
            transform scaleY(0.5)</code></pre>
    <div class="small-title">基础组件：line-text.vue</div>
    <div class="desc">这里利用了flex布局的<span class="highlight">flex-shrink属性</span>，当flex-shrink为1表示能够被压缩，所以设置横线部分的该属性为1，
      同理，内容层应该被撑起宽度，直到40%。</div>
    <pre v-highlightjs="LineTextCode" class="code"><code class="html"></code></pre>
    <div class="small-title">应用组件：line-text-apply.vue</div>
    <div class="desc">示例如何将该组件放入应用组件中，传入的内容将被显示：</div>
    <pre v-highlightjs="LineTextApplyCode" class="code"><code class="html"></code></pre>
  </div>
</template>

<script type='text/ecmascript-6'>
import LineTextApply from 'components/line-text-apply'
import MixinCode from '!!raw-loader!../common/stylus/mixin.styl'
import LineTextCode from '!!raw-loader!../base/line-text'
import LineTextApplyCode from '!!raw-loader!../components/line-text-apply'
export default {
  data () {
    return {
      MixinCode,
      LineTextCode,
      LineTextApplyCode
    }
  },
  components: {
    LineTextApply
  }
}
</script>

<style>

</style>
