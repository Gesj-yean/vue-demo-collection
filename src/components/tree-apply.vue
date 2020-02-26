<template>
   <div>
       <Tree :list="treeData"></Tree>
   </div>
</template>

<script type='text/ecmascript-6'>
import Tree from 'base/tree'
export default {
  data () {
    return {
      treeData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.axios.get('/tree').then((res) => {
        this.treeData = res.data
      })
    }
  },
  components: {
    Tree
  }
}
</script>

<style>

</style>
