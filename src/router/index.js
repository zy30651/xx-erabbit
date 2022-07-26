import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub.vue'
// 懒加载
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home/index.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Cart = () => import('@/views/cart/index.vue')
const PayCheckout = () => import('@/views/member/pay/checkout.vue')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
    ],
  },

  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/member/checkout', component: PayCheckout },
]
// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({})
const router = createRouter({
  // 使用Hash的路由模式
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址 缺没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})
export default router
