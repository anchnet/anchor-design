import Vue from 'vue'
import Router from 'vue-router'
import components from 'Examples/src/templete'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'layout', component: components.Layout,
      children: []
    }
  ]
})

export default router
