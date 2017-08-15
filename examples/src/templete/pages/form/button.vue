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
          <anchor-button mode="tag" tagColor="2B90E8" :width="120" />
        </div>
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

  export default {
    data () {
      return {
        listData:[
          {param: 'mode', type: 'string', desc: '按钮模式', default: 'button', range: 'button / tag', necessary: '否', remark: '目前两种模式区别仅限于样式'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数', default: '--', range: '--', necessary: '否 ', remark: '默认通过 onSelect 事件触发回调，可选择手动绑定回调函数'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },
  }
</script>