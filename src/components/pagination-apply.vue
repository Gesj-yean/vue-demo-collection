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
