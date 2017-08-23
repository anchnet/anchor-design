import Vue from 'vue'
import Router from 'vue-router'
import templete from 'examples/src/templete'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'layout', component: templete.Layout, redirect: '/home',
      children: [
        { path: 'home', name: 'home', component: templete.Home, },
        { path: 'form/button', name: 'button', component: templete.Button, },
        { path: 'menu/drop_down', name: 'dropDown', component: templete.DropDown, },
        { path: 'drag/slider', name: 'drag', component: templete.Slider, },
      ]
    }
  ]
})

export default router
