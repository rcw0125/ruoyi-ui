<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
const colorArr = ["#3E1CDC", "#097CEB", "#21C76E"];
import { createServer } from "http";
export default {
  data() {
    return {};
  },
  props: {
    id: String,
    chartData: Object
  },
  watch: {
    chartData: {
      handler(newVal) {
        console.log(newVal);
        this.initBar();
      },
      deep: true
    }
  },
  mounted() {
    this.initStr();
  },
  methods: {
    initStr() {
      //组装数据
      let option = {
        title: {
          text: this.chartData.option.title ? this.chartData.option.title : "",
          textStyle: {
            color: "#fff"
          },
          top: "5%"
        },
        grid: this.chartData.option.grid ? this.chartData.option.grid : {},
        xAxis: {
          type: "category",
          data: this.chartData.xAxisData,
          axisLine: {
            lineStyle: {
              color: this.chartData.option.xAxisLineColor
                ? this.chartData.option.xAxisLineColor
                : "#fff"
            }
          },
          axisLabel: {
            show: true,
            color: this.chartData.option.xAxisLabelColor
              ? this.chartData.option.xAxisLabelColor
              : "#fff",
            fontSize: 16
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#0c3b71"
            }
          },
          axisLabel: {
            color: "rgb(170,170,170)",
            formatter: "{value} "
          }
        },
        series: [
          {
            data: this.chartData.data,
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.chartData.option.graphicColor
                      ? this.chartData.option.graphicColor[0]
                      : "#8bd46e"
                  },
                  {
                    offset: 0.5,
                    color: this.chartData.option.graphicColor
                      ? this.chartData.option.graphicColor[1]
                      : "#027eff"
                  },
                  {
                    offset: 1,
                    color: this.chartData.option.graphicColor
                      ? this.chartData.option.graphicColor[2]
                      : "#09bcb7"
                  }
                ])
              }
            }
          }
        ]
      };
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