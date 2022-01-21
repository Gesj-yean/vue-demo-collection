点击以下输入框操作：

<!-- <priceInput-index /> -->

在日常的迭代开发中通常我们会遇到这样的场景：在一个表单中需要用户输入金额，并校验金额的格式。这个需求你一定遇到过，但是现在，我们还需要做到：当用户离开输入框（失去焦点）时，输入的内容变成了用逗号每隔 `3` 位分隔的数字，并展示给用户。且最后提交金额时，参数的值仍然是正常数字，不包含逗号。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ed0d186e3a84f4995f09443834b3321~tplv-k3u1fbpfcp-watermark.image)

遇到这种需求，我们首先要想到「表单中的金额输入框」是常见到的功能。既然是常见的功能，我们要将它抽象封装起来，做到随时可用于任何表单中，用一行代码代替重复作业。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59d5e204d7dc47488ea18e44d83c06fb~tplv-k3u1fbpfcp-watermark.image)

像表单项一样，我们需要给组件传递 `label`，绑定值的 `key`，`placeholder` 用于展示在表单中；还需要传递整个 `form` 对象，表单的 `rules` 进来。另外，考虑到需要给一个遮罩层展示格式化后的金额，我们还需要传递 `width` 决定遮罩层宽度。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29400ab3b3dd499fb301fe63f48d29d4~tplv-k3u1fbpfcp-watermark.image)

注意我们上面的需求，当 `input` 框触发 `blur` 事件时，我们首先需要校验用户输入的内容是否为正数且可保留两位小数。这时就用到了传递进来的 `rules`，拿它来校验。若通过校验则展开格式化后的金额，不通过就触发 `element-ui` 本身的校验规则提示。注意看 `@blur` 触发的 `blurInput` 方法，用于去掉输入内容前面的 `0`，是否符合校验条件，最后决定是否展开格式化后的金额。 

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2caebc5d659745579ca574b409674edc~tplv-k3u1fbpfcp-watermark.image)

如果没问题，通过了校验，就需要根据输入内容格式化金额。利用 `computed` 计算得到。

组件的设计思想大致如下：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af5c7b75c3b64bc295b99dfb9e4aa01e~tplv-k3u1fbpfcp-watermark.image)



完整的组件代码如下：

```javascript
<template lang="pug">
el-form-item.price-parent(:label="label" :prop="prop" )
  el-input(:style="`width: ${width}px`" ref="input" v-model="form.deceivedAmount" :placeholder="placeholder" @blur="blurInput" @focus="focusInput")
  .price-mask(:style="`width: ${width -30}px`" v-show="showFormatPrice" @click="focusInput") {{formaterPrice}}
</template>

<script>
export default {
  name: 'priceInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    width: {
      type: Number,
      default: 140,
    },
    form: {
      type: Object,
      default: () => ({
        deceivedAmount: '',
      }),
    },
    rules: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      showFormatPrice: false, // 是否显示遮罩
    }
  },
  computed: {
    formaterPrice () {
      if (
        this.form.deceivedAmount !== '' &&
        this.form.deceivedAmount !== null
      ) {
        // 去掉前面的0
        const integer = this.form.deceivedAmount.split('.')[0]
        const decimal = this.form.deceivedAmount.split('.')[1]
          ? `.${this.form.deceivedAmount.split('.')[1]}`
          : ''
        return `${integer
          .toString()
          .replace(/(?=(?!^)(\d{3})+$)/g, ',')}${decimal}`
      } else {
        return ''
      }
    },
  },
  methods: {
    // 聚焦金额输入框
    focusInput () {
      this.showFormatPrice = false
      this.$refs.input.focus()
    },
    // 失焦金额输入框
    blurInput () {
      if (this.form.deceivedAmount !== '') {
        // 去掉前面的0
        const integer = Number(this.form.deceivedAmount.split('.')[0])
        const decimal = this.form.deceivedAmount.split('.')[1]
          ? `.${this.form.deceivedAmount.split('.')[1]}`
          : ''
        this.form.deceivedAmount = isNaN(`${integer}${decimal}`)
          ? this.form.deceivedAmount
          : `${integer}${decimal}`
        if (typeof this.rules[this.prop][0].pattern !== 'object') {
          throw `请确保 rules[${this.prop}][0].pattern 为正则表达式`
          return
        }
        this.showFormatPrice = this.rules[this.prop][0].pattern.test(
          this.form.deceivedAmount,
        )
      }
    },
  },
}
</script>

<style lang="less" scoped>
.price-mask {
  position: absolute;
  z-index: 2;
  top: 1px;
  left: 125px;
  background: white;
  width: 110px;
  overflow: auto;
  font-size: 13px;
}
</style>
```
在表单中的使用方法其实和你直接写一个 `el-form-item` 的效果是一样的，直接引入即可。
```javascript
// 使用方法：
<template lang="pug">
el-form(:model="form" ref="form" label="180px" :label-suffix="'：'" :rules="rules")
    priceInput(:form.sync = "form" :width = "150" label = "金额" prop = "deceivedAmount" :rules = "rules")
</template>

<script>
import priceInput from '@self/components/priceInput'
data() {
  return {
    form: {
      deceivedAmount: null,
    },
    rules: {
      deceivedAmount: [
        {
          pattern: /^1000000000$|^1000000000.0$|^1000000000.00$|^[+]{0,1}(\d{0,9})$|^[+]{0,1}(\d{0,9}\.\d{1,2})$/,
          message: ' 请输入 0-10亿 的正数，可保留两位小数',
          trigger: 'blur',
        },
      ],
    },
  }
}
components: {
  priceInput,
}
</script>
```