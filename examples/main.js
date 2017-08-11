import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import anchor from 'src/index'

Vue.use(anchor)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})