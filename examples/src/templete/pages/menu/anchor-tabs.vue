<template>
  <div :class="['page-anchor-tabs']">
    <h3>anchor-tabs</h3>
    <div :class="['web-intro']">水平切换菜单</div>
    <anchor-row>
      <anchor-col>
        <h5>基本用法</h5>
        <div class="web-wrapper">
          <anchor-tabs :data="data" @handleClick="handleClick('base', ...arguments)" />
          <p>当前数据: {{currentData.base}}</p>
        </div>
      </anchor-col>
      <anchor-col>
        <h5>列表模式</h5>
        <div class="web-wrapper">
          <anchor-tabs mode="list" :data="data" @handleClick="handleClick('list', ...arguments)" />
          <p>当前数据: {{currentData.list}}</p>
        </div>
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
          {id: 'apple', value: '苹果'},
          {id: 'amazon', value: '亚马逊'},
          {id: 'facebook', value: 'fackbook'},
          {id: 'google', value: 'google', link: 'https://www.google.com.hk/', targetText: '_blank'},
          {id: 'alibaba', value: '阿里巴巴'},
          {id: 'tencent', value: '腾讯'},
        ],

        listData:[
          {param: 'data', type: 'array', desc: '组件数据', default: '--', range: '--', necessary: '是', remark: '示例：[{id: "id1", value: "value1", link: \'xxx\', targetText: \'_blank\',}]，数据项必须含有 id、value 属性'},
          {param: 'mode', type: 'string', desc: '组件模式', default: 'card', range: 'card / list', necessary: '否', remark: '目前两种模式区别仅限于样式'},
          {param: 'preventEvent', type: 'boolean', desc: '全局设置子项为跳转链接时是否阻止回调事件', default: false, range: '--', necessary: '否 ', remark: ''},
          {param: 'targetText', type: 'boolean', desc: '全局设置子项为跳转链接时的跳转属性', default: '_self', range: '与 a 标签的 target 属性值范围一致', necessary: '否 ', remark: ''},
          {param: 'defaultId', type: 'number / string', desc: '默认选中数据 ID', default: '--', range: '--', necessary: '否 ', remark: '设置默认显示的数据，数据项必须含有 id 属性，优先级高于 defaultValue'},
          {param: 'defaultValue', type: 'string / number', desc: '默认选中数据 Value', default: '--', range: '--', necessary: '否 ', remark: '设置默认显示的数据，数据项必须含有 value 属性，优先级高于 defaultKey'},
          {param: 'defaultKey', type: 'number', desc: '默认选中数据 key', default: '--', range: '>=0', necessary: '否 ', remark: '设置默认显示的数据'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '回调函数，不存在时则由 this.$emit(\'handleClick\', params) 触发回调'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },

    methods: {
      handleClick (type, params) {
        this.currentData[type] = JSON.stringify(params)
      }
    }
  }
</script>