<template>
  <el-menu
    :default-active="onRoutes"
    :ellipsis="false"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">
      <template v-slot:title>
        <span style="font-size: 16px">{{ item.lable }}</span>
      </template>
    </el-menu-item>

    <div class="menu-right">
      <div class="user-avator">
        <el-icon>
          <Avatar />
        </el-icon>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const menu = [
  {
    path: "/home/survey",
    name: "survey",
    lable: "调查问卷",
    url: "/home/survey",
  },
  {
    path: "/home/experiment",
    name: "experiment",
    lable: "实验验证",
    url: "/home/experiment",
  },
  {
    path: "/home/analysis",
    name: "analysis",
    lable: "数据分析",
    url: "/home/analysis",
  },
];
const router = useRouter();
const route = useRoute();
const username = ref(localStorage.getItem("username"));

const onRoutes = computed(() => {
  return route.path;
});

const handleSelect = (index) => {
  router.push(index);
};

const handleCommand = (command) => {
  if (command === "loginout") {
    localStorage.removeItem("username");
    router.push("/");
  }
};

</script>

<style scoped>
.menu-right {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1%;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.user-avator {
  margin-left: 2vw;
  margin-right: 10px;
}
</style>
