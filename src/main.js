import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'
Vue.use(ElementUI);
// 组件扫描文件
import scanFile from "./scanFile"
import store from "./store/index"
// import axios from 'axios'
import router from './router'
Vue.use(scanFile)
// Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

function setRem() {
  const baseSize = 16 // 基准大小
  const designWidth = 1920 // 设计稿宽度
  const currentWidth = Math.min(document.documentElement.clientWidth, 1920)
  const rem = (currentWidth / designWidth) * baseSize
  document.documentElement.style.fontSize = rem + 'px'
}

window.addEventListener('resize', setRem)
setRem()