# 指令
这里是一个 Vue2 的指令合集，详细的指令移步下面具体的指令文章，现在我们在这里要介绍如何在项目中统一管理和使用这些指令。
## 注册指令

### 单文件引入注册

```js
import Vue from 'vue'
import ellipsis from './ellipsis'
// import other directives

const directives = {
  ellipsis
  // other directives
}

Object.keys(directives).forEach(name => Vue.directive(name, directives[name]))
```
### 全局注册
使用 `Vue.deirect` 注册。
```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
## 使用

```js
<div v-指令名称 />
```