<template>
  <h1>面向康复护理机器人的人机信任度调查问卷</h1>
  <div v-for="(item, index) in items" :key="index">
    <p>{{ item }}</p>
    <div class="agree"><span>很不同意</span> <span>很同意</span></div>
    <el-divider />
    <el-radio-group v-model="radios[index]" size="large">
      <el-tooltip content="很不同意" placement="top"
        ><el-radio :value="1">1</el-radio></el-tooltip
      >
      <el-tooltip content="不同意" placement="top"
        ><el-radio :value="2">2</el-radio></el-tooltip
      >
      <el-tooltip content="一般" placement="top"
        ><el-radio :value="3">3</el-radio></el-tooltip
      >
      <el-tooltip content="同意" placement="top"
        ><el-radio :value="4">4</el-radio></el-tooltip
      >
      <el-tooltip content="很同意" placement="top"
        ><el-radio :value="5">5</el-radio></el-tooltip
      >
    </el-radio-group>
  </div>
  <div class="button-container">
    <el-button type="primary" size="large" @click="handleSubmit">
      提交
    </el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const radios = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const items = ref([
  "1.我认为康复护理机器人能够准确地执行医生的建议。",
  "2.我认为康复护理机器人能够根据我的身体状况做出正确的调整。",
  "3.我认为康复护理机器人能够在我无法自理时提供帮助。",
  "4.我认为康复护理机器人能够根据患者的身体状况提供个性化的护理建议。",
  "5.我认为康复护理机器人能够提高我的生活质量。",
  "6.我认为康复护理机器人能够减轻医护人员的工作负担。",
  "7.我认为康复护理机器人在紧急情况下能可靠地工作。",
  "8.我愿意让康复护理机器人辅助我进行身体康复练习。",
  "9.我认为康复护理机器人能够理解我的特定需求和反应。",
  "10，我认为康复护理机器人能够提供与人类护理相媲美的关怀。",
]);

const handleSubmit = () => {
  ElMessage.success("提交成功");
};
</script>

<style scoped>
h1 {
  margin: 0 0 40px 0;
  text-align: center;
  font-size: 30px;
  color: var(--el-color-primary);
}

p {
  font-size: 20px;
  margin: 0;
  margin-top: 20px;
  color: #555;
}

.agree {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: 16px 4px 0 4px;
  color: #555;
}

.el-divider--horizontal {
  margin: 10px 0;
}

.el-radio-group {
  display: flex;
  justify-content: space-around;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
