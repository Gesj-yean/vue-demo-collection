import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

export const routes = [
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
      },
      {
        path: '/line-text',
        meta: { title: 'flex实现中间文字，两边横线（1px）' },
        component: () => import('views/line-text')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
