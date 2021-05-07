<template>
  <div v-tooltip:提示内容为XXX>提示2</div>
</template>

<script>
import Vue from 'vue/dist/vue.esm.js'
export default {
  data () {
    return {
      tootipParams: {
        placement: 'top',
        effect: 'light',
      }
    }
  },
  created () {
    Vue.directive('tooltip', {
      bind: function (el, binding) {
        if (el.hasIcon) return
        const structureIcon = (content, attrs) => {
          // 拼接绑定属性
          let attrStr = ''
          for (let key in attrs) {
            attrStr += `${key}=${attrs[key]} `
          }
          const a = `<el-tooltip content=${content} ${attrStr}><i class="el-icon-question" style="margin:0 10px"></i></el-tooltip>`
          // 创建构造器
          const tooltip = Vue.extend({
            template: a
          })
          // 创建一个 tooltip 实例并返回 dom 节点
          const component = new tooltip().$mount()
          return component.$el
        }
        const iconElement = structureIcon(binding.arg, binding.value)
        el.appendChild(iconElement)
        el.hasIcon = true
      }
    })
  }
}
</script>

<style scoped lang="less">
</style>
