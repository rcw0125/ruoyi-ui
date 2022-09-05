<template>
  <section class="echarts-box">
    <div ref="mainChart" :style="{width:'100%',height:'100%'}"></div>
  </section>
</template>

<script>
import { TsccChartBase } from "./TsccChartBase";
const echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
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
      defaultSettings: {
        xAxisLineColor: "#0c3b71",
        xAxisLabelColor: "rgb(170,170,170)",
        graphicColor: [],
        yAxisIndexArr: new Array(10).fill(0),
        markLineArr: [
          // {
          //   type: "dashed",
          //   color: "#EA4215",
          //   text: "区间高",
          //   position: "middle",
          //   value: 40
          // }
        ]
      },
      option: {
        color: [],
        title: {
          text: "",
          textStyle: {
            color: "#fff"
          },
          top: "5%"
        },
        legend: {
          data: ["笑脸"],
          textStyle: {
            //图列内容样式
            color: "#fff"
          }
          
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          },

          splitArea: {
            show: false
          }, //区域中的分割线
          splitLine: {
            show: false
          }, //网格区域显示
          axisTick: {
            show: true
          }
        },
        yAxis: [
          {
            type: "value",
            name: "",
            position: "left",
           
            nameTextStyle: {
              color: "#fff",
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: "##fff"
              },
              //Y轴竖线是否显示
              show:true
            },
            splitLine: { show: false },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
              formatter: "{value} "
            }

          }
        ],
        tooltip: {
          trigger: "axis"
        },
        // tooltip: {
        //   trigger: "axis",
        //   // formatter: "{b0}<br/>{a0}:{c0}",
        //   axisPointer: {
        //     type: "cross"
        //   }
        // },
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

      // 双y轴处理
      if (settings.yAxisIndexArr.indexOf(1) !== -1) {
        option.yAxis.push(this.setYaxis());
      }
      //单位
      for (let i = 0; i < option.yAxis.length; i++) {
        option.yAxis[i].name = settings.unit[i];
      }
      
      //提示框
      // option.tooltip.formatter += settings.unit;
      //图列
      option.legend.data = settings.legendData;

      option.xAxis.data = this.requiredSettings.xAxisData;

      this.injectBaseSettings(option, settings);

      // series拼接
      this.chartData.forEach((item, i) => {
        this.option.series.push({
          data: this.chartData[i],
          type: "bar",
          label:{show:true},
          name: settings.legendData[i],
          yAxisIndex: settings.yAxisIndexArr[i]
        });
      });
      // 单一柱状图时才加渐变色
      if (this.chartData.length === 1) {
        /**
         * 处理柱状图颜色
         * graphicColor数组中只有一个值：常规颜色
         * graphicColor数组中有多个值：渐变色
         */
        if (settings.graphicColor.length > 1) {
          const linearGradientColorArr = this.getLinearGradientColor(
            settings.graphicColor
          );
          this.option.series[0].itemStyle = {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              linearGradientColorArr
            )
          };
        }
      }
      
      // 新增标线
      if (settings.markLineArr.length > 0) {
        this.option.series[0].markLine = this.getMarkLine(settings.markLineArr);
      }
      // 渲染曲线
      this.renderEChart(this.option);
    },
   
    renderEChart(option) {
      this.echartsInstance.setOption(option);
      //this.echartsInstance.resize();
    },
    // 渐变色处理
    getLinearGradientColor(graphicColor) {
      const graphicColorLength = graphicColor.length;
      return graphicColor.map((item, index) => {
        return {
          offset: Math.round((index / (graphicColorLength - 1)) * 100, 2) / 100,
          color: item
        };
      });
    },
    //区间
    getMarkLine(markLineArr) {
      const data = [];
      markLineArr.forEach(item => {
        data.push({
          silent: false, //鼠标悬停事件  true没有，false有
          lineStyle: {
            //警戒线的样式  ，虚实  颜色
            type: item.type || "dashed",
            color: item.color || "#EA4215"
          },
          label: {
            position: item.position || "end",
            formatter: item.label || ""
          },
          yAxis: item.value
        });
      });
      return {
        symbol: "none", //去掉警戒线最后面的箭头
        data
      };
    },
    setYaxis() {
      return {
        type: "value",
        name: "",
        nameTextStyle: {
          color: "#fff"
        },
        position: "right",
        axisLine: {
          lineStyle: {
            color: "#41538F",
            width: 2
          }
        },
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#fff"
          }
        },
        splitLine: {
          lineStyle: {
            color: "#101C5A"
          }
        }
      };
    }
  },
  watch: {
    chartData: {
      handler(val) {
        if (!this.echartsInstance) {
          return;
        }
        //this.option.series[0].data = val[0];
         //this.option.series[1].data = val[1];
       // console.log(val);
       // this.setOptionData();
       //this.option.series.data=val;
         // series拼接
       val.forEach((item, i) => {
         this.option.series[i].data = val[i];
        // this.option.series.push({
        //   data: this.chartData[i],
        //   type: "bar",
        //   name: settings.legendData[i],
        //   yAxisIndex: settings.yAxisIndexArr[i]
        // });
      });
        this.option.xAxis.data = this.requiredSettings.xAxisData;
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