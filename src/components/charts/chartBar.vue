<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
const colorArr=["#3E1CDC", "#097CEB", "#21C76E"];
const Grid={ left: "3%",right: "4%",bottom: "3%",containLabel: true}
import { createServer } from "http";
export default {
  data() {
    return {
        
    };
  },
  props: {
    id: String,
    chartData: Object,
  },
  watch: {
    chartData: {
      handler(newVal) {
        console.log(newVal);
        this.initBar()
      },
      deep: true
    }
  },
  mounted() {
    this.initStr()
  },
  methods: {
      initStr(){
         
          //组装数据
        let option= {
          color: this.chartData.option.color?this.chartData.option.color:colorArr,
          title:{
            text: this.chartData.text?this.chartData.text:'',
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: this.chartData.name,
            padding: [20, 0, 0, 0],
            textStyle: {
              color: "#fff"
            }
          },
          grid: this.chartData.option.grid?this.chartData.option.grid:Grid,
          xAxis: [
            {
              type: "value",
              axisLabel: {
                textStyle: {
                  color: "#fff"
                }
              },
              axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            }
          ],
          yAxis: [
            {
              type: "category",
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: "#fff"
                }
              },
               
              data: this.chartData.yaxisData
            }
          ],
          series: [
          {
            name: this.chartData.name[0],
            data: this.chartData.data[0],
            
            type: "bar",
            label: {
              show: true,
              position: "inside"
            }
          },
          {
            name: this.chartData.name[1],
            data: this.chartData.data[1],
            type: "bar",
            // data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            // name: "支出",
            type: "bar",
            label: {
              show: true,
              position: "left"
            },
            name: this.chartData.name[2],
            data: this.chartData.data[2],
            // data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
        }
          this.initBar(option)
      },
    initBar(option) {
      let id = this.$echarts.init(this.$refs.mainChart);
      id.setOption(option);
      window.addEventListener("resize", id.resize);
    },
  },

};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>