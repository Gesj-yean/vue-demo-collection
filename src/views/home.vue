<template>
	<div class="home-wrapper">
		<ul class="list-wrapper">
			<li v-for="(item,index) in demoList" :key="index" class="list-item">
				<router-link :to="item.path" class="link" @click="goPath(item.path)">{{item.meta.title}}</router-link>
			</li>
		</ul>
		<div class="content-wrapper">
			<img src="../common/images/arrow-left.png" class="arrow arrow-left" @click="goPrePath">
			<div class="content">
				<router-view ></router-view>
			</div>
			<img src="../common/images/arrow-right.png" class="arrow arrow-right" @click="goNextPath">
		</div>
	</div>
</template>

<script type='text/ecmascript-6'>
import routes from '../router/index'
const demoList = routes.options.routes[0].children
export default {
  data () {
    return {
      demoList,
      currentPath: ''
    }
  },
  created () {
    this.currentPath = window.location.pathname
  },
  methods: {
    goPath (link) {
      this.currentPath = link
    },
    goNextPath () {
      const index = this.findPathIndex()
      if (index === this.demoList.length - 1) {
        return
      }
      const link = this.demoList[index + 1].link
      this.currentPath = link
      this.$router.push(link)
    },
    goPrePath () {
      const index = this.findPathIndex()
      if (index === 0) {
        return
      }
      const link = this.demoList[index - 1].link
      this.currentPath = link
      this.$router.push(link)
    },
    findPathIndex () {
      return this.demoList.findIndex((item) => {
        return item.link === this.currentPath
      })
    }
  }
}
</script>

<style lang="stylus">
.home-wrapper
	height 100%
	width 100%
	display flex
	.list-wrapper
		min-height 100vh
		width 300px
		border-right 1px solid #ddd
		box-shadow 0 0 5px #ddd
		.list-item
			padding 10px 15px
			font-weight bold
			letter-spacing 0px
			.link
				color #7f8c8d
				font-size 15px
				text-decoration none
	.content-wrapper
		flex 1
		.content
			margin 0 auto 45px
			width 70%
			height 100%
		.arrow
			height 50px
			width 50px
			border-radius 50%
			box-shadow 0 0 5px #cccccc
		.arrow-left
			position fixed
			top 50%
			left 320px
		.arrow-right
			position fixed
			top 50%
			right 20px
</style>
