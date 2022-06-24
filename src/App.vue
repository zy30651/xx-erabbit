<template>
    <div>
    <!-- 使用A模块的state -->
    <p>{{$store.state.moduleA.username}}</p>
    <!-- 使用A模块的getter -->
    <p>{{$store.getters.newName}}</p>
    <!-- 使用B模块的state -->
    <p>{{$store.state.moduleB.username}}</p>
    <!-- 使用B模块的getter(其他类似)  带命名空间,需要中括号 -->
    <p>{{$store.getters['moduleB/newName']}}</p>
    <button @click="mutationsFn">mutations</button>
    <button @click="actionFn">action</button>
    </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup(props) {
    const store = useStore()
    const actionFn = () => {
      store.dispatch('moduleB/updateName')
    }
    const mutationsFn = () => {
      store.commit('moduleB/updateName')
    }
    return { actionFn, mutationsFn }
  }
}
</script>

<style lang="scss" scoped>
</style>
