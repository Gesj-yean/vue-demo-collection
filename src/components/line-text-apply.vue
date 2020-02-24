<template>
   <div>
     <LineText :content="content"></LineText>
   </div>
</template>

<script type='text/ecmascript-6'>
import LineText from 'base/line-text'
export default {
  data () {
    return {
      content: '未完待续'
    }
  },
  components: {
    LineText
  }
}
</script>

<style>

</style>
