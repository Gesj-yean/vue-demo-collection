<template>
  <div class="slider-apply" ref="slider">  <!-- 显示层 -->
    <div class="slider-group" ref="group"> <!-- 所有图片包裹层 -->
      <slot></slot>                        <!-- 插槽显示图片内容 -->
    </div>
    <div class="dots">                     <!-- 提示圆点 -->
      <div class="dot" v-for="(item, index) in dots" :key="index" :class="currentIndex===index?'active':''"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      dots: [],
      currentIndex: 0 /* 当前页下标 */
    }
  },
  props: {
    isLoop: { /* 循环播放 */
      type: Boolean,
      default: true
    },
    isAutoPlay: { /* 自动播放 */
      type: Boolean,
      default: true
    },
    interval: { /* 播放间隔 */
      type: Number,
      default: 2000
    }
  },
  mounted () { /* mounted阶段dom渲染完，20ms确保刷新 */
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
      if (this.isAutoPlay) {
        this.autoPlay()
      }
    }, 20)
  },
  methods: {
    setSliderWidth () { /* 获取显示层宽度，计算内容层宽度 */
      const clientWidth = this.$refs.slider.clientWidth
      let sliderWidth = 0
      this.children = this.$refs.group.children
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].style.width = clientWidth + 'px'
        sliderWidth += clientWidth
      }
      if (this.isLoop) { /* 循环播放需要增加前后两个宽度 */
        sliderWidth += clientWidth * 2
      }
      this.$refs.group.style.width = sliderWidth + 'px' /* 设置内容层宽度 */
    },
    initDots () {
      this.dots = new Array(this.children.length)
    },
    initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, /* 横向滚动 */
        scrollY: false,
        snap: { /* 循环滚动设置 */
          loop: this.isLoop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        const pageIndex = this.slider.getCurrentPage().pageX /* 获取当前轮播页，用于圆点提示 */
        this.currentIndex = pageIndex
        if (this.isAutoPlay) {
          clearTimeout(this.timer) /* 重新设置自动播放，否则无法自动播放 */
          this.autoPlay()
        }
      })
    },
    autoPlay () {
      this.timer = setTimeout(() => {
        this.slider.next(400)
      }, this.interval)
    }
  },
  destroyed () { /* 确保清除定时器 */
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
.slider-apply
  position relative             // 让dots找准位置
  height 200px
  width 100%                    // slider-apply会依据父元素宽度显示宽度
  overflow hidden               //  超出元素隐藏
  border-radius 5px
  .dots
    position absolute
    bottom 10px
    left 50%
    transform translate(-50%, 0) // 居中
    display flex
    .dot
      margin 0 10px
      height 7px
      width 7px
      background #fff
      border-radius 50%
    .active                     // 当前dot样式
      width 15px
      border-radius 50% 5px
</style>
