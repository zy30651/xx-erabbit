<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>
            收
            <i />
            货
            <i />
            人：
          </span>
          {{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span>
          {{ showAddress.contact }}
        </li>
        <li>
          <span>收货地址：</span>
          {{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}
        </li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit()" class="btn">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
      <div
        class="text item"
        v-for="item in list"
        :key="item.id"
        :class="{ active: selectedAddress && item.id === selectedAddress.id }"
        @click="selectedAddress = item"
      >
        <ul>
          <li>
            <span>
              收
              <i></i>
              货
              <i></i>
              人:
            </span>
            {{ item.receiver }}
          </li>
          <li>
            <span>联系方式：</span>
            {{ item.contact }}
          </li>
          <li>
            <span>收货地址：</span>
            {{ item.fullLocation.replace(/ /g, '') + item.address }}
          </li>
        </ul>
      </div>

      <!-- vue3.0仅支持v-slot+template写法 -->
      <template v-slot:footer>
        <XtxButton type="gray" @click="dialogVisible = false" style="margin-right: 20px">
          取消
        </XtxButton>
        <XtxButton type="primary" @click="confirmAddress">确认</XtxButton>
      </template>
    </XtxDialog>

    <!-- 收货地址添加编辑组件 -->
    <AddressEdit @on-success="successHandler" ref="addressEditCom" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
//   props: {
//     list: {
//       type: Array,
//       default: () => [],
//     },
//   },
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
// 1. 在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
// 2. 如果你的组件渲染的代码片段，vue3.0规范，需要在emits中申明你所触发的自定义事件
// 3. 提倡：你发了自定义事件，需要在emits选项申明下，代码可读性很高
//   emits: ['change'],
const emit = defineEmits('change')
// 显示的地址
const showAddress = ref(null)
if (props.list.length) {
  const defaultAddress = props.list.find((item) => item.isDefault === 1)
  if (defaultAddress) {
    showAddress.value = defaultAddress
  } else {
    // 加上一个注释：忽略下面代码的检查eslint
    // eslint-disable-next-line vue/no-setup-props-destructure
    showAddress.value = props.list[0]
  }
}

// 默认通知一个地址ID给父
emit('change', showAddress.value && showAddress.value.id)

// 对话框显示隐藏
const dialogVisible = ref(false)
// 记录当前你选中的地址ID
const selectedAddress = ref(null)
// 打开对话框
const openDialog = () => {
  dialogVisible.value = true
  selectedAddress.value = null
}

// 确认地址
const confirmAddress = () => {
  dialogVisible.value = false
  showAddress.value = selectedAddress.value
  // 默认通知一个地址ID给父
  emit('change', showAddress.value && showAddress.value.id)
}

// 添加收货地址组件
const addressEdit = ref(null)
const openAddressEdit = () => {
  addressEdit.value.open()
}

// 成功
const successHandler = (formData) => {
  const editAddress = props.list.find((item) => item.id === formData.id)
  if (editAddress) {
    // 修改
    for (const key in editAddress) {
      editAddress[key] = formData[key]
    }
  } else {
    const json = JSON.stringify(formData) // 需要克隆下，不然使用的是对象的引用
    // eslint-disable-next-line vue/no-mutating-props
    props.list.unshift(JSON.parse(json))
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
