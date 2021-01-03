<template>
  <el-form-item class="price-parent" :label="label" :prop="prop">
    <el-input
      :style="`width: ${width}px`"
      ref="input"
      v-model="form.deceivedAmount"
      :placeholder="placeholder"
      @blur="blurInput"
      @focus="focusInput"
    >
      <div
        class="price-mask"
        :style="`width: ${width -30}px`"
        v-show="showFormatPrice"
        @click="focusInput"
      >{{formaterPrice}}</div>
    </el-input>
  </el-form-item>
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