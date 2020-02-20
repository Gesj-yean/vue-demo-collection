<template>
  <div class="slider-wrapper">
    <Slider v-if="showSlider"> <!-- showSlider使得数据请求完成后再显示，否则better-scroll可能会计算错误 -->
      <div v-for="item in imageList" :key="item" class="slider-item">
        <img :src="item" class="img">
      </div>
    </Slider>
  </div>
</template>

<script type='text/ecmascript-6'>
import Slider from 'base/slider'
export default {
  data () {
    return {
      imageList: [], // 图片列表
      showSlider: false // 显示slider标志位
    }
  },
  created () {
    this.getImages() // 获取数据
  },
  methods: {
    getImages () {
      this.axios.get('/slider').then((res) => {
        this.imageList = res.data
        this.showSlider = true
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style lang="stylus" scoped>

.slider-wrapper
  margin 0 auto
  height 200px  // 固定轮播图显示高度
  width 500px   // 固定轮播图显示宽度，可设置百分比
  background #000
  border-radius 5px
  .slider-item
    float left // 元素向左浮动
    width 100%
    overflow hidden
    text-align center
  .img
    height 200px
    width 100%

</style>
