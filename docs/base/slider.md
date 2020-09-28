# 移动端轮播图组件
## 起步
上一次基于better-scroll实现了移动端纵向滚动的演示。这一次继续利用它实现一个横向滚动——轮播图组件。演示如下：

首先来整理一下需求：

 - 能够根据异步请求到的图片数据进行轮播图展示。
 - 能够控制它是否自动播放，是否循环播放，自动播放间隔。
 - 能够提示当前播放页。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200221094146763.gif)
## Mock数据
由于是一个demo，从网上找了几张图片写成json格式，数据用于模拟接口数据。这里用到了mock.js。Axios。安装方法如下：

```
npm install mockjs
```

```
npm install --save axios vue-axios
```
axios使用方法不多赘述，简述一下mock数据。在mock文件夹下新建json文件夹放置json数据文件。新建index.js导出接口。就可以使用axios请求接口了。

```
[
	"https://img3.mukewang.com/szimg/5df8852609e0762d12000676-360-202.png",
    "https://img1.mukewang.com/szimg/5d9c62fb0907ccf012000676-360-202.png",
    "https://img3.mukewang.com/5aeecb1d0001e5ea06000338-360-202.jpg"
]
```

```
const Mock = require('mockjs')

Mock.mock('/slider', 'get', require('./json/slider.json'))
```
## 基础组件：slider.vue
将轮播图组件抽象出来，接收isLoop、isAutoPlay、interval属性控制轮播图。从mounted方法调用顺序可以知道思路是

 - setSliderWidth()中先获取再设置显示层和图片包裹层高度。
 - initDots()根据图片包裹层子元素的个数设置数组放置圆点。
 - initSlider()初始化better-scroll。
 - autoPlay()设置自动播放。


```
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

```

## 应用组件：slider-apply.vue
可以根据alider-apply.vue中的使用方法应用在自己的项目中。
```
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

```
**如果以上步骤没有看明白的话，可以在我的github中找到源码https://github.com/Gesj-yean/vue-demo-collection。**