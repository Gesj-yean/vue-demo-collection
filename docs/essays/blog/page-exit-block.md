# Vue 拦截离开页面操作

### 全局后置守卫
```javascript
const router = new VueRouter({ ... })

router.afterEach((to, from) => {
  // ... 每次离开当前路由都会触发
})
```
### 组件内的守卫

```javascript
beforeRouteLeave(to, form, next) {
  this.$confirm('正在处理消息，请确认是否离开？', { // element-ui 确认对话框为例
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  .then(async () => {
    next() // 点击确定，确认离开
  })
  .catch(() => {
    next(false) // 点击取消，不离开当前页面
  })
    return
  } else {
    next()
    return
  }
},
```
用以上方法监听路由的跳转，可以自定义设置确认对话框的样式，例如 `element-ui` 的确认对话框：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5736554090cb4169beb95165e0dfdda6~tplv-k3u1fbpfcp-watermark.image)

### 监听全局刷新或关闭页面
```javascript
window.onbeforeunload = function (e) {
  e = e || window.event;

  // 兼容IE8和Firefox 4之前的版本
  if (e) {
    e.returnValue = '关闭提示';
  }

  // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  return '关闭提示';
};
```
该方法在vue中的写法是：

```javascript
mounted() {
  window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
},

destroyed() {
  window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
}
methods: {
  beforeunloadFn(e) {
    e = e || window.event
    if (e) {
      e.returnValue = '关闭提示'
    }
    return '关闭'
  }
}

```
使用上面两种方法去监听全局刷新或关闭页面，呈现的效果是不能自定义的。也就是说由浏览器来展示给用户，例如在 `chrome` 中，就会像这样：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34e3c6bca91e46609e5de69b342fb1e9~tplv-k3u1fbpfcp-watermark.image)