// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import { confirmLogout } from '@/common/auth.js'
import uniTransition from '@/uni_modules/uni-transition/components/uni-transition/uni-transition.vue'
Vue.component('uni-transition', uniTransition)
Vue.config.productionTip = false

Vue.prototype.$confirmLogout = confirmLogout

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif