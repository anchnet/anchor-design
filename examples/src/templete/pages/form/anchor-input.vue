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
          {param: 'mode', type: 'string', desc: '输入框模式', default: 'input', range: 'input/search/radio/checkbox', necessary: '否', remark: '切换组件显示模式'},
          {param: 'valueType', type: 'string', desc: 'input 模式下的输入值类型', default: 'string', range: 'string/number', necessary: '否', remark: ''},
          {param: 'size', type: 'string', desc: 'input 模式下输入框尺寸', default: 'string', range: 'small/smaller/normal/largger/large', necessary: '否', remark: ''},
          {param: 'width', type: 'number', desc: 'input 模式下输入框宽度', default: 'number', range: '--', necessary: '否', remark: ' 优先级高于 size'},
          {param: 'height', type: 'number', desc: 'input 模式下输入框高度', default: 'number', range: '--', necessary: '否', remark: ' 优先级高于 size'},
          {param: 'digit', type: 'number', desc: 'input 模式下输入值为 number 时的数值单位', default: 1, range: '--', necessary: '否', remark: ''},
          {param: 'initValue', type: 'string', desc: 'input 模式下初始输入值', default: '--', range: '--', necessary: '否', remark: '既在初始化组件时生效，也可以通过更新 initValue 二次改变输入值并自动触发回调事件'},
          {param: 'defaultValue', type: 'string', desc: 'input 模式下默认输入值', default: '--', range: '--', necessary: '否', remark: '当 valueType 为 number 时，若用户输入不合法，如果设置了 defaultValue，输入框会被重置 defaultValue'},
          {param: 'alwaysFeedback', type: 'boolean', desc: '是否持续返回输入值', default: true, range: '--', necessary: '否', remark: '即采用 this.$emit("input") 事件回调，可配合使用双向绑定特性'},
          {param: 'isActive', type: 'boolean', desc: '是否处于 active', default: '--', range: '--', necessary: '否', remark: '仅在初始状态时有效'},
          {param: 'alwaysActive', type: 'boolean', desc: '是否处于 active', default: '--', range: '--', necessary: '否', remark: '持续生效，不受 hover、focus 事件影响'},
          {param: 'disabled', type: 'boolean', desc: '是否处于禁用状态', default: '--', range: '--', necessary: '否', remark: '禁止输入，并且优先级高于 isActive和 alwaysActive'},
          {param: 'onChange', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '即input 原生 change 事件，在 alwaysFeedback 为 false 时采用 this.$emit(\'onChange\', params) 触发父组件事件'},
          {param: 'handleClick', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '模式为\'checkbox\' 时采用 this.$emit(\'handleClick\', params) 触发父组件事件'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '无回调时采用 this.$emit(\'handleClick\', params) 触发父组件事件'},
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