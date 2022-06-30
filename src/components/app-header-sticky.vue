<!-- 吸顶头部组件 -->
<template>
    <div class="app-header-sticky" :class="{ show: y >= 78 }">
        <div class="container" v-show="y >= 78">
            <!-- v-show 为了吸顶头部的内容，不遮住不吸顶的头部 -->
            <!-- <div class="container"> -->
            <router-link class="logo" to="/"></router-link>
            <AppHeaderNav></AppHeaderNav>
            <div class="right">
                <router-link to="/">品牌</router-link>
                <router-link to="/">专题</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav.vue'
// import { onMounted, ref } from 'vue'
// - useWindowScroll() 是@vueuse/core提供的api可返回当前页面滚动时候蜷曲的距离。x横向，y纵向
// - vue3.0组合API提供了更多逻辑代码封装的能力。@vueuse/core 基于组合API封装好用的工具函数
import { useWindowScroll } from '@vueuse/core'
export default {
    name: 'AppHeaderSticky',
    components: {
        AppHeaderNav
    },
    setup() {
        // const y = ref(0)
        // onMounted(() => {
        //     window.onscroll = () => {
        //         const scrollTop = document.documentElement.scrollTop
        //         y.value = scrollTop
        //     }
        // })
        const { y } = useWindowScroll()
        return { y }
    }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;

    transform: translate(-100%);
    opacity: 0;

    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;

        .logo {
            background-color: red;
            width: 200px;
            height: 80px;
            background: url(../assets/images/logo.png) no-repeat right 2px;
            background-size: 160px auto;
        }

        .right {
            width: 220px;
            display: flex;
            text-align: center;
            padding-left: 40px;
            border-left: 2px solid @xtxColor;

            a {
                width: 38px;
                margin-right: 40px;
                font-size: 16px;
                line-height: 1;

                &:hover {
                    color: @xtxColor;
                }

                ;
            }
        }
    }
}
</style>