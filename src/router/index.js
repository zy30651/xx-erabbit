import { createRouter, createWebHashHistory } from 'vue-router'
// 懒加载
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home }
    ]
  }
]
// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({})
const router = createRouter({
  // 使用Hash的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
