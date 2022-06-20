export const TsccChartBase = {
    data() {
        return {
            defaultSettings: {
                title: "",
                titleColor: '#fff',
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                color: ["#3E1CDC", "#097CEB", "#21C76E"],
                xAxisLineColor: "#fff",
                xAxisLabelColor: "#fff",
                yAxisLineColor: "#fff",
                yAxisLabelColor: "#fff",
                backgroundColor:'transparent'
            }
        }
    },
    methods: {
        injectBaseSettings(option, settings) {
            option.grid = settings.grid;
            option.title.text = settings.title;
            option.title.textStyle.color = settings.titleColor;
            option.xAxis.axisLine.lineStyle.color = settings.xAxisLineColor;
            option.xAxis.axisLabel.textStyle.color = settings.xAxisLabelColor;
            option.color = settings.color;
            option.backgroundColor = settings.backgroundColor;
            for (let i = 0; i < option.yAxis.length; i++) {
                option.yAxis[i].axisLine.lineStyle.color = settings.yAxisLineColor;
                option.yAxis[i].axisLabel.textStyle.color = settings.yAxisLabelColor;
              }
        }
    }
}