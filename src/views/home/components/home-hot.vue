<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <div ref="target" style="position: relative; height: 426px">
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </router-link>
            </li>
          </ul>
          <homeSkeleton v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import homeSkeleton from './home-skeleton.vue'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    homeSkeleton,
  },
  setup() {
    const { target, result } = useLazyData(findHot)
    return { goods: result, target }
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
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
