import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  name: 'index',
  component: () => import('../views/index.vue')
},
{
  path: '/map',
  name: '轨迹',
  component: () => import('../views/gdmap.vue')
},
{
  name: "登录",
  path: "/",
  component: () => import("../views/user/LoginPage.vue"),
},
{
  name: "注册",
  path: "/register",
  component: () => import("../views/user/register.vue"),

},
{
  path: '/Ai',
  name: 'ai问答',
  component: () => import('../views/ai.vue')
}
]
const router = new VueRouter({
  mode: "history",
  routes
})

export default router