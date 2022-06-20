<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>

<script>
import { TsccChartBase } from "./TsccChartBase";
const echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
// 引入渐变色相关组件
require("echarts/lib/component/graphic");
// 引入提示框和标题组件
// require('echarts/lib/component/title')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/legend')

export default {
  components: {},
  props: {
    chartData: Array, // 图表数据
    requiredSettings: Object, // 必选配置项
    optionalSettings: Object // 可选配置项
  },
  data() {
    return {
      defaultSettings: {},
      option: {
        title: {
          text: "折线",
          textStyle: {
            color: "#fff"
          }
          //   top: "5%"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          padding: [20, 0, 0, 0],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "13%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
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
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "rgb(170,170,170)"
              },
              //Y轴竖线是否显示
              show:true
            },
            axisLabel: {
              textStyle: {
                color: "rgb(170,170,170)"
              },
              formatter: "{value} "
            },
            //长的分割线
            splitLine: { show: false}
          }
        ],
        color: [],
        series: []
      },
      echartsInstance: null
    };
  },
  mixins: [TsccChartBase], // 混入公有属性
  computed: {},

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.echartsInstance = echarts.init(this.$refs.mainChart);
      let settings = Object.assign(
        {},
        this.defaultSettings,
        this.optionalSettings
      );
      let option = this.option;
      option.xAxis.data = this.requiredSettings.xAxisData;
      this.injectBaseSettings(option, settings);
      option.legend.data = this.requiredSettings.nameArr;
      //单位
      for (let i = 0; i < option.yAxis.length; i++) {
        option.yAxis[i].name = settings.unit[i];
      }
      // 数据赋值
      for (let i = 0; i < this.chartData.length; i++) {
        option.series.push({ type: "line" ,smooth: true});
        this.option.series[i].data = this.chartData[i];
        this.option.series[i].name = this.requiredSettings.nameArr[i];
        if(i==0){
          this.option.series[i].label={show: true,position: 'top',color: "#fff"};
        }
        else{
          this.option.series[i].label={show: true,position: 'bottom',color: "#f0f"};
        }
      }

      // 渲染曲线
      this.renderEChart(this.option);
    },
    renderEChart(option) {
      this.echartsInstance.setOption(option);
    }
  },
  watch: {
    chartData: {
      handler(val) {
        if (!this.echartsInstance) {
          return;
        }
       // this.option.series.forEach((item, index) => (item.data = val[index]));
         val.forEach((item, i) => {
           this.option.series[i].data = val[i];   
         });
        this.option.xAxis.data = this.requiredSettings.xAxisData;
        this.renderEChart(this.option);
      },
      immediate: true
    },
    "requiredSettings.xAxisData": {
      handler(val) {
        if (!this.echartsInstance) {
          return;
        }
        //console.log(val);
       // this.option.series.forEach((item, index) => (item.name = val[index]));
        
        //this.option.xAxis.data = val;
        this.renderEChart(this.option);
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>