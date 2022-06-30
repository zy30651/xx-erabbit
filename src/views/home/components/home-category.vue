<!-- 首页主体-左侧分类 -->
<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="item in menuList" :key="item.id">
                <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
                <template v-if="item.children">
                    <router-link v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">
                        {{ sub.name }}
                    </router-link>
                </template>
            </li>
        </ul>
        <!-- 左侧分类-鼠标滑过的弹层 -->
        <div class="layer">
            <h4>{{ currCategory && currCategory.id === 'brand' ? "品牌" : "分类" }}推荐
                <small>根据您的购买或浏览记录推荐</small>
            </h4>
            <!-- 商品 -->
            <ul v-if="currCategory && currCategory.goods">
                <li v-for="item in currCategory.goods" :key="item.id">
                    <router-link>
                        <img src="" alt="">
                        <div class="info">
                            <p class="name ellipsis-2">{{ item.name }}</p>
                            <p class="desc ellipsis">{{ item.desc }}</p>
                            <p class="price"><i>￥</i>{{ item.price }}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <!-- 品牌 -->
            <ul v-if="currCategory && currCategory.brands">
                <li></li>
            </ul>
        </div>
    </div>

</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'

export default {
    name: 'HomeCategory',
    setup() {
        const store = useStore()
        const brand = reactive({
            id: 'brand',
            name: '品牌',
            children: [{ id: 'brand-children', name: '品牌推荐' }]
        })
        const menuList = computed(() => {
            const list = store.state.category.list.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    // 防止初始化没有children的时候调用slice函数报错
                    children: item.children && item.children.slice(0, 2)
                }
            })
            list.push(brand)
            return list
        })
        const categoryId = ref(null)
        const currCategory = computed(() => {
            return menuList.value.find(item => item.id === categoryId.value)
        })
        return { menuList, currCategory }
    }
}
</script>

<style lang="less" scoped>
.home-category {
    background: rgba(0, 0, 0, 0.8);
    width: 250px;
    height: 500px;
    position: relative;
    z-index: 99;

    .menu {
        li {
            padding-left: 40px;
            height: 50px;
            line-height: 50px;

            &:hover {
                background: @xtxColor;
            }
        }

        a {
            color: #fff;
            margin-right: 4px;

            &:first-child {
                font-size: 16px;
            }
        }
    }
}
</style>