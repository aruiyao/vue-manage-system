import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: "/",
  name: "main",
  component: () => import("@/views/Main"),
  redirect: "/home",
  children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/Home')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserManage/UserManage')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/Video/Video')
    }
  ]
}]

const router = new VueRouter({
  routes
})

export default router