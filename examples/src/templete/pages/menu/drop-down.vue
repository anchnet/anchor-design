<template>
  <div :class="['page-dropdown']">
    <h2>anchor-drop-down</h2>
    <div :class="['web-intro']">下拉菜单，常用于页面内，显示从多个值中选取单个数据，区别于单选组件，下拉菜单数据之间无对比性</div>
    <anchor-row>
      <anchor-col>
        <h4>基本用法</h4>
        <div class="web-wrapper">
          <anchor-drop-down :data="data1" />
          <p></p>
        </div>
      </anchor-col>
      <anchor-col>
        <h4>带搜索框</h4>
        <div class="web-wrapper">
          <anchor-drop-down :data="data2" withSearch />
        </div>
      </anchor-col>
    </anchor-row>
    <h4>Document</h4>
    <anchor-row>
      <anchor-col span="15">
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
  import utils from 'Src/libs/utils'

  export default {
    data () {
      return {
        data: [
          {id: 'apple', value: '苹果'},
          {id: 'amazon', value: '亚马逊'},
          {id: 'facebook', value: 'fackbook'},
          {id: 'google', value: 'google'},
          {id: 'alibaba', value: '阿里巴巴'},
          {id: 'tencent', value: '腾讯'},
          {id: 'anchnet', value: 'anchnet'},
          {id: 'anchnet2', value: 'anchnet2'},
          {id: 'anchnet3', value: 'anchnet3'},
          {id: 'anchnet4', value: 'testchant2'},
        ],

        listData:[
          {param: 'data', type: 'array', desc: '下拉菜单数据', default: '--', range: '--', necessary: '是', remark: '示例：[{id: "id1", value: "value1"}]'},
          {param: 'withSearch', type: 'boolean', desc: '是否带有搜索框', default: false, range: '--', necessary: '否 ', remark: ''},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),

      data1 () {
        return utils.clone(this.data)
      },
      data2 () {
        return utils.clone(this.data)
      }
    },
  }
</script>