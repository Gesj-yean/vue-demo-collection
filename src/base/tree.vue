<template>
  <ul class="ul-wrapper">
    <li v-for="item in list" :key="item.key">
      <div>
        <input type="checkbox" :name="item.key" @click="clickbox">
        <div class="checkbox-title">{{item.title}}</div>
      </div>
      <tree :list="item.children" @onClickBox="onClickBox"></tree>
    </li>
  </ul>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'tree',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      checkedKey: []
    }
  },
  methods: {
    clickbox (e) {
      const checked = e.target.checked
      const key = e.target.name
      if (checked) {
        if (!this.checkedKey.includes(key)) {
          this.checkedKey.push(key)
          console.log(this.checkedKey)
          this.$emit('onClickBox', this.checkedKey)
        }
      } else {
        this.checkedKey = this.checkedKey.filter((item) => {
          return key !== item
        })
      }
    },
    onClickBox (list) {
      this.checkedKey = this.checkedKey.concat(list)
      // console.log(this.checkedKey)
    }
  }
}
</script>

<style lang="stylus">
.ul-wrapper
  margin 10px 20px 0
  .checkbox-title
    display inline-block
    vertical-align middle

input[type="checkbox"]
  -webkit-appearance: none; /*清除复选框默认样式*/
  position relative
  display inline-block
  vertical-align middle
  padding 0
  margin-right 5px
  height 17px
  width 17px
  border 1px solid #ccc
  border-radius 3px
input[type="checkbox"]:checked::before
  position absolute
  top 0
  left 0
  padding-left 3px
  content: "\2713";
  height 17px
  width 14px
  font-size 10px
  font-weight: bold;
  background #1296db
  color #fff
  border-radius 3px
</style>
