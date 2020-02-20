<template>
   <div>
       <div class="title">Slider 轮播图组件演示</div>
       <div class="small-title">起步</div>
       <div class="desc">上一次基于better-scroll实现了移动端纵向滚动的演示。这一次继续利用它实现一个横向滚动
           ——轮播图组件。演示如下：
       </div>
       <SliderApply></SliderApply>
       <div class="desc">首先来整理一下需求：
           <ul class="desc-ul">
               <li>能够根据异步请求到的图片数据进行轮播图展示。</li>
               <li>能够控制它是否自动播放，是否循环播放，自动播放间隔。</li>
               <li>能够提示当前播放页。</li>
           </ul>
       </div>
       <div class="small-title">Mock数据</div>
       <div class="desc">这里用到了mock.js。Axios。安装方法如下：</div>
        <pre v-highlightjs class="code"><code class="html">npm install mockjs</code></pre>
        <pre v-highlightjs class="code"><code class="html">npm install --save axios vue-axios</code></pre>
        <div class="desc">axios使用方法不多赘述，简述一下mock数据。在mock文件夹下新建json文件夹放置json数据文件。
            新建index.js导出接口。就可以使用axios请求接口了。</div>
        <pre v-highlightjs class="code"><code class="html">const Mock = require('mockjs')

Mock.mock('/slider', 'get', require('./json/slider.json'))</code></pre>
        <div class="small-title">基础组件：slider.vue</div>
        <pre v-highlightjs="Slider" class="code"><code class="html"></code></pre>
        <div class="small-title">应用组件：slider-apply.vue</div>
        <pre v-highlightjs="SliderApplyCode" class="code"><code class="html"></code></pre>
   </div>
</template>

<script type='text/ecmascript-6'>
import Slider from '!!raw-loader!../base/slider'
import SliderApplyCode from '!!raw-loader!../components/slider-apply'
import SliderApply from 'components/slider-apply'
export default {
  data () {
    return {
      Slider,
      SliderApplyCode
    }
  },
  components: {
    SliderApply
  }
}
</script>

<style lang="stylus">

</style>
