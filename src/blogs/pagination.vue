<template>
	<div>
		<div class="title">Pagination 分页器</div>
		<div class="desc">今天来实现一个基础的 <span class="highlight">Pagination 分页器组件</span>~</div>
		<div class="small-title">需求</div>
		<div class="desc">
			<ul class="desc-ul">
				<li>能够根据外部传入的total(数据总数)，以每页10条数据变化页面总数。</li>
				<li>页数pages小于8时，显示全部页码。</li>
				<li>页数pages大于7时，自动调整显示的页码，其余页码省略代替。</li>
				<li>页数pages大于7时，页码显示规则为显示当前页（current）+-2个页码以及第一页和最后一页页码。</li>
			</ul>
		</div>
		<div class="small-title">演示</div>
		<PaginationApply></PaginationApply>
		<div class="small-title">实现</div>
		<div class="desc">
			对于html元素，需要【上一页】【页码】【下一页】三个部分。分别用button，ul，button实现。
			<ul class="desc-ul">
				<li>【上一页】需要添加禁用属性preDisable；前往上一页的点击事件goPre；</li>
				<li>【页码】需要判断是否展示页码button还是省略号&#8230;；</li>
				<li>【下一页】需要添加禁用属性nextDisable；前往下一页的点击事件goNext；</li>
			</ul>
		</div>
		<div class="desc">
			对于组件，我们需要用到Vue的props,data,computed,watch,created,methods这些属性或钩子。
			<ul class="desc-ul">
				<li>【props】接收参数数据总数total。</li>
				<li>【data】定义当前页current，每页显示数据pageSize，页码列表pages，页码长度pageLength。</li>
				<li>【computed】用于计算是否禁用上一页preDisable或下一页按钮nextDisable。</li>
				<li>【watch】监听数据总数total的改变在计算页码列表getPagesLength();监听当前页current改变，向父组件传递参数当前页。</li>
				<li>【created】初始化计算页码列表getPagesLength()。</li>
				<li>【methods】计算页码列表getPagesLength()；点击页码jumpToPage (index)；上一页goPre ()；下一页goNext ()；页码是否被省略isShowBtn (index)；是否显示省略号isShowEllipsis (index)。</li>
			</ul>
		</div>
		<div class="small-title">基础组件pagination.vue</div>
		<pre v-highlightjs="PaginationCode" class="code"><code class="html"></code></pre>
		<div class="small-title">应用组件pagination-apply.vue</div>
		<pre v-highlightjs="PaginationApplyCode" class="code"><code class="html"></code></pre>
		<div class="small-title">优化</div>
		<div class="desc">
			<ul class="desc-ul">
				<li>我们可以设置鼠标覆盖时显示手指图标cursor pointer，禁用时显示红色圆圈斜线表示禁用cursor not-allowed。</li>
				<li>使用user-select none来禁止用户选中按钮中的文字，优化体验~</li>
			</ul>
		</div>
	</div>
</template>

<script type='text/ecmascript-6'>
import PaginationCode from '!!raw-loader!../base/pagination'
import PaginationApplyCode from '!!raw-loader!../components/pagination-apply'
import PaginationApply from 'components/pagination-apply'
export default {
  data () {
    return {
      total: 200,
      current: 1,
      PaginationCode,
      PaginationApplyCode
    }
  },
  methods: {
    changePagination (current) {
      this.current = current
    }
  },
  components: {
    PaginationApply
  }
}
</script>

<style>

</style>
