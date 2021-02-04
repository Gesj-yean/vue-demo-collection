<template lang="pug">
el-form(:model="form" ref="form" label="180px" :label-suffix="'：'" :rules="rules")
    priceInput(:form.sync="form" :width="200" label="金额" prop="deceivedAmount" :rules="rules")
</template>

<script>
import priceInput from './priceInput'
export default {
  components: {
    priceInput,
  },
  data () {
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
}

</script>