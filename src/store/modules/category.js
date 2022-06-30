// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

// 分类列表
export default {
    namespaced: true,
    state() {
        return {
            // 默认的是[]数组；看不见9个分类：等数据加载完毕才能看到；
            // 所以根据常量数据来生成一个顶级分类数据，不会出现空白
            // 分类信息集合
            list: topCategory.map(item => ({ name: item }))
        }
    },
    // 加载数据成功后，需要修改list，所以需要mutations
    mutations: {
        // headCategory 所有的分类的集合
        setCategory(state, headCategory) {
            state.list = headCategory
        },
        show(state, id) {
            const category = state.list.find(item => item.id === id)
            category.open = true
        },
        hide(state, id) {
            const category = state.list.find(item => item.id === id)
            category.open = false
        }
    },
    // 需要向后台加载数据，所以需要action获取数据
    actions: {
        async getList({ commit }) {
            // 获取分类
            const { result } = await findAllCategory()
            // 给一级分类加上一个控制二级分类展示隐藏的数据字段： open
            result.forEach(item => {
                item.open = false
            })
            // 获取数据成功，提交mutations进行数据修改
            commit('setCategory', result)
        }
    }
}