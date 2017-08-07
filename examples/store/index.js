import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

import table from './modules/table'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },

  modules: {
    table,
  },

  mutations: {
    ...mutations,
  },

  actions: {
    ...actions,
  },
})

export default store