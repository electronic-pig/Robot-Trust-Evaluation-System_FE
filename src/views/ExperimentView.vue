<template>
  <div id="lineChart" style="width: 100%; height: 600px"></div>
  <div id="mutilineChart" style="width: 100%; height: 600px"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import * as XLSX from "xlsx";
import wonderland from "@/assets/wonderland.json";

onMounted(async () => {
  echarts.registerTheme("customed", wonderland);
  const lineChart = echarts.init(
    document.getElementById("lineChart"),
    "customed"
  );
  const mutilineChart = echarts.init(
    document.getElementById("mutilineChart"),
    "customed"
  );
  const response = await fetch("/sjs-ED信任度量表+近红外数据+眼动.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: "array" });
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[1]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: ["A"],
    defval: "",
  });

  const seriesData = jsonData.map((item) => item.A);
  const xAxisData = seriesData.map((_, index) => (index / 11).toFixed(2));
  const option = {
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

  lineChart.setOption(option);
});
</script>

<style scoped>
</style>
