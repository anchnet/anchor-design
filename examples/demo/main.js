/**
 * Created by liuzhimeng on 2017/7/26.
 */
import Vue from 'vue'
import AnchorTable from 'Packages/table/src/table'
import AnchorTbody from 'Packages/table-parts/src/table-body'
import AnchorTcell from 'Packages/table-parts/src/table-cell'

import staticData from 'Examples/demo/model/demo'

const Demo = {
  components: {
    AnchorTable,
    AnchorTbody,
    AnchorTcell,
  },

  data () {
    return {
      ...staticData
    }
  },

  methods: {
    onTableClick (params) {
      console.log('demo', params)
    },
  }
}

new Vue(Demo).$mount('#demo')