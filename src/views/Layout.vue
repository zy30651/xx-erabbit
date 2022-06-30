<template>
    <!-- 顶部导航栏 -->
    <AppTopnav />

    <!-- 头部组件 -->
    <AppHeader />
    <AppHeaderSticky />
    <!-- 内容容器 -->
    <div class='app-body'>
        <!-- 二级路由 -->
        <RouterView></RouterView>
    </div>
    <!-- 底部组件 -->
    <AppFooter />
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
    name: 'XtxLayout',
    components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
    setup(props) {
        const store = useStore()
        store.dispatch('category/getList')
    }
}
</script>

<style lang="less" scoped>
.app-body {
    min-height: 600px;
}
</style>