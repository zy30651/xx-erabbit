import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
import { findBrand } from '@/api/category'
import XtxSkeleton from '../../../components/library/xtx-skeleton.vue'
export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
      brands: [],
    })
    findBrand().then((data) => {
      brand.brands = data.result
    })
    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        }
      })
      list.push(brand)
      return list
    })
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === categoryId.value)
    })
    return { menuList, currCategory, categoryId }
  },
  components: { XtxSkeleton },
}
