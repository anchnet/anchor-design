<template>
  <div :class="['page-slider']">
    <h3>anchor-slider</h3>
    <div><p :class="['web-intro']">滑动条，一般用于连续或等间断取值，返回值为数字或字符串类型</p></div>
    <anchor-row>
      <anchor-col>
        <h5>基本用法</h5>
        <div class="web-wrapper">
          <anchor-slider :scopeEnd="1000" unit="GB" :defaultValue="50" v-model="basicValue" />
          <p>最大范围：1000；自定义初始值：50；自定义单位：'GB'；双向绑定；结果：{{basicValue}}</p>
        </div>
      </anchor-col>
      <anchor-col>
        <h5>持续回调 && 隐藏输入框</h5>
        <div class="web-wrapper">
          <anchor-slider :scope="[100, 1000]" alwaysFeedback :hasInputBlock="false" v-model="alwaysValue" />
          <p>范围：100 - 1000；双向绑定；结果：{{alwaysValue}}</p>
        </div>
      </anchor-col>
    </anchor-row>
    <anchor-row>
      <anchor-col>
        <h5>设置步长</h5>
        <div class="web-wrapper">
          <anchor-slider :scope="[100, 1000]" :step="100" v-model="stepValue" />
          <p>步长：100；双向绑定结果：{{stepValue}}</p>
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

  export default {
    data () {
      return {
        basicValue: 0,
        alwaysValue: 0,
        stepValue: 0,
        listData:[
          {param: 'scope', type: 'array', desc: 'slider取值范围，优先级高于scopeStart、scopeEnd', default: '--', range: '--', necessary: '是/否', remark: '示例：[10, 90]'},
          {param: 'scopeStart', type: 'number', desc: 'slider取值下限', default: 0, range: '>= 0', necessary: '否'},
          {param: 'scopeEnd', type: 'number', desc: 'slider取值上限', default: '--', range: '--', necessary: '是/否', remark: '必须由 scope 或者 scopeEnd 指定上限'},
          {param: 'step', type: 'number', desc: '步长', default: 1, range: '--', necessary: '否'},
          {param: 'defaultValue', type: 'number / string', desc: '默认值', default: '--', range: '--', necessary: '否'},
          {param: 'tipText', type: 'string', desc: '浮框提示内容', default: '--', range: '--', necessary: '否'},
          {param: 'unit', type: 'string', desc: '输入框单位', default: '--', range: '--', necessary: '否'},
          {param: 'alwaysFeedback', type: 'boolean', desc: '是否持续触发回调', default: false, range: '--', necessary: '否'},
          {param: 'hasFloatTip', type: 'boolean', desc: '是否显示浮动提示框', default: true, range: '--', necessary: '否'},
          {param: 'hasInputBlock', type: 'boolean', desc: '是否显示输入框', default: true, range: '--', necessary: '否'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数，默认触发$emit("input")事件', default: '--', range: '--', necessary: '否'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },
  }
</script>