<template>
  <el-button @click="click" v-bind="$attrs" :type="type" :loading="loading">
    <slot>确定</slot>
  </el-button>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    submit: {
      type: Function,
      default () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('TEST')
          }, 2000)
        })
      },
    },
  },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    click () {
      this.loading = true
      return this.submit()
        .then(data => {
          this.loading = false
          return data
        })
        .catch(e => {
          this.loading = false
          Promise.reject(e)
        })
    },
  },
}
</script>
