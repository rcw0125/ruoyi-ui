<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>
<script>
export default {
  props: {
    chartData: Array, // 图表数据
    requiredSettings: Object, // 必选配置项
    optionalSettings: Object // 可选配置项
  },
  data() {
    return {
      option: {
        title: {
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: 10,
            color: "rgb(97, 142, 205)"
          },
          x: "center"
        },
        series: [
          {
            type: "liquidFill",
            radius: "75%",
            center: ["50%", "50%"],
            data: [], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgb(255,0,255,0.1)"
            },
            label: {
              normal: {
                // formatter: (0.5 /100).toFixed(2) + "%",
                textStyle: {
                  fontSize: 10
                }
              }
            },
            outline: {
              show: false
            }
          },
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["75%", "77%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: 10,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: "#5886f0"
                }
              }
            ]
          }
        ]
      },
      echartsInstance: null,
      defaultSettings:{}
    };
  },
 
  mounted() {
    this.initStr();
  },
  methods: {
    initStr() {
     this.echartsInstance = this.$echarts.init(this.$refs.mainChart);
     let settings= Object.assign(
       {},
       this.defaultSettings,
       this.optionalSettings
     )
     let option=this.option;
      let seriesData = [];
      for (let i = 0; i < this.requiredSettings.count; i++) {
        seriesData.push(this.chartData[0]);
      }
      option.series[0].data=seriesData
      this.renderEChart(this.option);
    },
    renderEChart(option) {
        this.echartsInstance.setOption(option);
      // window.addEventListener("resize", id.resize);
    },
    // watch: {
    // chartData: {
      // handler(val) {
      //   if (!this.echartsInstance) {
      //     return;
      //   }
      //   this.option.series[0].data = val;
      //   this.renderEChart(this.option);
      // },
      // immediate: true
    // }
  // }
  }
};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>