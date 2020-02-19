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
        path: '/scroll-vertical',
        meta: { title: '纵向滚动' },
        component: () => import('views/scroll-vertical')
      },
      {
        path: '/tree-cli',
        meta: { title: 'tree-cli踩坑' },
        component: () => import('views/tree-cli')
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
