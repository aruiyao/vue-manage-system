<template>
  <div style="height: 100%" ref="echart">echart</div>
</template>

<script>
  import echarts from "echarts";
  export default {
    props: {
      chartData: {
        type: Object,
        default () {
          return {};
        }
      },
      isAxisChart: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        echart: null,
        axisOption: {
          grid: {
            left: "15 %"
          },
          legend: {
            textStyle: {
              color: "#333"
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            },
            axisLabel: {
              color: "#333"
            }
          },
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: "#17b3a3"
              }
            }
          }],
          series: [],
          color: [
            '#2ec7c9',
            '#b6a2de',
            '#5ab1ef',
            '#ffb980',
            '#d87a80',
            '#8d98b3',
            '#e5cf0d',
            '#97b552',
            '#95706d',
            '#dc69aa',
            '#07a2a4',
            '#9a7fd1',
            '#588dd5',
            '#f5994e',
            '#c05050',
            '#59678c',
            '#c9ab00',
            '#7eb00a',
            '#6f5553',
            '#c14089'
          ],
        },
        normalOption: {
          color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
          tooltip: {
            trigger: 'item'
          },
          series: []
        }
      };
    },
    computed: {
      options() {
        return this.isAxisChart ? this.axisOption : this.normalOption;
      },
      isCollapse() {
        return this.$store.state.menu.isCollapse;
      }
    },
    methods: {
      initChart() {
        this.initChartData();
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      },
      initChartData() {
        if (this.isAxisChart) {
          this.axisOption.xAxis.data = this.chartData.xData;
          this.axisOption.series = this.chartData.series;
        } else {
          this.normalOption.series = this.chartData.series;
        }
      },
      resizeChart() {
        this.echart ? this.echart.resize() : ''
      }
    },
    watch: {
      chartData: {
        handler() {
          this.initChart();
        },
        deep: true
      },
      isCollapse: {
        handler() {
          setTimeout(() => {
            this.resizeChart();
          }, 300)
        },
      }
    },
    mounted() {
      window.addEventListener('resize', this.resizeChart)
    },
  };
</script>

<style scoped>
</style>