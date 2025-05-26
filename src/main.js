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
