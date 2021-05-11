# 文字超出省略 v-ellipsis

## v-ellipsis
使用该指令当文字内容超出宽度（默认100 px）时自动变为省略形式。等同于使用 css：

```css
width: 100px;
whiteSpace: nowrap
overflow: hidden;
textOverflow: ellipsis;
```

## 代码 Code
```js
export default function (el, binding) {
    el.style.width = binding.arg || 100 + 'px'
    el.style.whiteSpace = 'nowrap'
    el.style.overflow = 'hidden';
    el.style.textOverflow = 'ellipsis';
}
```

## 参数 Attributes
| 参数   | 说明   | 默认值 | 类型 | 可选 |
| -----   | ----   | --- | --- | --- |
| width | 元素宽度 | 100 | Number | 必填 |
## 使用 Usage
然后你可以在模板中任何元素上使用新的 `v-ellipsis` `property`，如下：
```html
<div v-ellipsis:100> 需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本</div>
```