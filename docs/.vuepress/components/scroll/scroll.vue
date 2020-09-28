<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    data: { // data是scroll需要滚动的数据，data改变时需要触发refresh()刷新
      type: Array,
      default: null
    },
    probeType: {
      // 1:非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      // 2:在屏幕滑动的过程中实时的派发 scroll 事件；
      // 3:滑动的过程中&&momentum 滚动动画运行过程中实时派发 scroll 事件。
      type: Number,
      default: 2
    },
    click: { // false会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
      type: Boolean,
      default: true
    },
    getScrollPos: { // 决定是否开启获得滚动的实时坐标
      type: Boolean,
      default: false
    },
    pullingDown: { // 是否开启下拉刷新
      type: Boolean,
      default: false
    },
    pullingUp: { // 是否开启上拉加载
      type: Boolean,
      default: false
    }
  },
  mounted () { // 等dom结构渲染完成后再初始化scroll组件
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: {
          threshold: -20
        }
      })
      if (this.getScrollPos) {
        this.scroll.on('scroll', (pos) => {
          // console.log(pos.y)
          this.$emit('scroll', pos) // 暴露出实时滚动的位置{Object} {x, y}
        })
      }
      if (this.pullingDown) {
        const self = this
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            console.log('下拉刷新动作')
            self.$emit('pullingDown') // 暴露出下拉刷新动作
          }
        })
      }
      if (this.pullingUp) {
        const self = this
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            console.log('上拉加载动作')
            self.$emit('pullingUp')
          }
        })
      }
    },
    refresh () { // 刷新scroll
      this.scroll && this.scroll.refresh()
    },
    scrollTo () { // 滚动到指定位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () { // 滚动到列表指定元素
      this.scroll && this.scroll.scrollToElement(this.scroll, arguments)
    }
  }
}
</script>
