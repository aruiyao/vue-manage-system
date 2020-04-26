import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/scss/reset.scss"
import './plugins/element.js'
import http from '@/api/config'
import './mock'

Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')