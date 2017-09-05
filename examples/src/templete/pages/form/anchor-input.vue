<template>
  <div :class="['page-dropdown']">
    <h3>anchor-input</h3>
    <div :class="['web-intro']">用于表单中用户自定义输入，可以配置输入范围限制</div>

    <h5>基本用法</h5>
    <anchor-row class="web-wrapper">
      <anchor-col span="4">
        <h6>双向绑定</h6>
        <anchor-input v-model="inputValue" defaultText="默认显示内容" />
        <p class="text">{{inputValue}}</p>
      </anchor-col>
      <anchor-col span="4">
        <h6>数字框</h6>
        <anchor-input :alwaysFeedback="false" valueType="number" :digit="4" :initValue="88" :width="100" @onChange="changeValue('input', ...arguments)" />
        <p class="text">{{inputNumber}}</p>
      </anchor-col>
      <anchor-col span="6">
        <h6>初始值</h6>
        <anchor-input :initValue="initValue" />
        <anchor-drop-down
          defaultText="请选择初始值"
          :data="dropDownData"
          v-model="initValue"
        />
      </anchor-col>
    </anchor-row>

    <h5>尺寸设定</h5>
    <anchor-row class="web-wrapper">
      <anchor-col span="4">
        <h6>size: small</h6>
        <anchor-input defaultText="请输入内容" size="small"/>
      </anchor-col>
      <anchor-col span="4">
        <h6>size: smaller</h6>
        <anchor-input defaultText="请输入内容" size="smaller"/>
      </anchor-col>
      <anchor-col span="4">
        <h6>size: normal</h6>
        <anchor-input defaultText="请输入内容" />
      </anchor-col>
      <anchor-col span="4">
        <h6>size: normal</h6>
        <anchor-input defaultText="请输入内容" />
      </anchor-col>
      <anchor-col span="4">
        <h6>size: normal</h6>
        <anchor-input defaultText="请输入内容" />
      </anchor-col>
      <anchor-col span="4">
        <h6>自定义模式</h6>
        <anchor-input defaultText="请输入内容" :height="40" :width="200"/>
      </anchor-col>
    </anchor-row>

    <anchor-row>
      <anchor-col>
        <h5>状态设定</h5>
        <anchor-row class="web-wrapper">
          <anchor-col span="8">
            <h6>禁止输入</h6>
            <anchor-input disabled defaultText="禁止输入" />
          </anchor-col>
          <anchor-col span="8">
            <h6>初始高亮</h6>
            <anchor-input :isActive="true" defaultText="请输入内容"/>
          </anchor-col>
          <anchor-col span="8">
            <h6>保持高亮</h6>
            <anchor-input :alwaysActive="true" defaultText="请输入内容"/>
          </anchor-col>
        </anchor-row>
      </anchor-col>
      <anchor-col>
        <h5>转换模式</h5>
        <anchor-row class="web-wrapper">
          <anchor-col>
            <h6>搜索框</h6>
            <anchor-input mode="search" />
            <anchor-input mode="search" iconPosition="left" />
          </anchor-col>
          <anchor-col span="6">
            <h6>单选按钮</h6>
            <anchor-input mode="radio" />
            <anchor-input mode="radio" isActive />
            <anchor-input mode="radio" disabled />
            <anchor-input mode="radio" isActive disabled />
          </anchor-col>
          <anchor-col span="6">
            <h6>多选按钮</h6>
            <anchor-input mode="checkbox" />
            <anchor-input mode="checkbox" isActive />
            <anchor-input mode="checkbox" disabled />
            <anchor-input mode="checkbox" isActive disabled />
          </anchor-col>
        </anchor-row>
      </anchor-col>
    </anchor-row>

    <h5>Document</h5>
    <anchor-row>
      <anchor-col span="20">
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
  import AnchorDropDown from "../../../../../packages/drop-down/src/drop-down.vue";

  export default {
    components: {AnchorDropDown},
    data () {
      return {
        dropDownData: [{id: 'value1', value: 'value1'},{id: 'value2', value: 'value2'},{id: 'value3', value: 'value3'},],
        initValue: null,
        inputValue: 'placeholder',
        inputNumber: '88.0000',
        listData:[
          {param: 'mode', type: 'string', desc: '按钮模式', default: 'button', range: 'button / tag', necessary: '否', remark: '目前两种模式区别仅限于样式'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '默认通过 onSelect 事件触发回调，可选择手动绑定回调函数'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },

    methods: {
      changeValue (type, val, oldVal) {
        this.inputNumber = val
      },
    }
  }
</script>