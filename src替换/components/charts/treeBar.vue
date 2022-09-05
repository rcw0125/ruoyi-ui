<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
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
          let arr=[];
          let obj={ type: "bar" }
          let count=this.chartData.seriesData[0].length-1;
          for(let i=0;i<count;i++){
              arr.push(obj)
          }
          //组装数据
        let option={
           color: this.chartData.color!=undefined?this.chartData.color:['#00FDFF','#17D895','#92C923'],
          legend: {
            padding: [20, 0, 0, 0],
            orient:this.chartData.orient?this.chartData.orient:'horizontal',
            left:this.chartData.legendLeft?this.chartData.legendLeft:'center',
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {},
          dataset: {
            source:this.chartData.seriesData
          },
          xAxis: {
            type: "category",
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: { color: "#41538F", width: 2 }
            },
            //设置网格线颜色
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#41538F"],
                width: 1,
                type: "solid"
              }
            }
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            },
            axisLine: {
              lineStyle: { color: "#41538F", width: 2 }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#41538F"],
                width: 1,
                type: "solid"
              }
            }
          }, // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: arr
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