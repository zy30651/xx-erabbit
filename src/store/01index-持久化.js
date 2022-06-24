import { createStore } from 'vuex'

// vue2.0 创建仓库 new Vuex.store({})
// vue3.0 createStore({})
export default createStore({
  state: {
    username: 'zs'
  },
  getters: {
    newName(state) {
      return state.username + '!!'
    }
  },
  mutations: {
    // 修改名字的mutation
    updateName(state) {
      state.username = 'ww'
    }
  },
  actions: {
    // 假设请求
    updateName(ctx) {
      setTimeout(() => {
        ctx.commit('updateName')
      }, 2000)
    }
  },
  modules: {
  }
})
