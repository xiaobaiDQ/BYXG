// main.js (Vue 2 版本)
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 必须前置引入
import DataV from '@jiaminghi/data-view';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

// 绑定 Axios 到 Vue 原型
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://47.109.191.65:8888'; // 后端地址,上线时应修改

// 注册 ElementUI
Vue.use(ElementUI);

// 注册 DataV（需确认是否支持 Vue2）
Vue.use(DataV);

// 注册图标库（需确认 vue-awesome 版本）
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/index.js';
Vue.component('icon', Icon);

// 全局样式
import './assets/scss/style.scss';

// 创建 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');