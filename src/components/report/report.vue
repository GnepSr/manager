<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row type="flex" justify="space-between" align="center">
        <el-col :span="10">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main1" style="width: 600px;height:400px;"></div>
        </el-col>

        <el-col :span="10">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main2" style="width: 522px;height:450px;"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      getChart1() {
        // 基于准备好的dom，初始化echarts实例
        var chart = this.$echarts.init(document.getElementById('main1'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        chart.setOption(option);
      },
      getChart2() {
        var chart = this.$echarts.init(document.getElementById('main2'));

        var option = {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [{
                value: 1048,
                name: '搜索引擎'
              },
              {
                value: 735,
                name: '直接访问'
              },
              {
                value: 580,
                name: '邮件营销'
              },
              {
                value: 484,
                name: '联盟广告'
              },
              {
                value: 300,
                name: '视频广告'
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };

        chart.setOption(option);
      }
    },
    mounted() {
      this.getChart1()
      this.getChart2()
    }
  }

</script>

<style lang="less" scoped>
  .el-card {
    margin-top: 20px;
  }

</style>
