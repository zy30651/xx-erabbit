<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user"></i>
              {{ profile.nickname }}
            </a>
          </li>
          <li><a href="javascript:;" @click="logout()">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li>
            <router-link to="/register">免费注册</router-link>
          </li>
        </template>
        <li><router-link to="/member/order">我的订单</router-link></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-phone"></i>
            手机版
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'AppTopNav',
  setup() {
    const store = useStore()

    const router = useRouter()
    const logout = () => {
      store.commit('user/setUser', {})
      // 清空购物车
      store.commit('cart/setCartList', [])
      router.push('/login')
    }

    // 使用vuex中的state需要设置计算属性;否则就$store.state.user.profile
    const profile = computed(() => {
      return store.state.user.profile
    })
    return { profile, logout }
  },
}
</script>

<script setup></script>

<style lang="less" scoped>
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 10px;
        line-height: 1;
        color: white;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
