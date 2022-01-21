先来对比使用一下：
<cascader-demo />

在 element-ui 中，它提供的多选可搜索级联组件有一个问题：当用户选中全部子节点时不会合并为显示父节点。并且我想要级联看板一直展开。

要想完成这个功能，在经历过上述步骤一番探索后发现还是要修改源码才能完成。于是我基于原本多选可搜索的级联选择器，进行以下优化。

优化后的组件使用方法与原本还是一样：
```
<template lang="pug">
  cascader.mb-200(
      ref="cascader",
      :options="options",
      placeholder="试试搜索：指南"
      :props=`{ multiple: true }`
      filterable
      clearable
      @change="changecascader"
      @visible-change="visibleChange")
</template>

<style lang="less" scoped>
.mb-200 {
  margin-bottom:200
}
</style>

```

基于原本 `element-ui` 的多选可搜索的级联选择器，进行以下四点的优化：

- 默认看到级联看板展开，不会收起。需要找到源码中控制级联看板展开的方法，并在合适的时机触发。
```
@blur="blurCascader(true)" // 无法触发

@visible-change="blurCascader(true)" // 可触发

// 失焦后触发展开级联看板（默认失焦后关闭看板）

blurCascader(e) {
    this.$nextTick(() => {
        // 调用组件内部的方法
        this.$refs.cascader.toggleDropDownVisible(e)
    })
},
```
- 搜索选中后展示级联看板，并勾选搜索选中的节点
```
// 响应选中的节点，选中节点后关闭选择看板，展示级联看板
changecascader(e) {
  this.$refs.cascader.handleDropdownLeave()
},
```

- 修改：当子级节点全部选中后，`tag` 只展示一个父级节点，而不是全部子节点

用 `presentFormatTags` 替换原本 `presentTags`，展示 `tag`
```
// 获取所有勾选的节点
getPresetTags() {
  const tree = this.panel.menus[0]
  const result = []
  loop(tree)
  // 递归查找被勾选的节点
  function loop(tree = []) {
    for (let i = 0; i < tree.length; i++) {
      const child = tree[i]
      // checked表示勾选状态
      if (child.checked) {
        result.push({ ...child, closable: true })
      } else if (child.indeterminate) {
        // indeterminate表示半选中状态
        child.children && loop(child.children)
      }
    }
  }
  // presentFormatTags 是由完全勾选的节点组成，由此生成 tag
  this.presentFormatTags = result
},
```


- 关于节点的删除：由于修改了标签的展示，需要重写 `tag` 的删除方法。修改原 `deleteTag` 方法如下：
```
deleteTag(index, tag) {
  let _ = this
  if (tag && tag.hasChildren) {
    // 父节点tag删除时，需要将其所有的子节点删除
    loop(tag.children)
    function loop(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].hasChildren) {
          loop(list[i].children)
        } else {
          _.checkedValue = _.checkedValue.filter(n => n !== list[i].path)
          _.$emit('remove-tag', tag)
        }
      }
    }
  } else if (tag) {
    // 如果是子节点直接删除这个节点
    this.checkedValue = this.checkedValue.filter((n, i) => n !== tag.path)
    this.$emit('remove-tag', tag)
  } else {
    // 利用输入框回车键删除
    const temp = this.presentFormatTags[this.presentFormatTags.length - 1]
    temp && this.deleteTag(null, temp)
  }

  // 原本代码
  // const { checkedValue } = this
  // const val = checkedValue[index]
  // this.checkedValue = checkedValue.filter((n, i) => i !== index)
  // this.$emit('remove-tag', val)
},
```
源码于[GitHub](https://github.com/Gesj-yean/vue-demo-collection/tree/master/docs/.vuepress/components/cascader)