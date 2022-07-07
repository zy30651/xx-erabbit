<template>
  <div class="home-special" ref="target">
    <homePanel title="最新专题">
      <template #right>
        <XtxMore path="/" />
      </template>
    </homePanel>
    <div class="special-list">
      <div class="special-item" v-for="item in list" :key="item.id">
        <router-link to="/">
          <img :src="item.cover" alt="" />
          <div class="meta">
            <p class="title">
              <span class="top ellipsis">{{ item.title }}</span>
              <span class="sub ellipsis">{{ item.summary }}</span>
            </p>
            <span class="price">&yen;{{ item.lowestPrice }}起</span>
          </div>
        </router-link>
        <div class="foot">
          <span class="like">
            <i class="iconfont icon-hart1"></i>
            {{ item.collectNum }}
          </span>
          <span class="view">
            <i class="iconfont icon-see"></i>
            {{ item.viewNum }}
          </span>
          <span class="reply">
            <i class="iconfont icon-message"></i>
            {{ item.replyNum }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLazyData } from '@/hooks'
import { findSpecial } from '@/api/home'
import homePanel from './home-panel.vue'
export default {
  name: 'HomeSpecial',
  components: {
    homePanel,
  },
  setup() {
    const { target, result } = useLazyData(findSpecial)
    return { target, list: result }
  },
}
</script>

<style lang="less" scoped>
.home-special {
  background-color: #f5f5f5;
  .special-list {
    height: 380px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .special-item {
      width: 404px;
      background: #fff;
      .hoverShadow();
      a {
        position: relative;
        width: 100%;
        height: 288px;
        display: block;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .meta {
          position: absolute;
          width: 100%;
          height: 288px;
          left: 0;
          top: 0;
          background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 50%);
          .title {
            position: absolute;
            width: 70%;
            height: 70px;
            padding-left: 16px;
            bottom: 0;
            left: 0;
            .top {
              display: block;
              color: #fff;
              font-size: 22px;
            }
            .sub {
              display: block;
              color: #999;
              font-size: 19px;
            }
          }
          .price {
            position: absolute;
            background: #fff;
            // background-color: #fff;
            color: @priceColor;
            font-size: 17px;
            line-height: 1;
            padding: 4px 8px;
            bottom: 25px;
            right: 16px;
            border-radius: 2px;
          }
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;
      .like {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>
