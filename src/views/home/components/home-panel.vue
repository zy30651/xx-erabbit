<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}
          <small>{{ subTitle }}</small>
        </h3>
        <slot name="right" />
      </div>
      <!-- 默认插槽 -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 副标题
    subTitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.home-panel {
  background-color: #fff;
  .container {
    .head {
      padding: 40px 0;
      display: flex;
      align-items: flex-end;
      h3 {
        flex: 1;
        font-size: 32px;
        font-weight: 400;
        margin: 6px;
        height: 35px;
        line-height: 35px;
        small {
          font-size: 16px;
          color: #999;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
