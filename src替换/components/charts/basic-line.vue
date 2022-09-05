<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
const colorArr = ["#3E1CDC", "#097CEB", "#21C76E"];
const Grid = { left: "3%", right: "4%", bottom: "3%", containLabel: true };
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
        color:
          this.chartData.option && this.chartData.option.color
            ? this.chartData.option.color
            : colorArr,
        title: {
          text: this.chartData.text ? this.chartData.text : "",
          textStyle: {
            color: "#fff"
          },
          top: "5%"
        },
        tooltip: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        legend: {
          data: this.chartData.nameArr,
          padding: [20, 0, 0, 0],
          textStyle: {
            color: "#fff"
          }
        },
        grid:
          this.chartData.option && this.chartData.option.grid
            ? this.chartData.option.grid
            : Grid,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.chartData.xAxisData,
            axisLabel: {
              textStyle: {
                color: "rgb(170,170,170)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "rgb(170,170,170)"
              }
            },
            axisLabel: {
              color: "rgb(170,170,170)",
              formatter: "{value} "
            },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: this.chartData.nameArr[0],
            type: "line",
            stack: "总量",
            // areaStyle: {},
            data: this.chartData.data[0]
          },
          {
            name: this.chartData.nameArr[1],
            type: "line",
            stack: "总量",
            // areaStyle: {},
            data: this.chartData.data[1]
          },
          {
            name: this.chartData.nameArr[2],
            type: "line",
            stack: "总量",
            // areaStyle: {},
            data: this.chartData.data[2]
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