<template>
  <div class="background">
    <div class="center-container">
      <div class="animated-text">
        <h1>康复护理机器人信任度评估系统</h1>
        <h3>Rehabilitation Nursing Robot Trust Evaluation System</h3>
      </div>
      <div class="btn-container animated-text">
        <button class="btn-hover btn-color" @click="showRegisterDialog = true">
          点击注册
        </button>
        <button class="btn-hover btn-color" @click="showLoginDialog = true">
          点击登录
        </button>
      </div>
    </div>
    <el-dialog
      title="注册"
      v-model="showRegisterDialog"
      width="300"
      align-center
      center
      :show-close="false"
    >
      <el-form :model="registerForm">
        <el-form-item>
          <el-input
            v-model="registerForm.username"
            autocomplete="off"
            placeholder="用户名"
            ><template #prepend>
              <el-icon>
                <Avatar />
              </el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
            show-password
            placeholder="密码"
            ><template #prepend>
              <el-icon>
                <Lock />
              </el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="registerForm.checkPassword"
            autocomplete="off"
            show-password
            placeholder="确认密码"
            ><template #prepend>
              <el-icon>
                <Lock />
              </el-icon> </template
          ></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="default" @click="showRegisterDialog = false"
            >取消</el-button
          >
          <el-button type="primary" @click="register">注册</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="登录"
      v-model="showLoginDialog"
      width="300"
      align-center
      center
      :show-close="false"
    >
      <el-form :model="loginForm">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
            placeholder="用户名"
            ><template #prepend>
              <el-icon>
                <Avatar />
              </el-icon> </template
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            show-password
            placeholder="密码"
            ><template #prepend>
              <el-icon>
                <Lock />
              </el-icon> </template
          ></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="default" @click="showLoginDialog = false"
            >取消</el-button
          >
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElLoading, ElMessage } from "element-plus";

const router = useRouter();
const showLoginDialog = ref(false);
const showRegisterDialog = ref(false);

const registerForm = reactive({
  username: "",
  password: "",
  checkPassword: "",
});
const loginForm = reactive({
  username: "",
  password: "",
});

const login = () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.error("请填写完整的登录信息！");
    return;
  }
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  router.push("/home/survey");
  localStorage.setItem("username", loginForm.username);
  loadingInstance.close();
};

const register = () => {
  if (
    !registerForm.username ||
    !registerForm.password ||
    !registerForm.checkPassword
  ) {
    ElMessage.error("请填写完整的注册信息");
    return;
  }

  if (registerForm.password !== registerForm.checkPassword) {
    ElMessage.error("两次输入的密码不一致");
    return;
  }
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  ElMessage.success("注册成功！");
  showRegisterDialog.value = false;
  registerForm.username = "";
  registerForm.password = "";
  registerForm.checkPassword = "";
  loadingInstance.close();
};
</script>

<style scoped>
.background {
  background-image: url(../assets/background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.center-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
}

h1 {
  margin-bottom: 0;
  font-weight: 500;
  color: #333;
  font-size: 80px;
  text-align: center;
}

h3 {
  font-family: serif;
  font-weight: bold;
  color: #333;
  font-size: 30px;
  text-align: center;
}

@keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animated-text {
  animation: slideInFromBottom 1s ease forwards;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
}

.btn-hover {
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin: 20px;
  height: 55px;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 50px;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.btn-color {
  background-image: linear-gradient(
    to right,
    #36a99e,
    #4cb3a9,
    #79c6be,
    #a6d9d4
  );
  box-shadow: 0 4px 15px 0 #4cb3a9;
}
</style>
