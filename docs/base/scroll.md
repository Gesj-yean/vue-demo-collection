# 移动端 scroll 组件

学习了黄轶老师的课程后，想要对better-scroll的应用进行总结。better-scroll是常用的移动端解决滚动需求的插件。 今天就利用它实现一个scroll的基础组件，可以解决获取滑动的实时位置、上拉加载、下拉刷新等功能。抽象出来的scroll组件以后可以用个各个项目中，功能可以根据better-scroll继续完善下去。
 1. 在src/base/scroll.vue
 

```
<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
	props: {
		data: {   // data是scroll需要滚动的数据，data改变时需要触发refresh()刷新
			type: Array,
			default: null
		},
		probeType: { // 有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
			type: Number,
			default: 1
		},
		click: { // false会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
			type: Boolean,
			default: true
		},
		getScrollPos:{ // 决定是否开启获得滚动的实时坐标
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
	mounted() { // 等dom结构渲染完成后再初始化scroll组件
		setTimeout(() => {
			this._initScroll()
		}, 20)
	},
	methods: {
		_initScroll() {
			if(!this.$refs.wrapper) {
				return
			}
			this.scroll = new BScroll(this.$ref.wrapper, {
				probeType: this.probeType,
				click: this.click
			})
			if(this.getScrollPos) {
				this.scroll.on('scroll', (pos) => {
					this.$emit('scroll', pos) // 暴露出实时滚动的位置{Object} {x, y}
				})
			}
			if(this.pullingDown) {
				this.scroll.on('pullingDown', () => {
					this.$emit('pullingDown') // 暴露出下拉刷新动作
				})
			}
			if(this.pullingUp) {
				this.scroll.on('pullingUp', () => {
					this.$emit('pullingUp') // 暴露出上拉加载动作
				})
			}
		},
		refresh() { // 刷新scroll
			this.scroll && this.scroll.refresh()
		},
		scrollTo() { // 滚动到指定位置
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
		},
		scrollToElement() { // 滚动到列表指定元素
			this.scroll && this.scroll.scrollToElement(this.scroll, arguments)
		},
	}
}
</script>
```
2. 在应用组件中使用：

```
<template>
	<Scroll :data="list" @scroll="scroll" @pullingDown="pullingDown" @pullingUp="pullingUp">
		<ul>
			<li v-for="(item, index) in list" :key="index">
				<div style="font-size: 20px">{{index}}。{{item}}</div>
			</li>
		</ul>
	</Scroll>
</template>
<script>
import Scroll from '@/base/scroll'
export default {
	data() {
		return {
			item: "data是scroll需要滚动的数据，data改变时需要触发refresh()刷新",
			list: []
		}
	},
	created() {
		for(let i = 0; i<20; i++) {
			this.list.push(this.item)
		}
	},
	methods: {
		scroll(pos) {
			console.log(pos.x, pos.y)
		},
		pullingDown() {
			this.list = []
			for(leti = 0; i<20; i++) {
				this.list.push(this.item)
			}
		},
		pullingUp() {
			for(leti = 0; i<10; i++) {
				this.list.push(this.item)
			}
		}
	},
	components: {
		Scroll
	}
}
</script>
```
这篇文章转载于黄轶老师的，https://zhuanlan.zhihu.com/p/27407024


**[如果想要demo的话，请前往我的github获取源码。](https://github.com/Gesj-yean/vue-demo-collection)**

https://github.com/Gesj-yean/vue-demo-collection 记录了更多优秀插件的使用方法。有时间的同学请看我的置顶博客，可太感谢啦。
