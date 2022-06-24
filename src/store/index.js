import { createStore } from 'vuex'

// 模块A
const moduleA = {
  state: {
    username: 'moduleA'
  },
  mutations: {
    updateName (state) {
      state.username = 'moduleA!!!'
    }
  },
  getters: {
    newName (state) {
      return state.username + '~~~'
    }
  }
}
// 模块B
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  mutations: {
    updateName (state) {
      state.username = 'moduleB!!!'
    }
  },
  getters: {
    newName (state) {
      return state.username + '~~~'
    }
  },
  actions: {
    // 假设请求
    updateName(ctx) {
      setTimeout(() => {
        ctx.commit('updateName')
      }, 2000)
    }
  }
}
// vue2.0 创建仓库 new Vuex.store({})
// vue3.0 createStore({})
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})
