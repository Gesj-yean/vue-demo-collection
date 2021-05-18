# 徽标指令 v-badge

## v-badge
使用该指令在元素右上角显示徽标。

支持配置徽标的背景颜色、徽标形状；支持传入徽标上显示的数字。

## 代码 Code
```js
import Vue from 'vue'

const SUCCESS = '#72c140'
const ERROR = '#ed5b56'
const WARNING = '#f0af41'
const INFO = '#4091f7'
const HEIGHT = 20
let flag = false
export default {
  update (el, binding, vnode) {
    const { modifiers, value } = binding
    const modifiersKey = Object.keys(modifiers)
    let isDot = modifiersKey.includes('dot')
    let backgroundColor = ''
    if (modifiersKey.includes('success')) {
      backgroundColor = SUCCESS
    } else if (modifiersKey.includes('warning')) {
      backgroundColor = WARNING
    } else if (modifiersKey.includes('info')) {
      backgroundColor = INFO
    } else {
      backgroundColor = ERROR
    }

    const targetTemplate = isDot ? `<div style="position:absolute;top:-5px;right:-5px;height:10px;width:10px;border-radius:50%;background:${backgroundColor}"></div>` : `<div style="background:${backgroundColor};position:absolute;top:-${HEIGHT / 2}px;right:-${HEIGHT / 2}px;height:${HEIGHT}px;min-width:${HEIGHT}px;border-radius:${HEIGHT / 2}px;text-align:center;line-height:${HEIGHT}px;color:#fff;padding:0 5px;">${value}</div>`
    el.style.position = el.style.position || 'relative'
    const badge = Vue.extend({
      template: targetTemplate
    })
    const component = new badge().$mount().$el
    if (flag) {
      el.removeChild(el.lastChild)
    }
    el.appendChild(component)
    flag = true
  }
}
```
## 参数 Attributes
| 参数   | 说明   | 默认值 | 类型 | 可选 |
| -----   | ----   | --- | --- | --- |
| normal、dot | 徽标形状normal为正常徽标；dot 仅为一个点 | normal| String | 可选 |
| success、error、info、warning | 徽标颜色 | error | String | 可选 |
| number | 徽标上显示的数字 | / | Number | 可选 |



## 使用 Usage
然后你可以在模板中任何元素上使用新的 `v-badge` `property`，如下：

```html
<div v-badge.dot.info="badgeCount" style="height:50px;width:50px;background:#999"> </div>
```