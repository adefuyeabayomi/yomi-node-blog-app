import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Vuesax from "vuesax"
import "../node_modules/vuesax/dist/vuesax.css"
import "../src/assets/bootstrap.css"
import "../src/assets/css/all.css"
import "../public/article-style.css"
import "../src/assets/font.css"

Vue.use(Vuesax);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 