# 元素全屏指令 v-screenfull

## v-screenfull
全屏指令，点击元素进行全屏/退出全屏的操作。可选元素后面是否插入 `element-ui` 的全屏图标 `el-icon-full-screen`。

## 代码 Code
```js
import screenfull from 'screenfull'

export default {
  bind (el, binding) {
    if (binding.modifiers.icon) {
      if (el.hasIcon) return
      // 创建全屏图标
      const iconElement = document.createElement('i')
      iconElement.setAttribute('class', 'el-icon-full-screen')
      iconElement.setAttribute('style', 'margin-left:5px')
      el.appendChild(iconElement)
      el.hasIcon = true
  }
    el.style.cursor = el.style.cursor || 'pointer'
    // 监听点击全屏事件
    el.addEventListener('click', () => handleClick())
  }
}

function handleClick () {
  if (!screenfull.isEnabled) {
    alert('浏览器不支持全屏')
    return
  }
  screenfull.toggle()
}
```
## 参数 Attributes
| 参数   | 说明   | 默认值 | 类型 | 可选 |
| -----   | ----   | --- | --- | --- |
| icon | 是否添加 `icon` | / | String | 可选 |

## 使用 Usage
然后你可以在模板中任何元素上使用新的 `v-screenfull` `property`，如下：


```html
<div v-screenfull.icon> 全屏 </div>
```