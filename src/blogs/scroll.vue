<template>
	<div class="scroll-wrapper">
    <div class="title">scroll组件纵向滚动演示</div>
    <p class="desc">基于better-scroll实现的scroll组件，常用于移动端中去除滚动条、上拉加载、下拉刷新操作。
      本文借鉴了黄轶老师的相关文章，进行了代码实现和总结。这个组件的实现基本可以用在移动端请求数据列表并展示中，
      如果后续遇到更加复杂需求，再继续补充~</p>
      <p class="desc">如果遇到坑或者有问题欢迎一起讨论~</p>
    <div class="small-title">scroll实例</div>
    <div class="desc">
      <ul class="desc-ul">
        <li>首次加载10条数据，滑动屏幕，每次上拉加载10条数据，每次下拉刷新重载10条数据。</li>
      </ul>
    </div>
		<Scroll class="scroll"
					ref="scroll"
					:data="list"
					:getScrollPos="getScrollPos"
					:pullingDown="pullingDown"
					:pullingUp="pullingUp"
					@scroll="scroll"
					@pullingDown="_pullingDown"
					@pullingUp="_pullingUp">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div style="font-size: 16px">{{item}}</div>
      </li>
    </ul>
  </Scroll>
  <div class="small-title">基础组件 scroll.vue</div>
  <div class="desc">
    <ul class="desc-ul">
      <li>data是scroll需要滚动的数据，data改变时需要触发scroll的refresh()刷新。</li>
      <li>probeType为1:非实时派发scroll 事件；2:在屏幕滑动的过程中实时的派发 scroll 事件；
        3:滑动的过程中和momentum 滚动动画运行过程中实时派发 scroll 事件。</li>
      <li>当设置为 true，better-scroll 会派发一个 click 事件。</li>
      <li>getScrollPos决定是否开启获得滚动的实时坐标。</li>
      <li>pullingDown决定是否开启下拉刷新。</li>
      <li>pullingUp决定是否开启上拉加载。</li>
    </ul>
  </div>
  <pre v-highlightjs="ScrollCode" class="code"><code class="html"></code></pre>
  <div class="small-title">应用组件 scroll-vertical.vue</div>
  <div class="desc">
    <ul class="desc-ul">
      <li>scroll组件向外暴露了三个方法可以在应用组件获取。</li>
      <li>当设置获取实时位置的getScrollPos为true，可以用scroll方法获取实时滚动位置。</li>
      <li>当设置开启下拉刷新的pullingDown为true，可以用_pullingDown方法获取数据。</li>
      <li>当设置开启上拉加载的pullingUp为true，可以用_pullingUp方法获取数据。</li>
    </ul>
  </div>
  <pre v-highlightjs="ScrollVerticalCode" class="code"><code class="html"></code></pre>
	</div>
</template>
<script>
import Scroll from 'base/scroll'
import ScrollCode from '!!raw-loader!base/scroll'
import ScrollVerticalCode from '!!raw-loader!../components/scroll-apply'
export default {
  data () {
    return {
      item: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.  ',
      list: [],
      getScrollPos: true,
      pullingDown: true,
      pullingUp: true,
      ScrollCode,
      ScrollVerticalCode
    }
  },
  created () {
    for (let i = 0; i < 10; i++) {
      this.list.push(this.item)
    }
  },
  mounted () {
    this.$refs.scroll.refresh()
  },
  methods: {
    scroll (pos) {
      // console.log(pos.x, pos.y)
    },
    _pullingDown () {
      this.list = []
      for (let i = 0; i < 10; i++) {
        this.list.push(this.item)
      }
    },
    _pullingUp () {
      for (let i = 0; i < 10; i++) {
        this.list.push(this.item)
      }
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="stylus" ref="stylesheet/stylus">

  .scroll-wrapper
    height 100%
    width 100%
    .scroll
      margin 0 auto
      padding 10px
      height 500px
      width 280px
      overflow hidden
      border 2px solid #ddd
      border-radius 10px
</style>
