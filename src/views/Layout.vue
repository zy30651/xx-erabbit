<template>
    <!-- 顶部导航栏 -->
    <AppTopnav />

    <!-- 头部组件 -->
    <AppHeader />
    <!-- 内容容器 -->
    <div class='main'>
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
export default {
    name: 'XtxLayout',
    components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style lang="less" scoped>
</style>