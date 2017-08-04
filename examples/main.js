import Vue from 'vue'
import App from './app.vue'
import router from './router'
import anchor from 'Src/index'

Vue.use(anchor)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})