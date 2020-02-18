<template>
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
</template>
<script>
import Scroll from 'base/scroll'
export default {
  data () {
    return {
      item: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces.  ',
      list: [],
      getScrollPos: true,
      pullingDown: true,
      pullingUp: true
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
@import '../../common/stylus/base.styl';

  .scroll
    margin 0 auto
    padding 10px
    height 500px
    width 280px
    overflow hidden
    border 2px solid #ddd
    border-radius 10px
</style>
