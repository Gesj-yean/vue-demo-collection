<template>
  <div class="tooltip-wrapper">
    <div id="bar" style="height:300px;width:500px"></div>
    <input id="copy_input" class="copy-input" ref="copyInput" v-model="copyValue" />
  </div>
</template>



<script>
import echarts from 'echarts'
export default {
  name: 'Home',

  data () {
    return {
      copyValue: '' // 绑定复制值
    }
  },

  mounted () {
    // 绘图
    this.drawChart()
    // tooltip中触发的方法需要在全局下定义，指向本页面中的方法
    window.copy = params => {
      this.copy(params)
    }
    window.getDetail = params => {
      this.jumpTablePage(JSON.parse(params))
    }
  },

  methods: {
    /**
    * @description 绘图
    */
    drawChart () {
      this.$nextTick(() => {
        // 基于准备好的dom，初始化echarts实例
        this.barChart = echarts.init(document.getElementById('bar'))
        // 指定图表的配置项和数据
        const option = {
          title: { text: 'ECharts 入门示例' },
          tooltip: {
            trigger: 'axis',
            triggerOn: 'mousemove',
            axisPointer: {
              type: 'shadow'
            },
            enterable: true, // 让鼠标能够进入tooltip
            position: (point, params, dom, rect, size) => {
              // 设置tooltip位置，使得容易鼠标进入
              if (point[0] > size.viewSize[0] / 2) {
                return [point[0] - 100, '50%']
              }
              return [point[0], '50%']
            },
            formatter: ([data]) => {
              // 格式化tooltip
              const dataTip = data
                ? `<div>数量：${data.value || 0}件</div>`
                : ''
              return `
<div>${data.name}</div>
${dataTip}
<div onclick="copy('${data.name}')" class="copy-btn">复制</div>
<div onclick="getDetail(JSON.stringify({value:'${data.value}',name:'${data.name}'}))" class="detail-btn">查看详情</div>
`
            }
          },
          legend: { data: ['销量'] },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{ name: '销量', type: 'bar', data: [5, 20, 36, 10, 10, 20] }]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.barChart.setOption(option)
      })
    },

    /**
    * @description 响应点击柱状图数据复制
    * @param {String} 复制的数据
    */
    copy (data) {
      const ipt = document.getElementById('copy_input')
      ipt.value = data
      ipt.select()
      document.execCommand('copy')
      alert(`ctrl + v 试试是否复制成功：${data}`)
    },

    /**
    * @description 响应点击柱状图数据查看详情
    * @param {Object}
    */
    jumpTablePage (params) {
      alert(JSON.stringify(params))
    }
  }
}
</script>
<style lang="less" scoped>
// 隐藏用于复制的输入框
.tooltip-wrapper {
  /deep/ .detail-btn,
  /deep/ .copy-btn {
    padding: 1px 5px;
    border-radius: 3px;
    display: inline-block;
    background: #5f82ff;
    cursor: pointer;
  }
}
.copy-input {
  position: absolute;
  opacity: 0;
  height: 0;
  border: 0;
  padding: 0;
  z-index: -10;
}
</style>

