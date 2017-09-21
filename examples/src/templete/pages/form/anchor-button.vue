<template>
  <div :class="['page-dropdown']">
    <h3>anchor-button</h3>
    <div :class="['web-intro']">用于触发各种操作、展示性标签、显示可变状态文字、链接及图标</div>
    <anchor-row>
      <anchor-col span="18">
        <h5>基本用法</h5>
        <div class="web-wrapper">
          <anchor-button btnStyle="1" />
          <anchor-button btnStyle="2" />
          <anchor-button btnStyle="3" />
          <anchor-button btnStyle="4" />
          <anchor-button btnStyle="5" />
          <anchor-button btnStyle="6" />
          <anchor-button mode="tag" text="标签文字" />
          <anchor-button mode="tag" tagColor="2B90E8" text="标签文字" />
          <anchor-button mode="tag" tagColor="08B446" text="标签文字" />
          <anchor-button mode="tag" tagColor="AEA202" text="标签文字" />
          <anchor-button mode="tag" tagColor="6F57FF" text="标签文字" />
          <anchor-button mode="tag" tagColor="E15E85" text="标签文字" />
          <anchor-button mode="tag" tagColor="1AADE1" text="标签文字" />
          <anchor-button mode="tag" tagColor="F96E28" text="标签文字" />
        </div>
      </anchor-col>
      <anchor-col span="6">
        <h5>纯展示标签，不绑定点击事件</h5>
        <div class="web-wrapper">
          <anchor-button mode="tag" tagColor="6F57FF" text="标签文字" :isClicked="false" />
          <anchor-button mode="tag" tagColor="1AADE1" text="标签文字" :isClicked="false" />
          <anchor-button mode="tag" tagColor="F96E28" text="标签文字" :isClicked="false" />
          <anchor-button mode="tag" tagColor="F96E28" text="标签文字" showCloseIcon :isClicked="false" />
        </div>
      </anchor-col>
      <anchor-col span="8">
        <h5>禁用效果</h5>
        <div class="web-wrapper">
          <anchor-button btnStyle="1" isDisabled />
          <anchor-button btnStyle="2" isDisabled />
          <anchor-button mode="tag" tagColor="F96E28" isDisabled />
        </div>
      </anchor-col>
      <anchor-col span="8">
        <h5>显示图标</h5>
        <div class="web-wrapper">
          <anchor-button iconName="dot" btnStyle="2" />
          <anchor-button iconName="dot" btnStyle="4" />
          <anchor-button iconName="device-colored__volume" btnStyle="6" />
        </div>
      </anchor-col>
      <anchor-col span="8">
        <h5>自定义标签宽高</h5>
        <div class="web-wrapper">
          <anchor-button mode="tag" :height="18" />
          <anchor-button mode="tag" tagColor="1AADE1" :width="90" :height="24" />
          <anchor-button mode="tag" tagColor="2B90E8" size="big" />
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
        listData:[
          {param: 'mode', type: 'string', desc: '按钮模式', default: 'button', range: 'button / tag', necessary: '否', remark: '目前两种模式区别仅限于样式'},
          {param: 'data', type: '--', desc: '按钮携带的数据', default: '--', range: '--', necessary: '否', remark: '当触发点击事件时，会将 data 值作为参数返回'},
          {param: 'btnStyle', type: 'string / number', desc: '按钮样式', default: '1', range: '\'1\',\'2\',\'3\',\'4\',\'5\',\'6\'', necessary: '否', remark: '组件内置 6 种 mode = button 时的样式可供选择'},
          {param: 'tagColor', type: 'string', desc: '标签样式', default: 'EA9509', range: '\'EA9509\', \'2B90E8\', \'AEA202\', \'6F57FF\', \'E15E85\', \'1AADE1\', \'F96E28\'', necessary: '否', remark: '组件内置 7 种 mode = tag 时的样式可供选择'},
          {param: 'iconName', type: 'string / boolean', desc: '图标名称', default: false, range: '与 anchor-icon 内置样式一致', necessary: '否', remark: '此属性值为 flase 时则不显示 icon'},
          {param: 'text', type: 'string / number', desc: '要显示的按钮文字', default: '按钮文字', range: '--', necessary: '否', remark: ''},
          {param: 'link', type: 'string', desc: '跳转路由', default: '--', range: '--', necessary: '否', remark: '当设置此属性时，默认会由 a 标签替换 span 标签并且事件属性不再起作用'},
          {param: 'targetText', type: 'string', desc: '跳转属性', default: '_self', range: '与 a 标签 target 属性范围一致', necessary: '否', remark: ''},
          {param: 'textWidth', type: 'number', desc: '按钮内文字宽度', default: '--', range: '--', necessary: '否', remark: '由于要保持文字超出设定值显示为省略的样式，因此需要手灯设置文字宽度，不设置会根据按钮内边距和总宽度计算生成'},
          {param: 'width', type: 'number', desc: '按钮总宽度', default: '--', range: '--', necessary: '否', remark: ''},
          {param: 'height', type: 'number', desc: '按钮总高度', default: '--', range: '--', necessary: '否', remark: ''},
          {param: 'isHover', type: 'boolean', desc: '是否处于 hover 状态', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'isActive', type: 'boolean', desc: '是否处于 active 状态', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'isDisabled', type: 'boolean', desc: '是否处于 disabled 状态', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'isClicked', type: 'boolean', desc: '是否绑定点击事件', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'removeText', type: 'boolean', desc: '是否移除按钮文字', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'showCloseIcon', type: 'boolean', desc: '是否显示关闭图标', default: false, range: 'true / false', necessary: '否', remark: ''},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '默认通过 onSelect 事件触发回调，可选择手动绑定回调函数'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },
  }
</script>