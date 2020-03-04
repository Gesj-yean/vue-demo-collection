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
        component: () => import('blogs/start')
      },
      {
        path: '/scroll',
        meta: { title: 'Scroll 组件纵向滚动演示' },
        component: () => import('blogs/scroll')
      },
      {
        path: '/slider',
        meta: { title: 'Slider 轮播图组件演示' },
        component: () => import('blogs/slider')
      },
      {
        path: '/dialog',
        meta: { title: 'Dialog 对话框组件' },
        component: () => import('blogs/dialog')
      },
      {
        path: '/tree',
        meta: { title: 'Tree 树形控件' },
        component: () => import('blogs/tree')
      },
      {
        path: '/tree-cli',
        meta: { title: 'tree-cli 使用记录' },
        component: () => import('blogs/tree-cli')
      },
      {
        path: '/line-text',
        meta: { title: 'flex实现中间文字，两边横线（1px）' },
        component: () => import('blogs/line-text')
      },
      {
        path: '/css-demo',
        meta: { title: 'CSS揭秘 - 47个css技巧' },
        component: () => import('blogs/css-demo')
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
