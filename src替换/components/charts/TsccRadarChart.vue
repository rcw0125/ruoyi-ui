<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>

<script>
import { TsccChartBase } from "./TsccChartBase";
const echarts = require("echarts/lib/echarts");
// 引入雷达图
require("echarts/lib/chart/radar");
// 引入渐变色相关组件
require("echarts/lib/component/graphic");
// 引入提示框和标题组件
// require('echarts/lib/component/title')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/legend')

export default {
  components: {},
  props: {
    chartData: Array, // 图表数据
    requiredSettings: Object, // 必选配置项
    optionalSettings: Object // 可选配置项
  },
  data() {
    return {
      defaultSettings: {},
      option: {
        color: ["#3D91F7", "#61BE67"],
        tooltip: {},
        grid: {},
        radar: {
          // shape: 'circle',
          radius: "80%",
          triggerEvent: true,
          name: {
            textStyle: {
              color: "#fff",
              // fontSize:'20',
              borderRadius: 3,
              padding: [3, 5]
            }
          },

          nameGap: "2",
          indicator: [],
          splitArea: {
            areaStyle: {
              color: []
            }
          },
          // axisLabel:{//展示刻度
          //     show: true
          // },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "rgba(0,0,0,0)"
            }
          },
          splitLine: {
            lineStyle: {
              width: 2,
              color: []
            }
          }
        },

        series: [
          {
            name: "一级权重分析",
            type: "radar",
            //areaStyle: {normal: {}},
            areaStyle: {
              normal: {
                color: "rgba(252,211,3, 0.3)"
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "rgba(252,211,3, 1)",
                width: 1
              }
            },
            data: [
              {
                value: [],
                name: "因素"
              }
            ]
          }
        ]
      },
      echartsInstance: null
    };
  },
  //   mixins: [TsccChartBase], // 混入公有属性
  computed: {},

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.echartsInstance = echarts.init(this.$refs.mainChart);
      let settings = Object.assign(
        {},
        this.defaultSettings,
        this.optionalSettings
      );
      let option = this.option;
      option.radar.splitArea.areaStyle.color = settings.color.reverse();
      option.radar.splitLine.lineStyle.color = settings.color.reverse();
      // option.color = settings.color;
      // 数据赋值
      //   this.injectBaseSettings(option, settings);
      option.series[0].data[0].value = this.chartData;
      this.requiredSettings.nameArr.forEach(ele => {
        option.radar.indicator.push({ name: ele });
      });
      // 渲染曲线
      this.renderEChart(this.option);
    },
    renderEChart(option) {
      this.echartsInstance.setOption(option);
    }
  },
  watch: {
    chartData: {
      handler(val) {
        if (!this.echartsInstance) {
          return;
        }
        this.option.series.forEach((item, index) => (item.data = val[index]));
        this.renderEChart(this.option);
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>