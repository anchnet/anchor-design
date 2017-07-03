import Vue from 'vue'
import Router from 'vue-router'
import templete from 'Examples/src/templete'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', name: 'layout', component: templete.Layout,
      children: [
        { path: 'demo', name: 'demo', component: templete.Demo }
      ]
    }
  ]
})

export default router
