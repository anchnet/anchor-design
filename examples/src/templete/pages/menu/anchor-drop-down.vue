<template>
  <div :class="['page-dropdown']">
    <h3>anchor-drop-down</h3>
    <div :class="['web-intro']">下拉菜单，常用于页面内，显示从多个值中选取单个数据，区别于单选组件，下拉菜单数据之间无对比性</div>
    <anchor-row>
      <anchor-col span="6">
        <h5>基本用法</h5>
        <div class="web-wrapper">
          <anchor-drop-down :data="data" />
        </div>
      </anchor-col>
      <anchor-col span="6">
        <h5>简易模式</h5>
        <div class="web-wrapper">
          <anchor-drop-down mode="simple" :data="data" />
        </div>
      </anchor-col>
      <anchor-col span="6">
        <h5>带搜索框</h5>
        <div class="web-wrapper">
          <anchor-drop-down :width="204" :data="data" withSearch />
        </div>
      </anchor-col>
      <anchor-col span="6">
        <h5>内置尺寸</h5>
        <div class="web-wrapper">
          <div :style="{'display': 'inline-block'}">
            <h6>small</h6>
            <anchor-drop-down :data="data" size="small" defaultText="small" />
          </div>
          <div :style="{'display': 'inline-block'}">
            <h6>smaller</h6>
            <anchor-drop-down :data="data" size="smaller" />
          </div>
          <div :style="{'display': 'inline-block'}">
            <h6>normal</h6>
            <anchor-drop-down :data="data" />
          </div>
        </div>
      </anchor-col>
    </anchor-row>
    <anchor-row>
      <anchor-col span="6">
        <h5>带多选过滤按钮</h5>
        <div class="web-wrapper">
          <anchor-drop-down :data="data" isFilter />
        </div>
      </anchor-col>
      <anchor-col span="6">
        <h5>根据 defaultKey 设置默认项</h5>
        <div class="web-wrapper">
          <anchor-drop-down :data="data" :defaultKey="2" />
        </div>
      </anchor-col>
      <anchor-col span="4">
        <h5>显示图标</h5>
        <div class="web-wrapper">
          <anchor-drop-down :data="data" onShowIcon="device-colored__volume" />
        </div>
      </anchor-col>
      <anchor-col span="8">
        <anchor-row>
          <anchor-col>
            <h5>立即触发回调</h5>
            <div class="web-wrapper">
              <anchor-drop-down :data="data" :defaultKey="3" immediate v-model="currentId" />
              <span>{{currentId}}</span>
            </div>
          </anchor-col>
          <anchor-col>
            <h5>第一次 watch 时触发回调</h5>
            <div class="web-wrapper">
              <anchor-drop-down :data="data2" :defaultKey="3" immediateFirstWatch v-model="currentId2" />
              <span>{{currentId2}}</span>
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
  import AnchorRow from "../../../../../packages/layout/src/row.vue";

  export default {
    components: {AnchorRow},
    data () {
      return {
        currentId: null,
        currentId2: null,

        data: [
          {id: 'apple', value: '苹果'},
          {id: 'amazon', value: '亚马逊'},
          {id: 'facebook', value: 'facebook'},
          {id: 'google', value: 'google'},
          {id: 'alibaba', value: '阿里巴巴'},
          {id: 'tencent', value: '腾讯'},
          {id: 'anchnet', value: 'anchnet'},
          {id: 'anchnet2', value: 'anchnet2'},
          {id: 'anchnet3', value: 'anchnet3'},
          {id: 'anchnet4', value: 'testchant2'},
        ],

        data2: [],

        listData:[
          {param: 'data', type: 'array', desc: '下拉菜单数据', default: '--', range: '--', necessary: '是', remark: '示例：[{id: "id1", value: "value1"}]，数据项必须含有 id、value 属性'},
          {param: 'mode', type: 'string', desc: '菜单模式', default: 'normal', range: 'normal / simple', necessary: '否', remark: '目前两种模式区别仅限于样式'},
          {param: 'withSearch', type: 'boolean', desc: '是否带有搜索框', default: 'false', range: '--', necessary: '否 ', remark: ''},
          {param: 'isAsynSearch', type: 'boolean', desc: '是否开启显示异步搜索结果', default: 'false', range: '--', necessary: '否 ', remark: '开启后，可通过注册 onSearch 事件捕获搜索关键字，进而更新组件 data 数据'},
          {param: 'size', type: 'string', desc: '组件尺寸', default: '--', range: 'small / smaller / normal / bigger / big', necessary: '否 ', remark: '组件内置多种尺寸，可快速设置组件大小'},
          {param: 'width', type: 'number', desc: '组件宽度', default: '--', range: '>0', necessary: '否 ', remark: '自定义组件宽度，优先级高于 size'},
          {param: 'height', type: 'number', desc: '组件高度', default: '--', range: '>0', necessary: '否 ', remark: '自定义组件高度，优先级高于 size'},
          {param: 'defaultId', type: 'number / string', desc: '默认数据ID', default: '--', range: '--', necessary: '否 ', remark: '设置默认显示的数据，数据项必须含有 id 属性，优先级高于 defaultKey'},
          {param: 'defaultKey', type: 'number', desc: '默认数据key', default: '--', range: '>=0', necessary: '否 ', remark: '设置默认显示的数据，优先级高于 defaultText'},
          {param: 'defaultText', type: 'string', desc: '默认显示的文本', default: '--', range: '--', necessary: '否 ', remark: '设置默认显示的文本'},
          {param: 'onDisplayStyle', type: 'string / number', desc: '组件样式', default: 1, range: '1 / 2', necessary: '否 ', remark: '选择组件内置样式'},
          {param: 'onShowIcon', type: 'string / boolean', desc: '当前显示图标', default: 'false', range: 'false / 与 anchor-icon 内置图标选择范围一致', necessary: '否 ', remark: '设置组件图标，默认不显示，值为空字符串或者 false 均不显示图标'},
          {param: 'hasDot', type: 'boolean', desc: '是否显示数据项前置圆点', default: 'false', range: 'false / true', necessary: '否 ', remark: '此项属于样式优化项'},
          {param: 'isFilter', type: 'boolean', desc: '是否显示数据项多选操作', default: 'false', range: 'false / true', necessary: '否 ', remark: '用于通过多项选择过滤数据'},
          {param: 'hoverToShow', type: 'boolean', desc: '是否开启在 hover 时显示下拉列表', default: 'false', range: 'false / true', necessary: '否 ', remark: ''},
          {param: 'immediate', type: 'boolean', desc: '是否立即触发回调', default: 'false', range: 'false / true', necessary: '否 ', remark: '在有默认值的情况下才会生效，返回值为默认值当前 item 及所在 key'},
          {param: 'immediateFirstWatch', type: 'boolean', desc: '第一次 watch 时是否触发回调', default: 'false', range: 'false / true', necessary: '否 ', remark: '主要用于异步请求的列表数据；在有默认值的情况下才会生效，返回值为默认值当前 item 及所在 key'},
          {param: 'onChangeBack', type: 'function', desc: '回调函数，参数为当前 [item, key]', default: '--', range: '--', necessary: '否 ', remark: '默认通过 v-model 双向绑定，传递参数默认为 item.id，无 id 属性时怎传递当前 item，可选择手动绑定回调函数'},
        ]
      }
    },

    computed: {
      ...mapGetters('table',['TheadData']),
    },

    mounted () {
      this.updateData()
    },

    methods: {
      updateData () {
        setTimeout(() => {
          this.data2 = this.data
        }, 300)
      }
    },
  }
</script>