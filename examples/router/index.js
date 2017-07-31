import Vue from 'vue'
import Router from 'vue-router'
import templete from 'Examples/src/templete'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/', name: 'layout', component: templete.Layout, redirect: '/home',
      children: [
        { path: 'home', name: 'home', component: templete.Home }
      ]
    }
  ]
})

export default router
