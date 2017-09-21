<template>
  <div :class="['page-anchor-tabs']">
    <h3>anchor-checkbox</h3>
    <div :class="['web-intro']">复选框</div>
    <anchor-row>
      <anchor-col>
        <anchor-row>
          <h5>横向排列模式</h5>
          <div class="web-wrapper">
            <anchor-checkbox :data="data1" />
          </div>
        </anchor-row>
        <anchor-row>
          <h5>不同默认状态的复选列表</h5>
          <div class="web-wrapper">
            <anchor-checkbox :data="data2" />
          </div>
        </anchor-row>
      </anchor-col>
      <anchor-col>
        <anchor-row>
          <anchor-col>
            <h5>纵向排列模式</h5>
            <div class="web-wrapper">
              <anchor-checkbox mode="vertical" :data="data3" />
            </div>
          </anchor-col>
          <anchor-col>
            <h5>不同默认状态的复选列表</h5>
            <div class="web-wrapper">
              <anchor-checkbox mode="vertical" :data="data4" />
            </div>
          </anchor-col>
        </anchor-row>
      </anchor-col>
    </anchor-row>
    <h5>Document</h5>
    <anchor-row>
      <anchor-col span="24">
        <anchor-table :hasCheckbox="false" :theadData="TheadData" :listData="listData">
          <tbody>
          <tr v-for="(item, key) in listData">
            <td v-for="{id} in TheadData">{{item[id]}}</td>
          </tr>
          </tbody>
        </anchor-table>
      </anchor-col>
    </anchor-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from 'src/libs/utils'

  export default {
    data () {
      return {
        currentData: {
          base: '',
          list: '',
        },

        data: [
          {id: 'xiaomi', value: '小米',},
          {id: 'huawei', value: '华为',},
          {id: 'lenovo', value: '联想',},
          {id: 'chuizi', value: '锤子',},
          {id: 'sanxing', value: '三星',},
          {id: 'sanxing', value: '苹果',},
          {id: 'sanxing', value: '中兴',},
        ],

        verData: [
          {id: 'xiaomi', value: '小米', active: true, },
          {id: 'huawei', value: '华为',},
          {id: 'lenovo', value: '联想',},
          {id: 'chuizi', value: '锤子', active: true, disabled: true},
          {id: 'sanxing', value: '三星', },
          {id: 'sanxing', value: '苹果', disabled: true,},
          {id: 'sanxing', value: '中兴',},
        ],

        listData:[
          {param: 'data', type: 'array', desc: '组件数据', default: '--', range: '--', necessary: '是', remark: '示例：[{id: "id1", value: "value1", active: false, disabled: false,}]，数据项必须含有 id、value 属性'},
          {param: 'mode', type: 'string', desc: '复选菜单布局，分为水平和垂直两种', default: 'horizontal', range: 'horizontal / vertical', necessary: '否', remark: ''},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '回调函数，不存在时则由 this.$emit(\'handleClick\', params) 触发回调'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),

      data1 () {
        return JSON.parse(JSON.stringify(this.data))
      },

      data2 () {
        return JSON.parse(JSON.stringify(this.verData))
      },

      data3 () {
        return JSON.parse(JSON.stringify(this.data))
      },

      data4 () {
        return JSON.parse(JSON.stringify(this.verData))
      },
    },

    methods: {
      handleClick (type, params) {
        this.currentData[type] = JSON.stringify(params)
      }
    }
  }
</script>