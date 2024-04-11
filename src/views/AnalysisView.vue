<template>
  <h1>模型分析</h1>
  <div class="steps">
    <el-steps :active="2" align-center>
      <el-step title="Step 1" description="上传数据文件" />
      <el-step title="Step 2" description="选择模型" />
      <el-step title="Step 3" description="开始分析" />
    </el-steps>
  </div>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件 或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">数据文件应不超过2MB</div>
      </template>
    </el-upload>
  </div>
  <div class="radio-group">
    <el-radio-group v-model="radio" size="large">
      <el-radio-button label="AHP分析法" value="AHP分析法" />
      <el-radio-button label="ANP分析法" value="ANP分析法" />
      <el-radio-button label="dematel分析法" value="dematel分析法" />
    </el-radio-group>
    <el-button type="primary" size="large">开始分析</el-button>
  </div>
  <div class="button-container"></div>
  <h1>信任度量表</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="ED信任度量表">
      <el-table-column prop="[0]" label="序号" width="60" />
      <el-table-column prop="[1]" label="问题" width="235" />
    </el-table-column>
    <el-table-column label="Subject No.1">
      <el-table-column prop="[2]" label="第一次评分" width="100" />
      <el-table-column prop="[3]" label="第二次" width="80" />
      <el-table-column prop="[4]" label="第三次" width="80" />
      <el-table-column prop="[5]" label="第四次" />
    </el-table-column>
    <el-table-column label="Subject No.2">
      <el-table-column prop="[6]" label="第一次评分" width="100" />
      <el-table-column prop="[7]" label="第二次" width="80" />
      <el-table-column prop="[8]" label="第三次" width="80" />
      <el-table-column prop="[9]" label="第四次" />
    </el-table-column>
    <el-table-column label="Subject No.3">
      <el-table-column prop="[10]" label="第一次评分" width="100" />
      <el-table-column prop="[11]" label="第二次" width="80" />
      <el-table-column prop="[12]" label="第三次" width="80" />
      <el-table-column prop="[13]" label="第四次" />
    </el-table-column>
  </el-table>
  <h1>结果分析</h1>
  <div class="charts">
    <div id="firstChart" style="width: 100%; height: 300px"></div>
    <div id="secondChart" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { ElLoading } from "element-plus";
import * as XLSX from "xlsx";
import wonderland from "@/assets/wonderland.json";

const radio = ref("AHP分析法");
const tableData = ref([]);

onMounted(async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  let response = await fetch("/sjs-ED信任度量表+近红外数据+眼动.xlsx");
  let arrayBuffer = await response.arrayBuffer();
  let data = new Uint8Array(arrayBuffer);
  let workbook = XLSX.read(data, { type: "array" });
  let sheetNames = workbook.SheetNames;
  let worksheet = workbook.Sheets[sheetNames[0]];
  let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  tableData.value = jsonData.slice(2, 14);
  console.log(jsonData.slice(2, 14));

  echarts.registerTheme("customed", wonderland);
  const firstChart = echarts.init(
    document.getElementById("firstChart"),
    "customed"
  );
  const secondChart = echarts.init(
    document.getElementById("secondChart"),
    "customed"
  );
  const option1 = {
    title: {
      text: "测试前",
      left: "center",
    },
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 14,
          distance: -40,
          rotate: "tangential",
          formatter: function (value) {
            if (value === 0.875) {
              return "信任";
            } else if (value === 0.625) {
              return "一般信任";
            } else if (value === 0.375) {
              return "一般不信任";
            } else if (value === 0.125) {
              return "不信任";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + "";
          },
          color: "inherit",
        },
        data: [
          {
            value: 0.49,
            name: "信任度",
          },
        ],
      },
    ],
  };
  const option2 = {
    title: {
      text: "测试后",
      left: "center",
    },
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "90%",
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: "auto",
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: "auto",
            width: 5,
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 14,
          distance: -40,
          rotate: "tangential",
          formatter: function (value) {
            if (value === 0.875) {
              return "信任";
            } else if (value === 0.625) {
              return "一般信任";
            } else if (value === 0.375) {
              return "一般不信任";
            } else if (value === 0.125) {
              return "不信任";
            }
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 20,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, "-35%"],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + "";
          },
          color: "inherit",
        },
        data: [
          {
            value: 0.78,
            name: "信任度",
          },
        ],
      },
    ],
  };
  firstChart.setOption(option1);
  secondChart.setOption(option2);
  loadingInstance.close();
});
</script>

<style scoped>
h1 {
  color: var(--theme--color);
}

.steps {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.el-upload__tip {
  display: flex;
  justify-content: center;
}

.radio-group {
  display: flex;
  justify-content: space-between;
}

.charts {
  display: flex;
  justify-content: space-around;
}
</style>
