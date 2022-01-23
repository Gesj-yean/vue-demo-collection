<template>
  <div class="markline-wrapper">
    <div id="bar" style="height:150px;width:100%"></div>
  </div>
</template>



<script>
// 按需引入
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  MarkPointComponent,
  MarkLineComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default {
  name: 'Markline',

  mounted () {
    // 数据结构：[{name: tooltip 的 title,value: [时间点，数量], stage: 阶段}]
    const data = [
      {
          "name": "Aug 01 - Aug 01",
          "value": [
              "2022/08/01",
              2
          ],
          "stage": "Stage 01" // 可选
      },
      {
          "name": "Oct 01 - Oct 01",
          "value": [
              "2022/10/01",
              2
          ],
          "stage": "Stage 02"
      },
      {
          "name": "Dec 01 - Dec 01",
          "value": [
              "2022/12/01",
              1
          ],
          "stage": "Stage 03"
      }
    ]
    // 标注点数据结构：[{xAxis: 时间点, stage: 阶段}]
    const chartMarkData = [
      {
          "xAxis": 1659283200000,
          "stage": "Stage 01"
      },
      {
          "xAxis": 1664553600000,
          "stage": "Stage 02"
      },
      {
          "xAxis": 1669824000000,
          "stage": "Stage 03"
      }
    ]
    this.initChart(data, chartMarkData)
  },

  // 组件销毁时，取消监听 resize
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.barChart.resize();
    });
  },

  methods: {
    initChart(data, chartMarkData) {
      this.$nextTick(() => {
        !this.barChart && (this.barChart = echarts.init(document.getElementById('bar')))
        this.barChart.setOption(this.activityOption(data, chartMarkData));
        window.addEventListener("resize", () => {
          this.barChart.resize();
        });
      });
    },

    activityOption (data, chartMarkData = []) {
      return {
        xAxis: {
          type: "time", // 刻度轴为时间
          axisTick: {
            inside: true, // 刻度向内
          },
          axisLine: {
            lineStyle: {
              color: "rgba(82, 82, 128, 0.09)", // x 轴轴线颜色
            },
          },
          axisLabel: {
            color: "rgba(4, 4, 19, 0.56)", // x 轴轴线上文字颜色
          },
          boundaryGap: ["20%", "20%"], // x 轴左右各留 20% 的空白，不顶格
        },
        yAxis: {
          axisLine: {
            show: false, // 不展示 y 轴轴线
          },
          axisLabel: {
            show: false, // 不展示 y 轴文字
          },
          splitLine: {
            show: false, // 不展示 y 轴分割线
          },
          boundaryGap: [0, "20%"], // 顶部留白 20%
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: "rgba(82, 82, 128, 0.09)",
              width: 33,
              type: 'solid'
            },
          },
          formatter(params) {
            return `<div style="width:200px;line-height:24px">
              <div style="color: #222230;font-weight: bold;">${params[0].name}</div>
                <div class="mgt-sm mgb-sm">
                  <span style="color: #222230;">${params[0].value[1]} Conversation(s)</span>
                </div>
                <a class="link" onclick="handleChartClick('${params[0].data.stage}','${params[0].value[0]}')">View Detail</a>
              </div>`;
          },
          enterable: true, // 鼠标可进入 tooltip
        },
        grid: {
          left: "3%",
          top: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "",
            type: "bar",
            barMaxWidth: "16px",
            barMinWidth: "8px",
            itemStyle: {
              color: "#0E72ED",
              borderRadius: 4,
            },
            markPoint: { // 标注点
              symbol: "circle",
              label: {
                color: "rgba(4, 4, 19, 0.56)",
                show: true,
                formatter: (params) => {
                  return params.data.stage || "";
                },
              },
              itemStyle: {
                color: "transparent",
              },
              data: chartMarkData.map((item) => ({
                ...item,
                y: "5%",
                symbolOffset: ["-150%", "0%"],
              })),
            },
            markLine: { // 标注线
              data: chartMarkData,
              symbol: "none",
              lineStyle: {
                type: "solid",
                opacity: 0.5,
                color: "rgba(255, 255, 255, 0.1)",
                shadowColor: "rgba(0,0,0, 1)",
                shadowOffsetX: 18,
              },
              animation: false,
              label: {
                show: false,
              },
            },
            data: data,
          },
        ],
      };
    }
  }
}
</script>

