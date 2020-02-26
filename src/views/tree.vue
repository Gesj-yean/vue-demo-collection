<template>
  <div>
    <div class="title">Tree 树形控件</div>
    <div class="desc">思考了两天时间，准备仿照ant-design-vue实现一个基于vue的树形控件。主要用到了vue递归组件思想、input的CheckBox类型输入框的使用。</div>
    <div class="small-title">需求</div>
    <div class="desc">
      <ul class="desc-ul">
        <li>能够将传入的Json数据生成树形目录。</li>
        <li>能够初始化选中节点。</li>
        <li>能够手动选中节点，最终可将所有选中节点打印出来。</li>
        <li>能够在初始化禁用节点。</li>
        <li>能够折叠树形目录。</li>
        <li>修改原生CheckBox样式。</li>
      </ul>
    </div>
    <div class="small-title">演示</div>
    <div class="desc">做好的树形控件如下所示，点击获取选中节点key将弹出所有选中的节点：</div>
    <TreeApply></TreeApply>
    <div class="small-title">了解Vue递归组件</div>
    <div class="desc">在vue的文档（https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6）中说明组件是可以在它们自己的模板中调用自身的。但是他需要两个条件：
      <ul class="desc-il">
        <li>组件有name属性</li>
        <li>递归调用需要有条件</li>
      </ul>
      根据以上说明创建了基础树形控件tree.vue:
    </div>
    <div class="small-title">全局变量：global.js</div>
    <div class="desc">在写组件获取节点内容是发现由于是递归组件，并不好拿到每级选中的节点。因此在这里创建global.js全局变量记录所有选中节点。也便于删除和加入节点。
默认选中的节点如下：</div>
    <pre v-highlightjs class="code"><code class="html">const nodes = ['1', '1-1', '1-1-2', '1-2-2']
      export default {
        nodes
      }</code></pre>
    <div class="desc">写好后需要在main.js上挂载。</div>
    <pre v-highlightjs class="code"><code class="html">import global from 'common/js/global'

    Vue.prototype.$global = global
    </code></pre>
    <div class="small-title">基础组件（递归组件）：tree.vue</div>
    <div class="desc">说明：这里不需要再用components属性去声明自己了，有了name属性后直接在template中就可以调用名为name值的组件。</div>
    <pre v-highlightjs="TreeCode" class="code"><code class="html"></code></pre>
    <div class="small-title">应用组件 tree-apply.vue</div>
    <pre v-highlightjs="TreeApplyCode" class="code"><code class="html"></code></pre>
    <div class="small-title">mock数据tree.json</div>
    <div class="desc">这里采用了模拟数据的方法，mock的具体使用方法在我上一篇写的《better-scroll实现轮播图组件》中有提到：https://blog.csdn.net/qq_39083496/article/details/104259280
      <ul class="desc-ul">
        <li>是否禁用CheckBox是根据 “disabled”: “true”,决定的。</li>
        <li>title（必须）是显示的label名。</li>
        <li>key（必须）才是真正的关键字，理解为最后提交时的必要字段。</li>
      </ul>
    </div>
    <pre v-highlightjs class="code"><code class="html">[{
    "title": "1",
    "key": "1",
    "children": [
        {
            "title": "1-1",
            "key": "1-1",
            "children": [
                { "title": "1-1-1", "key": "1-1-1" },
                { "title": "1-1-2", "key": "1-1-2" },
                { "title": "1-1-3", "key": "1-1-3" }
            ]
        },
        {
            "title": "1-2",
            "key": "1-2",
            "children": [
                { "title": "1-2-1", "key": "1-2-1" },
                { "title": "1-2-2", "key": "1-2-2" },
                { "title": "1-2-3", "key": "1-2-3" }
            ]
        },
        {
            "title": "1-3",
            "key": "1-3"
        }
    ]
  },
  {
    "title": "2",
    "key": "2",
    "disabled": "true",
    "children": [
        { "title": "2-1", "key": "2-1" },
        { "title": "2-2", "key": "2-2" },
        { "title": "2-3", "key": "2-3" }
    ]
  },
  {
    "title": "3",
    "key": "3"
  }]
    </code></pre>
    <div class="small-title">总结</div>
    <div class="desc">到此就完成了树形控件的生成，需求部分都已经满足。如果通过以上代码片段不能明白的话，可以在我的github上找到源码。欢迎来访，欢迎Star~
https://github.com/Gesj-yean/vue-demo-collection</div>
  </div>
</template>

<script type="text/ecmascript-6">
import TreeCode from '!!raw-loader!../base/tree'
import TreeApplyCode from '!!raw-loader!../components/tree-apply'
import TreeApply from 'components/tree-apply'
export default {
  data () {
    return {
      TreeCode,
      TreeApplyCode
    }
  },
  components: {
    TreeApply
  }
}
</script>

<style scoped lang="stylus">

</style>
