// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import xtxSkeletonVue from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import xtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
import defaultImg from '@/assets/images/200.png'
// 批量导入需要一个函数 require.context(dir, deep, matching) 目录，是否子目录，正则匹配
const importFn = require.context('./', false, /\.vue$/)

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(xtxSkeletonVue.name, xtxSkeletonVue)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(xtxMore.name, xtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBread)

    // 可以批量注册全局组件 使用require提供的函数context加载某个目录下所有的.vue文件
    // 然后context函数会返回一个导入函数 importFn
    importFn.keys().forEach((key) => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })
    // 定义指令
    defineDirective(app)
  },
}

// 指令
const defineDirective = (app) => {
  // 图片懒加载 在img上使用使用v-lazyload值为图片地址，不设置src属性。
  app.directive('lazyload', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            observer.unobserve(el)
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0.01,
        }
      )
      observer.observe(el)
    },
  })
}
