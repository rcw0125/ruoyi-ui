<template>
  <section class="echarts-box" >
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
const colorArr = [
                "rgba(222,134,85, 0.1)",
                "rgba(222,134,85, 0.2)",
                "rgba(222,134,85, 0.4)",
                "rgba(222,134,85, 0.6)",
                "rgba(222,134,85, 0.8)",
                "rgba(222,134,85, 1)"
              ];
import { createServer } from "http";
export default {
  data() {
    return {};
  },
  props: {
    chartData: Object
  },
  watch: {
    chartData: {
      handler(newVal) {
        // this.initBar();
      },
      deep: true
    }
  },
  mounted() {
    this.initStr();
  },
  methods: {
    initStr() {
      let indicatorArr=[];
      this.chartData.nameArr.forEach(ele => {
        indicatorArr.push({'name':ele})
      });
      //组装数据
      let option = {
       
        color: ["#3D91F7", "#61BE67"],
          
        tooltip: {},
        // legend: {
        // show:false,
        //   bottom: 5,
        //   data: ["一级权重分析"],
        //   itemGap: 20,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 14
        //   },
        //   selectedMode: "single"
        // },

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
          indicator: indicatorArr,
          splitArea: {
            areaStyle: {
              color: (this.chartData.option && this.chartData.option.color?this.chartData.option.color:colorArr).reverse()
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
              color: (this.chartData.option && this.chartData.option.color?this.chartData.option.color:colorArr).reverse()
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
                value: this.chartData.data,
                name: "因素"
              }
            ]
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