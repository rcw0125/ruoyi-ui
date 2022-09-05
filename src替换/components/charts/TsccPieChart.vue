<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>

<script>
import { TsccChartBase } from "./TsccChartBase";
const echarts = require("echarts/lib/echarts");
// 引入饼图
require("echarts/lib/chart/pie");
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
        //标题不显示
        title: {
          show:false,
          text: "",
          textStyle: {
            color: "#fff"
          }
          //   top: "5%"
        },
        // tooltip: {
        //   trigger: "axis"
        // },
        legend: {
          data: [],  
           show: false,  
          top:'bottom'
        },

        tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
         toolbox: {
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
               }
          },       
      
        series: [
          {
            name: '饼图',
            type: "pie",
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                  borderRadius: 8
            },
             label: {
              show: true,
              textStyle: {
                color: "#fff"
                },
              formatter: '{b} : {c} ({d}%)'
             },
            radius:'',
            center:[],
            data: []
          }
        ]
      },
      echartsInstance: null
    };
  },
//   mixins: [TsccChartBase], // 混入公有属性
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
      option.title.text = settings.title
      option.series[0].center = settings.center
      option.series[0].radius = this.requiredSettings.radius
      option.legend.bottom = settings.bottom
      option.legend.top = settings.top
      option.legend.data = this.requiredSettings.nameArr;
      // 数据赋值
      for (let i = 0; i < this.chartData.length; i++) {
        option.series[0].data.push({
            value :this.chartData[i],
            name:this.requiredSettings.nameArr[i],
            itemStyle: { color: this.optionalSettings.color[i] }
         });
       
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
        val.forEach((item, i) => {
         this.option.series[0].data[i].value = val[i];
         this.option.series[0].data[i].name = this.requiredSettings.nameArr[i] ;
         this.option.legend.data = this.requiredSettings.nameArr;
       
      });
       // console.log(val);
        //this.option.series.forEach((item, index) => (item.data = val[index]));
        this.renderEChart(this.option);
      },
      immediate: true
    }}
};
</script>
<style scoped>
.echarts-box {
  height: 100%;
}
</style>