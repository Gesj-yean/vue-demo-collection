# 元素点击范围扩展指令 v-expandClick

## v-expandClick
使用该指令可以扩展元素的点击范围，由于借用伪元素实现，故不会影响元素在页面上的排列布局。

可传入的参数为：上右下左扩展的范围，单位 px，默认向外扩展 `10px`。

## 代码 Code
```js
export default function (el, binding) {
    const s = document.styleSheets[document.styleSheets.length - 1]
    const DEFAULT = -10 // 默认向外扩展10px
    const ruleStr = `content:"";position:absolute;top:-${top || DEFAULT}px;bottom:-${bottom || DEFAULT}px;right:-${right || DEFAULT}px;left:-${left || DEFAULT}px;`
    const [top, right, bottom, left] = binding.expression && binding.expression.split(',') || []
    const classNameList = el.className.split(' ')
    el.className = classNameList.includes('expand_click_range') ? classNameList.join(' ') : [...classNameList, 'expand_click_range'].join(' ')
    el.style.position = el.style.position || "relative"
    if (s.insertRule) {
        s.insertRule('.expand_click_range::before' + '{' + ruleStr + '}', s.cssRules.length)
    } else { /* IE */
        s.addRule('.expand_click_range::before', ruleStr, -1)
    }
}
```
## 参数 Attributes
| 参数   | 说明   | 默认值 | 类型 | 可选 |
| -----   | ----   | --- | --- | --- |
| top, right, bottom, left | 上右下左扩展宽度（逗号分割），<br>单位px | 10,10,10,10 | String | 可填 |



## 使用 Usage
然后你可以在模板中任何元素上使用新的 `v-expandClick` `property`，如下：

```html
<div v-expandClick="20,30,40,50" @click="glabClickoutside"> 点击范围扩大</div>
```