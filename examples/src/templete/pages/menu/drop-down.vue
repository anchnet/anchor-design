<template>
  <div :class="['page-dropdown']">
    <h2>anchor-drop-down</h2>
    <div><p :class="['web-intro']">滑动条，一般用于连续或等间断取值，返回值为数字或字符串类型</p></div>
    <anchor-row>
      <anchor-col>
        <h4>基本用法</h4>
        <div class="web-wrapper">
          <anchor-drop-down :data="data" />
          <p></p>
        </div>
      </anchor-col>
      <anchor-col>
        <h4></h4>
        <div class="web-wrapper">

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

  export default {
    data () {
      return {
        data: [
          {id: 'apple', value: '苹果'},
          {id: 'amazon', value: '亚马逊'},
          {id: 'facebook', value: '脸谱网'},
          {id: 'alibaba', value: '阿里巴巴'},
          {id: 'tencent', value: '腾讯'},
        ],

        listData:[
          {param: 'data', type: 'array', desc: '下拉菜单数据', default: '--', range: '--', necessary: '是', remark: '示例：[{id: "id1", value: "value1"}]'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },
  }
</script>