<template>
  <!-- vue2需要有根元素，vue3.0可以代码片段Fragment -->
  <div>
    App
    <p>{{ $store.state.username }}</p>
    <p>{{ $store.getters.newName }}</p>
    <p>{{ $store.getters['newName'] }}</p>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup(props) {
    // 使用根模块state的数据
    const store = useStore()
    console.log(store.state.username)
    // 2 getters
    console.log(store.getters.newName)
    // 3 mutations
    // store.commit('updateName')
    // console.log(store.state.username)
    // 2 action
    store.dispatch('updateName')
    console.log(store.state.username)
  }
}
</script>
