# 面包屑

## 场景
在我还没有接触`element-UI`、`ant design vue`这类UI组件库的时候，还不知道什么是 **面包屑**。很好奇为什么前端有这么个名词，后来知道原来面包屑常用的场景有后台管理系统、官网目录导航等地方，目的是为了帮用户知道当前所在的页面路径。

## 分析
用`vue`实现一个`breadcrumb`，必须要借助`vue-router`实现。其实我们的思路应该是这样子的：

- 在`router.js`的路由表中写好全部的前端路由；
- `Scene1`：在需要使用`breadcrumb`的页面中引入基础面包屑组件；
- `Scene2`：在全局布局的`header`处直接引入，页面不用单独引入；
- 根据当前浏览器`URL`匹配路由表中相应的路由信息；
- 路径变化时，`breadcrumb`生成相应的路径。

## vue-router
由于我们的面包屑组件是根据 `URL` 变化的，而 `URL` 又是从路由表中得来的。因此我们需要做的是在每次进入页面时获取路由相关信息。先说一下两个常用路由相关属性：`this.$route`和`this.$router`。你知道他们的区别知道是什么吗？
- this.$route（路由信息对象）
![](https://user-gold-cdn.xitu.io/2020/3/30/1712aa5c785392df?w=846&h=323&f=png&s=34400)

- this.$router（路由实例）
![](https://user-gold-cdn.xitu.io/2020/3/30/1712aa9e8cb12623?w=840&h=504&f=png&s=59562)
## 实现
```base
<!-- @description: 面包屑组件 -->
<template>
  <ul class="breadcrumb-wrapper">
    <li v-for="(item) in list" :key="item.path">
      <router-link :to="item.path">{{item.name}}</router-link>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      isShake: false
    }
  },
  created () {
    this.getPath()
  },
  methods: {
    getPath () {
      const current = this.$router.currentRoute.matched
      for (const item of current) {
        const temp = {}
        temp.name = item.meta.title
        temp.path = item.path !== '' ? item.path : '/'
        this.list.push(temp)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.breadcrumb-wrapper
  display flex
  flex-wrap wrap
  height 60px
  line-height 60px
  li
    color #666
    font-size 15px
    &:not(:last-child) :after
      content '>'
      margin 0 10px
      color #ccc
      &:last-child
        font-weight bold
        color #000
a
  text-decoration none
a:visited
  color #666
a:hover
  color #1296db
</style>

```