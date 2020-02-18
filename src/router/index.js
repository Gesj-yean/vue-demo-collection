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
        component: () => import('components/start/start')
      },
      {
        path: '/scroll-vertical',
        meta: { title: '纵向滚动' },
        component: () => import('components/scroll-vertical/scroll-vertical')
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
