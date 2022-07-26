// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net'
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios的配置
  baseURL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    // 拦截业务逻辑，请求前配置修改
    // 如果本地有token，则头部携带添加
    const { profile } = store.state.user
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// res => res.data 取出data的数据，将来调用接口直接拿到的就是后台的数据
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log('response')
    console.log(err)
    // 401状态码，进入该函数
    if (err.response && err.response.status === 401) {
      // 1清空无效用户信息
      // 2跳转登录页
      // 3跳转需要传参(当前路由地址)，给登陆页码
      store.commit('user/setUser', {})
      // 当前路由地址, 组件里头: `/user?a=10` $route.path===/user
      // $route.fullpath === /user?a=10
      // js模块中: router.currentRoute.value.fullPath就是当前的路由地址
      // router.currentRoute是ref响应式数据,所以要.value
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      // encodeURIComponent转换ur编码；防止解析地址出问题；因为可能出现特殊字符串
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 封装请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // get请求，使用params post请求使用data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
