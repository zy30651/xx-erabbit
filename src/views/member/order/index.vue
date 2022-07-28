<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @click-tab="clickTab">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        {{ item.title }}
      </XtxTabsPanel>
    </XtxTabs>
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        @on-cancel="handlerCancel"
        @on-delete="handlerDelete"
        @on-confirm="handlerConfirm"
        @on-logistics="handlerLogistics"
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></OrderItem>
    </div>

    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > requestParams.pageSize"
      :current-page="reqParams.page"
      :page-size="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    />
    <!-- 取消原因组件 -->
    <!-- <OrderCancel ref="orderCancelCom" /> -->
    <!-- 查看物流组件 -->
    <!-- <OrderLogistics ref="orderLogisticsCom" /> -->
  </div>
</template>
<script>
import OrderItem from './components/order-item.vue'
import { reactive, ref, watch } from 'vue'
import { confirmOrder, deleteOrder, findOrderList } from '@/api/order'
import { orderStatus } from '@/api/constants'
import OrderCancel from './components/order-cancel'
import orderLogistics from './components/order-logistics.vue'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'MemberOrder',
  component: {
    OrderItem,
    OrderCancel,
    orderLogistics,
  },
  setup() {
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0,
    })
    // 订单列表
    const orderList = ref([])
    const total = ref(0)
    const loading = ref(false)
    // 查询订单

    const getOrderList = () => {
      loading.value = true
      findOrderList(requestParams).then((data) => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(
      requestParams,
      () => {
        getOrderList()
      },
      { immediate: true }
    )

    const activeName = ref('all')

    const clickTab = (tab) => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    // 删除订单
    const handlerDelete = (order) => {
      Confirm({ text: '亲，您确认删除该订单吗？' })
        .then(() => {
          deleteOrder(order.id).then(() => {
            Message({ type: 'success', text: '删除成功' })
            getOrderList()
          })
        })
        .catch(() => {})
    }
    return {
      ...useCancelOrder(),
      ...useConfirm(),
      ...useLogistics(),
      activeName,
      clickTab,
      orderStatus,
      requestParams,
      orderList,
      total,
      loading,
      handlerDelete,
    }
  },
}
// 封装逻辑-取消订单
const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
  }
  return { handlerCancel, orderCancelCom }
}
// 确认收货逻辑
export const useConfirm = () => {
  const handlerConfirm = (order) => {
    Confirm({ text: '亲，您确认收货吗？确认后货款将打给卖家。' })
      .then(() => {
        confirmOrder(order.id).then(() => {
          Message({ type: 'success', text: '确认收货成功' })
          // 待收货--->待评价
          order.orderState = 4
        })
      })
      .catch(() => {})
  }
  return { handlerConfirm }
}
// 查看物流逻辑
export const useLogistics = () => {
  const orderLogisticsCom = ref(null)
  const handlerLogistics = (order) => {
    orderLogisticsCom.value.open(order)
  }
  return { handlerLogistics, orderLogisticsCom }
}
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  position: relative;
  min-height: 400px;
  padding: 20px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
