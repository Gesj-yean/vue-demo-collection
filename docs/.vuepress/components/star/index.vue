<!-- 评分组件 -->
<template>
  <div class="star-wrapper" ref="star">
    <div
      class="star-item"
      v-for="(item,index) in itemClass"
      :key="index"
      :class="item"
      :style="`height:${+size}px;width:${+size}px`"
      @click.prevent.stop="handleScore"
    ></div>
    <div class="number" :style="`line-height:${size}px`" v-show="isShowNumber">{{score}}</div>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    // 评分（仅支持整数/x.5）
    score: {
      type: Number,
      default: 3.5,
    },
    // 单颗星尺寸
    size: {
      type: Number | String,
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
    itemClass () {
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
    handleScore (e) {
      if (!this.isEnable) return
      this.$nextTick(() => {
        const starDom = this.$refs.star.getBoundingClientRect() // 获取star组件dom信息
        const itemWidth = starDom.width / this.totalScore // 获取单颗星宽度
        const offsetX = e.pageX - starDom.x // 获取鼠标点击位置相对star组件x轴偏移
        const on = Math.floor(offsetX / itemWidth)
        const half = offsetX % itemWidth < itemWidth / 2 ? 0.5 : 1
        const score = on + half
        alert('当前评分：' + score)
        this.$emit('getScore', score)
      })
    },
  },
}
</script>

<style scoped>
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
.number {
  display: inline-block;
}
</style>