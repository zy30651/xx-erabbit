// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then((data) => {
          result.value = data.result
        })
      }
    },
    {
      // threshold容器和可视区交叉的占比(进入的面积/容器完整面试)取值，0-1
      //  默认比0大，所以需要滚动较多的才能出发进入可视区域事件
      threshold: 0,
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}
