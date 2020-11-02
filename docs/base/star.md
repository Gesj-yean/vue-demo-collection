# Vue 评分组件

<star-index />
<star-index size="20"/>
<star-index size="28"/>
<star-index size="32" :isShowNumber="true"/> 



Vue 评分组件，支持以下参数传入：
- 评分（仅支持整数/x.5）
- 单颗星尺寸
- 总分（整数）
- 是否显示评分
- 是否开启进行评分

## DOM 结构
```
<!-- 评分组件 -->
<template>
  <div class="star-wrapper" ref="star">
    <div
      class="star-item"
      v-for="(item,index) in itemClass"
      :key="index"
      :class="item"
      :style="`height:${size}px;width:${size}px`"
      @click.prevent.stop="handleScore"
    ></div>
    <div class="number" v-show="isShowNumber">{{score}}</div>
  </div>
</template>
```
## props / methods / computed
```
<script>
export default {
  props: {
    // 评分（仅支持整数/x.5）
    score: {
      type: Number,
      default: 3.5,
    },
    // 单颗星尺寸
    size: {
      type: Number,
      default: 16,
    },
    // 总分（整数）
    totalScore: {
      type: Number,
      default: 5,
    },
    // 是否显示评分
    isShowNumber: {
      type: Boolean,
      default: false,
    },
    // 是否开启进行评分
    isEnable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 每颗星状态组成的数组
    itemClass() {
      const onLength = Math.floor(this.score)
      const halfLength = Math.ceil(this.score % 1)
      const offLength = this.totalScore - onLength - halfLength
      let result = []
      for (let i = 0; i < onLength; i++) {
        result.push('on')
      }
      if (halfLength) result.push('half')
      for (let i = 0; i < offLength; i++) {
        result.push('off')
      }
      return result
    },
  },
  methods: {
    /** 响应点击评分 */
    handleScore(e) {
      if (!this.isEnable) return
      this.$nextTick(() => {
        const starDom = this.$refs.star.getBoundingClientRect() // 获取star组件dom信息
        const itemWidth = starDom.width / this.totalScore // 获取单颗星宽度
        const offsetX = e.pageX - starDom.x // 获取鼠标点击位置相对star组件x轴偏移
        const on = Math.floor(offsetX / itemWidth)
        const half = offsetX % itemWidth < itemWidth / 2 ? 0.5 : 1
        const score = on + half
        console.log(score)
        this.$emit('getScore', score)
      })
    },
  },
}
</script>
```
## less 样式
```
<style lang="less" scoped>
.star-item {
  display: inline-block;
  margin-right: 6px;
}
.on {
  background: url('./on.png');
  background-size: cover;
}
.half {
  background: url('./half.png');
  background-size: cover;
}
.off {
  background: url('./off.png');
  background-size: cover;
}
</style>
```