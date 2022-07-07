<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <HomeNew />
      <HomeHot />
      <HomeBrand />
      <homeProductVue />
      <HomeSpecial />
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import homeProductVue from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    homeProductVue,
    HomeSpecial,
  },
}
</script>

<style lang="less" scoped></style>
