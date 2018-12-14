import Vue from 'vue'

import App from './App.vue'
import './assets/css/reset.css'
import router from './router'
import store from './store'

import Utile from './lib/utils'

Vue.use(Utile);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
