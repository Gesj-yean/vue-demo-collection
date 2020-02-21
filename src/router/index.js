import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/start',
    component: () => import('views/home'),
    children: [
      {
        path: '/start',
        meta: { title: '起步' },
        component: () => import('views/start')
      },
      {
        path: '/scroll',
        meta: { title: 'Scroll 组件纵向滚动演示' },
        component: () => import('views/scroll')
      },
      {
        path: '/slider',
        meta: { title: 'Slider 轮播图组件演示' },
        component: () => import('views/slider')
      },
      {
        path: '/tree-cli',
        meta: { title: 'tree-cli 使用记录' },
        component: () => import('views/tree-cli')
      },
      {
        path: '/dialog',
        meta: { title: 'dialog对话框组件' },
        component: () => import('views/dialog')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
