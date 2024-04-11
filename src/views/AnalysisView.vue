<template>
  <h1>模型上传</h1>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      style="width: 45%"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件 或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">数据文件应不超过2MB</div>
      </template>
    </el-upload>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      style="width: 45%"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽文件 或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">模型文件应不超过2GB</div>
      </template>
    </el-upload>
  </div>

  <div class="button-container">
    <el-button type="primary" size="large">开始分析</el-button>
  </div>
  <h1>结果分析</h1>
  <div class="charts">
    <div id="firstChart" style="width: 100%; height: 300px"></div>
    <div id="secondChart" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import wonderland from "@/assets/wonderland.json";

onMounted(() => {
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
});
</script>

<style scoped>
h1 {
  color: var(--theme--color);
}
.button-container {
  display: flex;
  justify-content: center;
}

.upload {
  display: flex;
  justify-content: space-around;
}

.el-upload__tip {
  display: flex;
  justify-content: center;
}

.charts {
  display: flex;
  justify-content: space-around;
}
</style>
