// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import { confirmLogout } from '@/common/auth.js'

Vue.config.productionTip = false

Vue.prototype.$confirmLogout = confirmLogout

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif
