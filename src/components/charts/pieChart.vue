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
    chartData: Object
  },
  watch: {
    chartData: {
      handler(newVal) {
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
          let seriesData=[];
          for(let i=0;i<this.chartData.data.length;i++){
            seriesData.push({name:this.chartData.nameArr[i],value:this.chartData.data[i]})
          }
          let seriesArr=[
            {
              type: "pie",
              avoidLabelOverlap: false,
              itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    shadowBlur: 10,
                    shadowColor: 'rgba(30, 30, 30,0.2)',
                }
                },
              label: {
                normal: {
                  show: false,
                  // position: "center"
                },
                emphasis: {
                  show: true,
                  formatter: function(param) {
                    return param.name + "\n" + param.percent.toFixed(0) + "%";
                  },
                  textStyle: {
                    fontSize: "15",
                    fontWeight: "bold"
                  }
                }
              },
              data: seriesData
            }
          ];
          // let tooltip= ,
           switch (this.chartData.type){
          case 0:
            // seriesArr[0].push()
          break;
          case 1:
            seriesArr[0].radius=["40%", "60%"]
            seriesArr[0].label.normal.position= "center"
            
            break;
          case 2:
            seriesArr[0].radius='55%'
             seriesArr[0].roseType= 'radius'
        }
          //组装数据
        let  option= {
           color: this.chartData.color!=undefined?this.chartData.color:['#00FDFF','#17D895','#92C923'],
          title:{
            text: this.chartData.text!=undefined?this.chartData.color:'',
            subtext: this.chartData.subtext!=undefined?this.chartData.color:'',
          },
          legend: {
            top: "85%",
            icon:this.chartData.legendIcon?this.chartData.legendIcon:'circle',//rect 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            orient:this.chartData.orient?this.chartData.orient:'horizontal',
            left:this.chartData.legendLeft?this.chartData.legendLeft:'center',
            textStyle: {
              color: "#fff",
              fontSize:12
            }
          },
          series: seriesArr
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