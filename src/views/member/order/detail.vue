<template>
  <div class="order-detail-page" v-if="order">
    <!-- 操作栏 -->
    <DetailAction :order="order" />
    <!-- 步骤条 组件xtx-steps.vue-->
    <DetailSteps :order="order" />
    <!-- 物流栏 -->
    <Suspense v-if="[3, 4, 5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
  </div>
</template>
<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics'
export default {
  name: 'OrderDetailPage',
  components: { DetailAction, DetailSteps, DetailLogistics },
  setup() {
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then((data) => {
      order.value = data.result
    })
    return { order }
  },
}
</script>
<style scoped lang="less">
.order-detail-page {
  background: #fff;
}
</style>
