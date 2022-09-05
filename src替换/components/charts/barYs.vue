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
          console.log(this.chartData)
          
          //组装数据
       let option = {
     color: this.chartData.option.color?this.chartData.option.color:['#00FDFF','#17D895','#92C923'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
         left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
    },
    toolbox: {
        feature: {
           
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '蒸发量2'],
        icon:'circle',
        padding: [20, 0, 0, 0],
         textStyle: {
              color: "#fff"
            }
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                textStyle: {
                  color: "#fff"
                }
              },
             axisLine: {
              lineStyle: { color: "#1B2864", width: 2 }
            },
            data: this.chartData.xAxisData
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '(T/h)',
            position: 'left',
            nameTextStyle:{
              color:'#fff'
            },
            axisLine: {
                lineStyle: {
                    color: "#1B2864", width: 2
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: "#fff"
                }
            },
            splitLine: {
              lineStyle: {
                color: "transtrant"
              }
            },
        },
        {
            type: 'value',
            name: '(T/wm²)',
             nameTextStyle:{
              color:'#fff'
            },
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: "#41538F", width: 2 
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: "#fff"
                }
            },
            splitLine: {
              lineStyle: {
                color: "#101C5A"
              }
            },
        },
        
    ],
    series: [
        {
            name: this.chartData.nameArr[0],
            type: 'bar',
            data:this.chartData.data[0],
            markLine:{
               symbol:"none",               //去掉警戒线最后面的箭头 
               data : [{
                               silent:false,             //鼠标悬停事件  true没有，false有
                               lineStyle:{               //警戒线的样式  ，虚实  颜色
                                   type:"solid",
                                   color:"#EA4215",
                               },
                                   label:{
                                   position:'middle',
                                   formatter:"区间高",
                                   
                               },
                               yAxis:this.chartData.high         // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                              
                           },
                           {
                                
                               silent:false,             //鼠标悬停事件  true没有，false有
                               lineStyle:{               //警戒线的样式  ，虚实  颜色
                                   type:"solid",
                                   color:"#EA4215",
                               },
                                   label:{
                                   position:'end',
                                   formatter:"区间低"
                               },
                               yAxis:this.chartData.low  ,        // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                           }
               ]
           
            }
        },
         {
            name: this.chartData.nameArr[1],
            type: 'bar',
            data: this.chartData.data[1]
        },
        {
            name: this.chartData.nameArr[2],
            type: 'bar',
            yAxisIndex: 1,
            data: this.chartData.data[2]
        },
        
    ]
};
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