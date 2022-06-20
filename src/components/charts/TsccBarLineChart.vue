<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
const echarts = require("echarts/lib/echarts");
import { TsccChartBase } from "./TsccChartBase";
export default {
  data() {
    return {
      option: {
        title: {
          text: "",
          textStyle: {
            color: "#fff"
          },
          top: "5%"
        },
          tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: [],
          textStyle: {
            color: "#fff"
          },
          top: "10%"
        },
        xAxis: {
          data: this.chartData.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#41538F",
              width: 2
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: { color: "#41538F", width: 2 }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            name: "(GJ)",
            nameTextStyle: {
              color: "#fff"
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: { color: "#41538F", width: 2 }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff"
              }
            },
            name: "(%)",
            nameTextStyle: {
              color: "#fff"
            }
          }
        ],
        series: [
          {
            data: [],
            name: '',
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#85313B"
              }
            }
          },
          {
            data:[],
            type: "bar",
            name: '',
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#B6A833" },
                  { offset: 1, color: "#59B886" }
                ])
              }
            }
          }
        ]
      }
    };
  },
  props: {
    chartData: Array, // 图表数据
    requiredSettings: Object, // 必选配置项
    optionalSettings: Object // 可选配置项
  },
  mixins: [TsccChartBase], // 混入公有属性
  mounted() {
    this.initStr();
  },
  methods: {
    initStr() {
      this.echartsInstance = echarts.init(this.$refs.mainChart);
      let settings = Object.assign(
        {},
        this.defaultSettings,
        this.optionalSettings
      );
      let option = this.option;
      //组装数据
      this.injectBaseSettings(option, settings);
      option.xAxis.data = this.requiredSettings.xAxisData;
      option.legend.data = settings.legendData;
       // 数据赋值
      for (let i = 0; i < this.chartData.length; i++) {
        this.option.yAxis[i].name=settings.unit[i];
        this.option.series[i].data = this.chartData[i];
        this.option.series[i].name = settings.legendData[i];
      }
      this.initBar(option);
    },
    initBar(option) {
      let id = this.$echarts.init(this.$refs.mainChart);
      id.setOption(option);
      window.addEventListener("resize", id.resize);
    }
  }
};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>