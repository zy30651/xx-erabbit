<template>
  <div class="home-new">
    <homePanel :title="title" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/"></XtxMore>
      </template>
      <div ref="target" style="position: relative; height: 406px">
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
          <homeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </homePanel>
  </div>
</template>

<script>
import homePanel from './home-panel.vue'
import homeSkeleton from './home-skeleton.vue'
import XtxMore from '@/components/library/xtx-more.vue'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: {
    homePanel,
    XtxMore,
    homeSkeleton,
  },
  setup() {
    const title = '新鲜好物'
    // const goods = ref([])
    // findNew().then((data) => {
    //   goods.value = data.result
    // })

    // 懒加载, 抽离至hook/index.js
    // const box = ref(null)
    // const { stop } = useIntersectionObserver(box, ([{ isIntersecting }]) => {
    //   if (isIntersecting) {
    //     stop()
    //     findNew().then((data) => {
    //       goods.value = data.result
    //     })
    //   }
    // })
    // return { goods, title }
    const { target, result } = useLazyData(findNew)
    return { goods: result, target, title }
  },
}
</script>

<style lang="less" scoped>
.goods-list {
  height: 406px;
  display: flex;
  justify-content: space-between;
  li {
    width: 306px;
    height: 406px;
    background-color: #f0f9f4;
    .hoverShadow();
    img {
      height: 306px;
      width: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
