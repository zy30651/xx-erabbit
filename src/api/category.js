// 定义首页需要的函数
import request from '@/utils/request'

// 获取首页头分类数据
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
