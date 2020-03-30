<!-- @description: 面包屑组件 -->
<template>
  <ul class="breadcrumb-wrapper">
    <li v-for="(item) in list" :key="item.path">
			<router-link :to="item.path">{{item.name}}</router-link>
		</li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      isShake: false
    }
  },
  created () {
    console.log(this.$route)
    console.log(this.$router)
    this.getPath()
  },
  methods: {
    getPath () {
      const current = this.$router.currentRoute.matched
      for (const item of current) {
        const temp = {}
        temp.name = item.meta.title
        temp.path = item.path !== '' ? item.path : '/'
        this.list.push(temp)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.breadcrumb-wrapper
	display flex
	flex-wrap wrap
	height 60px
	line-height 60px
	li
		color #666
		font-size 15px
		&:not(:last-child) :after
			content '>'
			margin 0 10px
			color #ccc
		&:last-child
			font-weight bold
			color #000
a
	text-decoration none
a:visited
	color #666
a:hover
	color #1296db
</style>
