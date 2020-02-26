<template>
  <div class="tree-wrapper">
    <div class="btn" @click="showNodes">
      点击获取选中节点key
    </div>
    <Tree :list="treeData"></Tree>
  </div>
</template>

<script type='text/ecmascript-6'>
import Tree from 'base/tree'
export default {
  data () {
    return {
      treeData: [] // 全部节点
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('/tree').then((res) => { // 获取mock数据
        this.treeData = res.data
      })
    },
    showNodes () {
      alert(this.$global.nodes)
    }
  },
  components: {
    Tree
  }
}
</script>

<style lang="stylus">
.btn
  margin 20px
  text-align center
</style>
