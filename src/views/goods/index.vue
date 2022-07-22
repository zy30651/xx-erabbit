<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[1].id">
          {{ goods.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[0].id">
          {{ goods.categories[0].name }}
        </XtxBreadItem>
        <XtxBreadItem to="/">{{ goods.name }}</XtxBreadItem>
      </xtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku :goods="goods" @change="changeSku" />
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <XtxButton type="primary" style="margin-top: 20px" @click="insertCart()">
            加入购物车
          </XtxButton>
        </div>
      </div>
      <!-- 推荐商品 -->
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn />
          </div>
        </div>

        <!-- 热榜 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsWarn from './components/goods-warn'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import { nextTick, provide, ref, watch } from 'vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs'
import GoodsHot from './components/goods-hot'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsWarn,
    GoodsHot,
    GoodsSales,
    GoodsImage,
    GoodsName,
    GoodsSku,
    GoodsTabs,
  },
  setup() {
    const goods = useGoods()

    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory

        currSku.value = sku
      } else {
        currSku.value = null
      }
    }
    // 提供goods数据给后代组件使用
    provide('goods', goods)
    const num = ref(1)

    // 加入购物车逻辑
    const currSku = ref(null)
    const store = useStore()
    const insertCart = () => {
      console.log(currSku.value)
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store
          .dispatch('cart/insertCart', {
            skuId,
            attrsText,
            stock,
            id,
            name,
            price,
            nowPrice: price,
            picture: mainPictures[0],
            selected: true,
            isEffective: true,
            count: num.value,
          })
          .then(() => {
            Message({ type: 'success', text: '加入购物车成功' })
          })
      } else {
        Message({ text: '请选择完整规格' })
      }
    }
    return { goods, changeSku, num, insertCart }
  },
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          // 让商品数据为null，后使用v-if的组件可以销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
      // 注意：`处理后台数据不规范，规格属性顺序和sku属性顺序不一致问题`
      // `src/views/goods/index.vue` 现在无需处理。
      // findGoods('1369155859933827074').then(({ result }) => {
      //   result.skus.forEach((sku) => {
      //     const sortSpecs = []
      //     result.specs.forEach((spec) => {
      //       sortSpecs.push(sku.specs.find((item) => item.name === spec.name))
      //     })
      //     sku.specs = sortSpecs
      //   })
      //   goods.value = result
      // })
    },
    { immediate: true }
  )
  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
