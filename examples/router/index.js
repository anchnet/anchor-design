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

        { path: 'form/', name: 'form', component: templete.Form,
          children: [
            { path: 'button', name: 'button', component: templete.AnchorButton, },
            { path: 'input', name: 'input', component: templete.AnchorInput, },
            { path: 'checkbox', name: 'checkbox', component: templete.AnchorCheckbox, },
          ]
        },

        { path: 'menu/', name: 'menu', component: templete.Menu,
          children: [
            { path: 'drop_down', name: 'dropDown', component: templete.DropDown, },
            { path: 'tabs', name: 'anchorTabs', component: templete.AnchorTabs, }
          ]
        },

        { path: 'drag/', name: 'drag', component: templete.Drag,
          children: [
            { path: 'slider', name: 'slider', component: templete.Slider, },
          ]
        },

      ]
    }
  ]
})

export default router
