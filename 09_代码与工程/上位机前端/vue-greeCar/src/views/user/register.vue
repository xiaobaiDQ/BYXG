<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="form" :rules="rules" label-width="100px" class="register-form">
      <el-form-item label="用户名" prop="username" class="item">
        <el-input v-model="form.username" placeholder="请输入您的用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="item">
        <el-input type="password" v-model="form.password" placeholder="请输入您的密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" class="item">
        <el-input type="email" v-model="form.email" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" class="item">
        <el-input v-model="form.captcha" placeholder="请输入验证码" class="captcha-input"></el-input>
        <el-button type="primary" @click="generateCaptcha" class="captcha-button">{{ captcha }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" class="submit-button">
          <p>立即注册</p>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '', // 添加 email 字段
        captcha: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 255, message: '用户名长度在 3 到 255 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 255, message: '密码长度在 6 到 255 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6个字符', trigger: 'blur' }
        ]
      },
      captcha: ''
    };
  },
  methods: {
    generateCaptcha() {
      const characters = '0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.captcha = result;
    },
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          axios.post(' http://47.109.191.65:8888/api/register', {
            username: this.form.username,
            password: this.form.password,
            email: this.form.email // 发送邮箱数据
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            Message({
              message: '注册成功，请登录。',
              type: 'success',
              duration: 5000
            });
            //跳转到登录页面的逻辑
            this.$router.push({ path: '/' });
          })
          .catch(error => {
            let errorMessage = '注册失败，请稍后再试。';
            if (error.response && error.response.data) {
              errorMessage = error.response.data.message || errorMessage;
            }
            Message({
              message: errorMessage,
              type: 'error',
              duration: 5000
            });
          });
        } else {
          console.error('表单验证失败！');
          return false;
        }
      });
    }
  },
  mounted() {
    this.generateCaptcha();
  }
};
</script>

<style >
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  background-image: url(../../assets/zcbj.png);
  background-size: cover;
}
.el-button {
 margin-top:10px ;
}
.register-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.el-form-item__label {
  display: flex;
  padding-left: 0;
  /* width: 100%; */
  /* justify-content: flex-start; */
  text-align: left;
}
.register-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.el-form-item__label {
  display: flex;
  padding-left: 0;
  /* width: 100%; */
  /* justify-content: flex-start; */
  text-align: left;
}
.captcha-form-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* .captcha-button{
  display: flex;
  padding-left: 80px;
} */
.captcha-input {
  flex: 1;
  margin-right: 0px;
}
.el-button--primary{
  display: flex;
  /* justify-content: end; */
  align-self: center;
}
.submit-button {
  width: 100%;
  display: flex;
  padding-left: 80px;
}
</style>