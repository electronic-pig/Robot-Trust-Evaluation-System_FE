<template>
  <div id="lineChart" style="width: 100%;height:600px;"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import wonderland from "@/assets/wonderland.json"

onMounted(() => {
  echarts.registerTheme("customed", wonderland);
  const myChart = echarts.init(document.getElementById('lineChart'), "customed");

  const option = {
    title: {
      text: '折线图示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }]
  };

  myChart.setOption(option);
});
</script>

<style scoped>
</style>
