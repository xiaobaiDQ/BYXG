<template>
  <div class="login-img">
    <div class="background">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="150px">
        <h3>用户登录</h3>
        <el-form-item label="请输入用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-button class="new-button" type="primary" @click="login">
          <p>确认登录</p>
        </el-button>
        <div class="social">
          <div class="go" @click="goToRegister">用户注册</div>
          <div class="fb" @click="handleCantLogin">无法登录</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../../utils/Request';

export default {
  data() {
    return {
      loginForm: {
        username: '', // 接收用户名或邮箱
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          request.post("http://47.109.191.65:8888/dl/login", this.loginForm).then(res => {
            console.log('响应内容:', res); // 打印响应内容

            if (res.token) { // 如果 token 存在，表示登录成功
              localStorage.setItem("token", res.token);
              this.$message.success("登录成功");
              // 确保 DOM 更新后再进行跳转
              this.$nextTick(() => {
                this.$router.push({ path: '/home' });
              });
            } else {
              this.$message.error(res.message || '登录失败');
            }
          }).catch(error => {
            console.error('请求错误:', error);
            this.$message.error('登录请求失败，请稍后再试');
          });
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    goToRegister() {
      this.$nextTick(() => {
        this.$router.push({ path: '/register' });
      });
    },
    handleCantLogin() {
      this.$message.info('请检查您的用户名或密码是否正确。如果您忘记了密码，请联系支持团队。');
    }
  }
};
</script>

<style>
body {
  padding: 0;
    margin: 0;
}
*{
    box-sizing: border-box;
}
.login-img {
  background-image: url(../../assets/bj.png);
  background-size: cover;
  height: 100vh;
}

body {
  background-color: #080710;
}

.background {
  width: 430px;
  height: 540px;
  position: absolute;
  transform: translate(-30%, -50%);
  left: 50%;
  top: 50%;
}

.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}

.el-form {
  height: 540px;
  width: 420px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-30%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}

.el-form * {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

.el-form-item {
  display: block;
  margin-bottom: 15px;
}

.el-form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

.el-form p {
  color: #D3D3D3;
  font-size: 18px;
}

.el-form-item__label {
  display: flex;
  width: 100%;
  /* justify-content: center; */
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  padding-left:0px;
  padding-bottom: 0;
}

.el-input__inner {
  display: flex;
  height: 45px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
}

::placeholder {
  color: #e5e5e5;
}

.new-button {
  margin-top: 35px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

.social {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.social div {
  width: 150px;
  border-radius: 3px;
  padding: 10px 10px 5px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
  cursor: pointer;
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
  margin-left: 25px;
}

.social i {
  margin-right: 4px;
}
</style>