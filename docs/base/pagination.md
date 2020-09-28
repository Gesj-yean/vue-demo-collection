# 分页器组件

今天来实现一个基础的 Pagination 分页器组件~
## 需求
- 能够根据外部传入的total(数据总数)，以每页10条数据变化页面总数。
- 页数pages小于8时，显示全部页码。
- 页数pages大于7时，自动调整显示的页码，其余页码省略代替。
- 页数pages大于7时，页码显示规则为显示当前页（current）+-2个页码以及第一页和最后一页页码。

## 演示
不知道为啥录屏的时候不能录入鼠标的状态= =，否则会显示红色圆圈禁用和手指覆盖的图标= =

![](https://user-gold-cdn.xitu.io/2020/3/11/170c7b446fcfe2cc?w=471&h=141&f=gif&s=10588)
## 实现
对于html元素，需要【上一页】【页码】【下一页】三个部分。分别用button，ul，button实现。
- 【上一页】需要添加禁用属性preDisable；前往上一页的点击事件goPre；
- 【页码】需要判断是否展示页码button还是省略号…；
- 【下一页】需要添加禁用属性nextDisable；前往下一页的点击事件goNext；

对于组件，我们需要用到Vue的props,data,computed,watch,created,methods这些属性或钩子。
- 【props】接收参数数据总数total。
- 【data】定义当前页current，每页显示数据pageSize，页码列表pages，页码长度pageLength。
- 【computed】用于计算是否禁用上一页preDisable或下一页按钮nextDisable。
- 【watch】监听数据总数total的改变在计算页码列表getPagesLength();监听当前页current改变，向父组件传递参数当前页。
- 【created】初始化计算页码列表getPagesLength()。
- 【methods】计算页码列表getPagesLength()；点击页码jumpToPage (index)；上一页goPre ()；下一页goNext ()；页码是否被省略isShowBtn (index)；是否显示省略号isShowEllipsis (index)。

## 基础组件pagination.vue
```
<template>
  <div class="pagination-wrapper">
    <button :disabled="preDisable" @click="goPre">&#60;</button> <!--上一页按钮-->
    <ul>                                                         <!--页码列表-->
      <li v-for="index in pages" :key="index"  ref="pages">
        <button @click="jumpToPage(index)" v-if="isShowBtn(index)" :class="current===index?'active':''">{{index}}</button>
        <div v-else-if="isShowEllipsis (index)" class="ellipsis">&#8230;</div> <!--省略号-->
      </li>
    </ul>
    <button :disabled="nextDisable" @click="goNext">&#62;</button> <!--上一页按钮-->
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    total: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      current: 1, // 定义当前页current
      pageSize: 10, // 每页显示数据pageSize
      pages: [], // 页码列表pages
      pageLength: 0 // 页码长度pageLength
    }
  },
  computed: {
    preDisable () { // 是否禁用上一页
      return this.current === 1
    },
    nextDisable () { // 是否禁用下一页
      return this.current === this.pageLength
    }
  },
  watch: {
    total (val) { // 监听数据总数total的改变在计算页码列表getPagesLength()
      this.getPagesLength()
    },
    current (val) { // 监听当前页current改变，向父组件传递参数当前页
      this.$emit('change', val)
    }
  },
  created () { // 初始化计算页码列表getPagesLength()
    this.getPagesLength()
  },
  methods: {
    getPagesLength () { // 计算页码列表
      const more = this.total % this.pageSize ? 1 : 0
      this.pageLength = this.total / this.pageSize + more
      this.pages = new Array(this.pageLength)
      for (let i = 0; i < this.pageLength; i++) {
        this.pages[i] = i + 1
      }
    },
    jumpToPage (index) { // 点击页码
      this.current = index
    },
    goPre () { // 上一页
      this.current -= this.current === 1 ? 0 : 1
    },
    goNext () { // 下一页
      this.current += this.current === this.pageLength ? 0 : 1
    },
    isShowBtn (index) { // 页码是否被省略
      if (this.pageLength < 8) {
        return true
      } else {
        if (index === 1 || index === this.pageLength) {
          return true
        } else {
          if (this.current < 4 && index < 6) {
            return true
          } else if (this.current > this.pageLength - 4 && index > this.pageLength - 6) {
            return true
          } else if (index < this.current + 3 && index > this.current - 3) {
            return true
          } else {
            return false
          }
        }
      }
    },
    isShowEllipsis (index) { // 是否显示省略号
      return index === 2 || index === this.pageLength - 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
	width 100%
	margin 10px
	display flex
	ul
		display flex
		.active
			border solid 1px #1296db
		.ellipsis
			font-weight bold
			color #999
			line-height 24px
	button
		height 30px
		width 30px
		margin 0 5px
		border-radius 3px
		border solid 1px #ccc
		color #777
		font-weight bold
		background #fff
		overflow hidden
		user-select none
		&:hover
			border solid 1px #1296db
			cursor pointer
		&:disabled
			border solid 1px #ccc
			color #ccc
			cursor not-allowed
</style>

```
## 应用组件pagination-apply.vue
```
<template>
	<div>
		<Pagination :total="total" @change="changePagination"></Pagination>
		<div class="desc">当前页： {{current}}</div>
	</div>
</template>

<script type='text/ecmascript-6'>
import Pagination from 'base/pagination'
export default {
  data () {
    return {
      total: 200, // 必传传递参数total
      current: 1
    }
  },
  methods: {
    changePagination (current) {
      this.current = current
    }
  },
  components: {
    Pagination
  }
}
</script>
```

## 优化
- 我们可以设置鼠标覆盖时显示手指图标cursor pointer，禁用时显示红色圆圈斜线表示禁用cursor not-allowed。
- 使用user-select none来禁止用户选中按钮中的文字，优化体验。

## 更多推荐
- [实现基于Vue的Dialog对话框组件](https://juejin.im/post/1)
- [利用better-scroll实现Vue轮播图组件](https://juejin.im/post/6844904083124404232)
- [理解Vue递归组件，实现Tree树形控件实例~](https://juejin.im/post/6844904081610260488)