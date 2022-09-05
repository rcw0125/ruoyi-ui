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
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          //   feature: {
          //     restore: {},
          //     saveAsImage: {}
          //   }
        },
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            radius: "100%",
            center: ["50%", "65%"],
            title:{textStyle:{color:'#fff'}},
            pointer: {
              length: "80%", //指针长度,
              width: 5
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              length: 15
            },
            axisLine: {
              show: true,
              lineStyle: {
                color:this.chartData.option && this.chartData.option.color?this.chartData.option.color:[],
                width: 10
              }
            },
            itemStyle: {
              color: "#fff" //auto指针颜色-数值所在区间颜色
            },
            detail: { formatter: "{value}%", offsetCenter: [0,"30%"],  textStyle:{color:'white',fontSize:20} },
            data: [{ value: this.chartData.data, name: this.chartData.name }]
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