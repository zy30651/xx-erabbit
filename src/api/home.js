import request from '@/utils/request'

export const findBanner = () => {
  return request('/home/banner', 'get')
}

export const findNew = () => {
  return request('/home/new', 'get')
}
export const findHot = () => {
  return request('/home/hot', 'get')
}
