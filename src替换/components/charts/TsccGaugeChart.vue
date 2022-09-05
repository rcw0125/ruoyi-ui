<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>

<script>
import { TsccChartBase } from "./TsccChartBase";
const echarts = require("echarts/lib/echarts");
// 引入仪表盘
require("echarts/lib/chart/gauge");
// 引入渐变色相关组件
require("echarts/lib/component/graphic");
// 引入提示框和标题组件
// require('echarts/lib/component/title')
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/legend')

export default {
  components: {},
  props: {
    chartData: Number, // 图表数据
    requiredSettings: Object, // 必选配置项
    optionalSettings: Object // 可选配置项
  },
  data() {
    return {
      defaultSettings: {},
      option: {
        tooltip: {
          formatter: "{b} : {c}%"
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
            // startAngle: 180,
            // endAngle: 0,
            // radius: "100%",
            // center: ["50%", "65%"],
           progress: {
        show: false,
        width: 18
      },
      axisLine: {
        lineStyle: {
          width: 12,
           color: [
            [0.2, '#fd666d'],
            [0.7, '#E4EF0B'],
            [1, '#0BF11E']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show:true,
        //分割线（10、20等大的刻度的分割线）
        //length 调整分割线的长度
        length: 10,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 15
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      //中间的标题，不显示
      title: {
        show: false,
         color: '#F0F',

      },
            // axisLine: {
            //   show: true,
            //   lineStyle: {
            //     color: [],
            //     width: 10
            //   }
            // },//axisLine.lineStyle.color
            // itemStyle: {
            //   color: "#fff" //auto指针颜色-数值所在区间颜色
            // },
            detail: {
              formatter: this.requiredSettings.name+"{value}%",
              //offsetCenter: [0, "30%"],
              //textStyle: { color: "white", fontSize: 20 }，
               color: 'auto',
               valueAnimation: true,
               fontSize: 24,
               offsetCenter: [0, '70%']
            },
           
            data: []
          }
        ]
      },
      echartsInstance: null
    };
  },
    // mixins: [TsccChartBase], // 混入公有属性
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
      let option = this.option
      //将自定义的color，设置给刻度
      option.series[0].axisLine.lineStyle.color = settings.color
      // 数据赋值
    //   this.injectBaseSettings(option, settings);

      option.series[0].data.push({
        value: this.chartData,
        name: this.requiredSettings.name
      });

      // 渲染曲线
      this.renderEChart(this.option);
    },
    renderEChart(option) {
      
      this.echartsInstance.setOption(option);
      //this.echartsInstance.resize();
      // window.addEventListener("resize", this.echartsInstance.resize);
    }
  },
  watch: {
    chartData: {
      handler(val) {
        if (!this.echartsInstance) {
          return;
        }
        this.option.series[0].data.pop();
        this.option.series[0].data.push({
        value: val,
        name: this.requiredSettings.name
        });
        //console.log(this.option.series[0].data);
        //this.option.series.forEach((item, index) => (item.data = val[index]));
        //this.option.series[0].data.value=val;
        //this.echartsInstance.option.series[0].data.value=val;
        this.renderEChart(this.option);
        //console.log(this.option.series[0].data);
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