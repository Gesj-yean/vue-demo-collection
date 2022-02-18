(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{718:function(t,e,n){"use strict";n.r(e);var s=n(58),i=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"移动端轮播图组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#移动端轮播图组件"}},[t._v("#")]),t._v(" 移动端轮播图组件")]),t._v(" "),n("h2",{attrs:{id:"起步"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#起步"}},[t._v("#")]),t._v(" 起步")]),t._v(" "),n("p",[t._v("上一次基于better-scroll实现了移动端纵向滚动的演示。这一次继续利用它实现一个横向滚动——轮播图组件。演示如下：")]),t._v(" "),n("p",[t._v("首先来整理一下需求：")]),t._v(" "),n("ul",[n("li",[t._v("能够根据异步请求到的图片数据进行轮播图展示。")]),t._v(" "),n("li",[t._v("能够控制它是否自动播放，是否循环播放，自动播放间隔。")]),t._v(" "),n("li",[t._v("能够提示当前播放页。")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200221094146763.gif",alt:"在这里插入图片描述"}})]),t._v(" "),n("h2",{attrs:{id:"mock数据"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#mock数据"}},[t._v("#")]),t._v(" Mock数据")]),t._v(" "),n("p",[t._v("由于是一个demo，从网上找了几张图片写成json格式，数据用于模拟接口数据。这里用到了mock.js。Axios。安装方法如下：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("npm install mockjs\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("npm install --save axios vue-axios\n")])])]),n("p",[t._v("axios使用方法不多赘述，简述一下mock数据。在mock文件夹下新建json文件夹放置json数据文件。新建index.js导出接口。就可以使用axios请求接口了。")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('[\n\t"https://img3.mukewang.com/szimg/5df8852609e0762d12000676-360-202.png",\n    "https://img1.mukewang.com/szimg/5d9c62fb0907ccf012000676-360-202.png",\n    "https://img3.mukewang.com/5aeecb1d0001e5ea06000338-360-202.jpg"\n]\n')])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("const Mock = require('mockjs')\n\nMock.mock('/slider', 'get', require('./json/slider.json'))\n")])])]),n("h2",{attrs:{id:"基础组件-slider-vue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基础组件-slider-vue"}},[t._v("#")]),t._v(" 基础组件：slider.vue")]),t._v(" "),n("p",[t._v("将轮播图组件抽象出来，接收isLoop、isAutoPlay、interval属性控制轮播图。从mounted方法调用顺序可以知道思路是")]),t._v(" "),n("ul",[n("li",[t._v("setSliderWidth()中先获取再设置显示层和图片包裹层高度。")]),t._v(" "),n("li",[t._v("initDots()根据图片包裹层子元素的个数设置数组放置圆点。")]),t._v(" "),n("li",[t._v("initSlider()初始化better-scroll。")]),t._v(" "),n("li",[t._v("autoPlay()设置自动播放。")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<template>\n  <div class="slider-apply" ref="slider">  \x3c!-- 显示层 --\x3e\n    <div class="slider-group" ref="group"> \x3c!-- 所有图片包裹层 --\x3e\n      <slot></slot>                        \x3c!-- 插槽显示图片内容 --\x3e\n    </div>\n    <div class="dots">                     \x3c!-- 提示圆点 --\x3e\n      <div class="dot" v-for="(item, index) in dots" :key="index" :class="currentIndex===index?\'active\':\'\'"></div>\n    </div>\n  </div>\n</template>\n\n<script type=\'text/ecmascript-6\'>\nimport BScroll from \'better-scroll\'\nexport default {\n  data () {\n    return {\n      dots: [],\n      currentIndex: 0 /* 当前页下标 */\n    }\n  },\n  props: {\n    isLoop: { /* 循环播放 */\n      type: Boolean,\n      default: true\n    },\n    isAutoPlay: { /* 自动播放 */\n      type: Boolean,\n      default: true\n    },\n    interval: { /* 播放间隔 */\n      type: Number,\n      default: 2000\n    }\n  },\n  mounted () { /* mounted阶段dom渲染完，20ms确保刷新 */\n    setTimeout(() => {\n      this.setSliderWidth()\n      this.initDots()\n      this.initSlider()\n      if (this.isAutoPlay) {\n        this.autoPlay()\n      }\n    }, 20)\n  },\n  methods: {\n    setSliderWidth () { /* 获取显示层宽度，计算内容层宽度 */\n      const clientWidth = this.$refs.slider.clientWidth\n      let sliderWidth = 0\n      this.children = this.$refs.group.children\n      for (let i = 0; i < this.children.length; i++) {\n        this.children[i].style.width = clientWidth + \'px\'\n        sliderWidth += clientWidth\n      }\n      if (this.isLoop) { /* 循环播放需要增加前后两个宽度 */\n        sliderWidth += clientWidth * 2\n      }\n      this.$refs.group.style.width = sliderWidth + \'px\' /* 设置内容层宽度 */\n    },\n    initDots () {\n      this.dots = new Array(this.children.length)\n    },\n    initSlider () {\n      this.slider = new BScroll(this.$refs.slider, {\n        scrollX: true, /* 横向滚动 */\n        scrollY: false,\n        snap: { /* 循环滚动设置 */\n          loop: this.isLoop,\n          threshold: 0.3,\n          speed: 400\n        }\n      })\n      this.slider.on(\'scrollEnd\', () => {\n        const pageIndex = this.slider.getCurrentPage().pageX /* 获取当前轮播页，用于圆点提示 */\n        this.currentIndex = pageIndex\n        if (this.isAutoPlay) {\n          clearTimeout(this.timer) /* 重新设置自动播放，否则无法自动播放 */\n          this.autoPlay()\n        }\n      })\n    },\n    autoPlay () {\n      this.timer = setTimeout(() => {\n        this.slider.next(400)\n      }, this.interval)\n    }\n  },\n  destroyed () { /* 确保清除定时器 */\n    clearTimeout(this.timer)\n  }\n}\n<\/script>\n\n<style lang="stylus" scoped>\n.slider-apply\n  position relative             // 让dots找准位置\n  height 200px\n  width 100%                    // slider-apply会依据父元素宽度显示宽度\n  overflow hidden               //  超出元素隐藏\n  border-radius 5px\n  .dots\n    position absolute\n    bottom 10px\n    left 50%\n    transform translate(-50%, 0) // 居中\n    display flex\n    .dot\n      margin 0 10px\n      height 7px\n      width 7px\n      background #fff\n      border-radius 50%\n    .active                     // 当前dot样式\n      width 15px\n      border-radius 50% 5px\n</style>\n\n')])])]),n("h2",{attrs:{id:"应用组件-slider-apply-vue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#应用组件-slider-apply-vue"}},[t._v("#")]),t._v(" 应用组件：slider-apply.vue")]),t._v(" "),n("p",[t._v("可以根据alider-apply.vue中的使用方法应用在自己的项目中。")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('<template>\n  <div class="slider-wrapper">\n    <Slider v-if="showSlider"> \x3c!-- showSlider使得数据请求完成后再显示，否则better-scroll可能会计算错误 --\x3e\n      <div v-for="item in imageList" :key="item" class="slider-item">\n        <img :src="item" class="img">\n      </div>\n    </Slider>\n  </div>\n</template>\n\n<script type=\'text/ecmascript-6\'>\nimport Slider from \'base/slider\'\nexport default {\n  data () {\n    return {\n      imageList: [], // 图片列表\n      showSlider: false // 显示slider标志位\n    }\n  },\n  created () {\n    this.getImages() // 获取数据\n  },\n  methods: {\n    getImages () {\n      this.axios.get(\'/slider\').then((res) => {\n        this.imageList = res.data\n        this.showSlider = true\n      }).catch((err) => {\n        console.log(err)\n      })\n    }\n  },\n  components: {\n    Slider\n  }\n}\n<\/script>\n\n<style lang="stylus" scoped>\n\n.slider-wrapper\n  margin 0 auto\n  height 200px  // 固定轮播图显示高度\n  width 500px   // 固定轮播图显示宽度，可设置百分比\n  background #000\n  border-radius 5px\n  .slider-item\n    float left // 元素向左浮动\n    width 100%\n    overflow hidden\n    text-align center\n  .img\n    height 200px\n    width 100%\n\n</style>\n\n')])])]),n("p",[n("strong",[t._v("如果以上步骤没有看明白的话，可以在我的github中找到源码https://github.com/Gesj-yean/vue-demo-collection。")])])])}),[],!1,null,null,null);e.default=i.exports}}]);