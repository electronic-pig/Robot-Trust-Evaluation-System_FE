<template>
  <div id="lineChart" style="width: 100%; height: 600px"></div>
  <div id="mutilineChart" style="width: 100%; height: 600px"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElLoading } from "element-plus";
import * as echarts from "echarts";
import * as XLSX from "xlsx";
import wonderland from "@/assets/wonderland.json";

onMounted(async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  echarts.registerTheme("customed", wonderland);
  const lineChart = echarts.init(
    document.getElementById("lineChart"),
    "customed"
  );
  const mutilineChart = echarts.init(
    document.getElementById("mutilineChart"),
    "customed"
  );
  let response = await fetch("/sjs-ED信任度量表+近红外数据+眼动.xlsx");
  let arrayBuffer = await response.arrayBuffer();
  let data = new Uint8Array(arrayBuffer);
  let workbook = XLSX.read(data, { type: "array" });
  let sheetNames = workbook.SheetNames;
  let worksheet = workbook.Sheets[sheetNames[1]];
  let jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["A"],
    defval: "",
  });

  let seriesData = jsonData.map((item) => item.A);
  let xAxisData = seriesData.map((_, index) => (index / 11).toFixed(2));

  const option1 = {
    title: {
      text: "近红外数据",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      data: ["HbO浓度"],
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        formatter: "{value} s",
      },
    },
    yAxis: {
      name: "浓度 (mmol/L*mm)",
    },
    series: [
      {
        name: "HbO浓度",
        type: "line",
        data: seriesData,
        symbolSize: 6,
      },
    ],
    dataZoom: [
      {
        type: "slider",
        start: 95,
        end: 100,
      },
    ],
  };

  lineChart.setOption(option1);

  response = await fetch("/眼动数据.xlsx");
  arrayBuffer = await response.arrayBuffer();
  data = new Uint8Array(arrayBuffer);
  workbook = XLSX.read(data, { type: "array" });
  sheetNames = workbook.SheetNames;
  worksheet = workbook.Sheets[sheetNames[0]];
  jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["A", "B", "C"],
    defval: "",
  });
  const seriesData1 = jsonData.map((item) => item.A);
  const seriesData2 = jsonData.map((item) => item.B);
  const seriesData3 = jsonData.map((item) => item.C);

  xAxisData = seriesData1.map((_, index) => (index / 11).toFixed(2));

  const option2 = {
    title: {
      text: "眼动数据",
    },
    tooltip: {
      trigger: "axis",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      data: ["R<=0.5", "R<=1", "R>1"],
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        formatter: "{value} s",
      },
    },
    yAxis: {
      name: "概率值",
    },
    series: [
      {
        name: "R<=0.5",
        type: "line",
        data: seriesData1,
        symbolSize: 4,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
      {
        name: "R<=1",
        type: "line",
        data: seriesData2,
        symbolSize: 4,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
      {
        name: "R>1",
        type: "line",
        data: seriesData3,
        symbolSize: 4,
        markLine: {
          data: [{ type: "average", name: "Avg" }],
        },
      },
    ],
  };

  mutilineChart.setOption(option2);
  loadingInstance.close();
});
</script>

<style scoped>
</style>
