# element-ui 多选表格，当复选框禁用，鼠标覆盖显示 tooltip


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6aa5d2aef7a64c05bdbda25c001b8180~tplv-k3u1fbpfcp-watermark.image?)

今日遇到如图功能，需要在表格禁用勾选的复选框上加上 `tooltip` 提示。

先尝试了使用 `自定义列模版` 去渲染列，根据条件展示 `checkbox` 和使用 `tooltip` 包裹的 `checkbox`。但是用自定义列模版实现的话就会带来副作用——组件本身提供的 `clearSelection` 和 `toggleAllSelection` 方法就会失效。

于是采用一个简单的方法，就是去模拟 `tooltip` 的实现。当鼠标移入 `type="selection"` 的列时让 `tooltip` 显示，移出列时隐藏 `tooltip` 即可。

唯一需要思考的地方就是获取鼠标移入时元素在屏幕中的位置用来显示 `tooltip` 的位置。用 `getElementViewLeft`和 `getElementViewTop` 获取元素视口位置即可。全部代码见下：

## 实现模拟的 Tooltip
`dom` 结构：
```
<el-table
  @cell-mouse-enter="cellMoveEnter"
  @cell-mouse-leave="cellMoveLeave"
  @select="onSelectionChange">
  <el-table-column fixed type="selection" :selectable="row => !row.disabled"></el-table-column>
</el-table>
<div ref="tooltip" class="tooltip-wrapper">
  <span>提示：此项禁止勾选</span>
  <div class="arrow-wrapper"></div>
</div>

```
`css` 部分：
```
.tooltip-wrapper {
    display: none;
    position: relative;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(35, 35, 51, 0.5);
    border: 1px solid transparent;
    color: #747487;
    border-radius: 8px;
    padding: 8px 12px;
    z-index: 2000;
    font-size: 14px;
    line-height: 24px;
    width: 280px;
}
.arrow-wrapper {
    position: absolute;
    top: calc(50% - 6px);
    right: -16px;
    display: block;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left: 8px solid white;
}
```
`js` 部分：
```
cellMoveEnter (row, column, cell, event) {
  if (column.type === "selection" && this.$refs.tooltip.style.display !== 'block' && row.disabled) {
    this.$refs.tooltip.style.display = 'block'
    this.$refs.tooltip.style.position = 'fixed'
    this.$refs.tooltip.style.left = utils.getElementViewLeft(event.target) - 300 + 'px'
    this.$refs.tooltip.style.top = utils.getElementViewTop(event.target) + 1 + 'px'
  }
},

cellMoveLeave (row, column, cell, event) {
  if (this.$refs.tooltip.style.display !== 'none') {
    this.$refs.tooltip.style.display = 'none'
  }
},
```

`utils.js` 工具函数：

```
const getElementViewLeft = element => {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent

  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  let elementScrollLeft
  if (document.compatMode == "BackCompat") {
    elementScrollLeft = document.body.scrollLeft
  } else {
    elementScrollLeft = document.documentElement.scrollLeft
  }

  return actualLeft - elementScrollLeft
}
const getElementViewTop = element => {
  let actualTop = element.offsetTop
  let current = element.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  let elementScrollTop
   if (document.compatMode == "BackCompat") {
     elementScrollTop = document.body.scrollTop
  } else {
     elementScrollTop = document.documentElement.scrollTop
  }

  return actualTop - elementScrollTop
}

export default {
  getElementViewLeft,
  getElementViewTop
}
```
## benchmark 测试
拿分页的表格手写 `benchmark` 测试一下（没有测试长列表），来回 `hover` 禁用的复选框每次渲染花费时间基本在 `1ms` 以内。

```
cellMoveEnter (row, column, cell, event) {
  const s = window.performance.now()
  if (column.type === "selection" && this.$refs.tooltip.style.display !== 'block' && this.getCheckboxTipStatus(row)) {
    this.$refs.tooltip.style.display = 'block'
    this.$refs.tooltip.style.position = 'fixed'
    this.$refs.tooltip.style.left = utils.getElementViewLeft(event.target) - 300 + 'px'
    this.$refs.tooltip.style.top = utils.getElementViewTop(event.target) + 1 + 'px'
  }
  const renderTime = (window.performance.now() - s).toFixed(2) + 'ms'
  console.log(renderTime)
}
```


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f53e76a48f264153ad14fb79a09a7a17~tplv-k3u1fbpfcp-watermark.image?)