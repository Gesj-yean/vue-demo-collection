# 回到顶部指令 v-backtop

## v-backtop

使用该指令可以让页面或指定元素回到顶部。

可选指定元素，如果不指定则全局页面回到顶部。可选在元素偏移多少 `px` 后显示 `backtop` 元素，例如在滚动 `400px` 后显示回到顶部按钮。


## 代码 Code
```js
export default {
  bind (el, binding, vnode) {
    // 响应点击后滚动到元素顶部
    el.addEventListener('click', () => {
    const target = binding.arg ? document.getElementById(binding.arg) : window
    target.scrollTo({
      top: 0,
      behavior: 'smooth'
      })
    })
  },
  update (el, binding, vnode) {
    // 滚动到达参数值才出现绑定指令的元素
    const target = binding.arg ? document.getElementById(binding.arg) : window
    if (binding.value) {
      target.addEventListener('scroll', (e) => {
        if (e.srcElement.scrollTop > binding.value) {
          el.style.visibility = 'unset'
        } else {
          el.style.visibility = 'hidden'
        }
      })
    }
    // 判断初始化状态
    if (target.scrollTop < binding.value) {
      el.style.visibility = 'hidden'
    }
  },
  unbind (el) {
    const target = binding.arg ? document.getElementById(binding.arg) : window
    target.removeEventListener('scroll')
    el.removeEventListener('click')
  }
}
```

## 参数 Attributes
| 参数   | 说明   | 默认值 | 类型 | 可选 |
| -----   | ----   | --- | --- | --- |
| id | 给需要回到顶部的元素添加的`id` | / | String | 可选 |
| offset | 偏移距离为 `height` 时显示指令绑定的元素 | / | Number | 可选 |

## 使用 Usage
然后你可以在模板中任何元素上使用新的 `v-backtop` `property`，如下表示在 `id` 为 `app` 的元素滚动 `400px` 后显示绑定指令的元素：

```html
<div  v-backtop:app="400"> 回到顶部 </div>
```
也可以这样使用，表示为一直显示绑定指令的元素，并且是全局页面回到顶部：
```html
<div  v-backtop> 回到顶部 </div>
```