# 指令

## 注册指令

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

## 使用

```js
<div v-指令名称 />
```