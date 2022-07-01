import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入样式重置库
import 'normalize.css'
// 导入自己项目的重置样式和公用样式
import '@/assets/styles/common.less'
import ui from './components/library'
// 插件的使用，在main.js使用app.use插件

createApp(App).use(store).use(router).use(ui).mount('#app')
