<template>
  <router-link :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </router-link>
</template>

<script>
export default {
  name: 'XtxMore',
  props: {
    path: {
      type: String,
      default: '/',
    },
  },
}
</script>

<style lang="less" scoped>
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    color: #999;
    margin-right: 4px;
    vertical-align: middle;
  }
  i {
    font-size: 14px;
    color: #ccc;
    top: 2px;
    vertical-align: middle;
    // position: relative;
  }
  &:hover {
    span,
    i {
      color: @xtxColor;
    }
  }
}
</style>
