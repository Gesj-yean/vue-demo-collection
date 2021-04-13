# Loading 按钮

点击按钮尝试发送请求，请求结束后自动结束 `loading`：

<loadingBtn-loadingBtn />

`loading-btn` 加载按钮代码：
```html
<template lang="pug">
el-button(
  @click="click",
  v-bind="$attrs", // size、type等
  :type="type",
  :loading="loading")
  slot 确定
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
          }, 5000)
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

```
引入组件：
```
import submitBtn from '@/components/submit-btn'
```
`template` 中使用：
```
submit-btn(:submit="confrmSubmit" round) 确定
```

以 `element-ui` 表单提交按钮为例：
```
// 确认信息
confrmSubmit () {
  return this.$refs.form.validate().then(res => { // 校验表单
    return this.operateUser()
  })
},

// 提交表单
operateUser () {
  return api.editUser({
    page: 1,
    count: 10
  })
    .then(res => {
      // todo
    })
}

```
总结：
在发送请求后按钮变为 `loading` 状态，请求结束后，`loading` 结束。