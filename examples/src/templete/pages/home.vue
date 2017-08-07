<template>
  <div :class="['page-home']">
    <ol>
      <li>
        <h4>anchor-transfer</h4>
        <div class="demo-layout">
          <anchor-transfer
            :data="transferData"
            :config="transferConfig"
            :subData="subData"
          />
        </div>
      </li>
      <li>
        <h4>anchor-layout</h4>
        <div class="demo-layout">
          <h5>总栅格数为24</h5>
          <anchor-row>
            <anchor-col span="24" class="home-col">span = 24 (100%)</anchor-col>
          </anchor-row>
        </div>
        <div class="demo-layout">
          <anchor-row>
            <anchor-col span="8" class="home-col">span = 8</anchor-col>
            <anchor-col span="16" class="home-col col-2">span = 16</anchor-col>
          </anchor-row>
        </div>
        <div class="demo-layout">
          <anchor-row>
            <anchor-col span="6" class="home-col">span = 6</anchor-col>
            <anchor-col span="12" class="home-col col-2">span = 12</anchor-col>
            <anchor-col span="6" class="home-col">span = 6</anchor-col>
          </anchor-row>
        </div>
        <div class="demo-layout">
          <h5>设置偏移量</h5>
          <anchor-row>
            <anchor-col span="6" offset="3" class="home-col">span = 6, offset = 3</anchor-col>
            <anchor-col span="6" offset="6" class="home-col col-2">span = 6, offset = 6</anchor-col>
          </anchor-row>
        </div>
        <div class="demo-layout">
          <h5>开启 flex 模式</h5>
          <h5>justify-content: space-between</h5>
          <anchor-row mode="flex" justifyContent="space-between">
            <anchor-col span="6" class="home-col">span = 6</anchor-col>
            <anchor-col span="4" class="home-col col-2">span = 4</anchor-col>
            <anchor-col span="6" class="home-col">span = 6</anchor-col>
            <anchor-col span="3" class="home-col col-2">span = 3</anchor-col>
          </anchor-row>
        </div>
        <div class="demo-layout">
          <h5>justify-content: space-around, align-items: center</h5>
          <anchor-row mode="flex" justifyContent="space-around" alignItems="center">
            <anchor-col span="6" class="home-col"><div style="height: 80px;">span = 6</div></anchor-col>
            <anchor-col span="6" class="home-col col-2"><div style="height: 120px;">span = 6</div></anchor-col>
            <anchor-col span="6" class="home-col">span = 6</anchor-col>
          </anchor-row>
        </div>
      </li>
      <li>
        <h4>anchor-checkbox</h4>
        <div class="demo-layout">
          <h4>横向排列模式</h4>
          <anchor-checkbox :data="checkboxData" />
        </div>
        <div class="demo-layout">
          <h4>纵向排列模式</h4>
          <anchor-checkbox type="vertical" :data="checkboxData" />
        </div>
      </li>
      <li>
        <h4>anchor-radio</h4>
        <div class="demo-layout">
          <anchor-radio :data="radioData" />
        </div>
      </li>
      <li>
        <h4>anchor-tabs</h4>
        <div class="demo-layout">
          <anchor-tabs :data="tabsData" targetText="_blank" />
        </div>
        <div class="demo-layout">
          <anchor-tabs mode="list" :data="tabsData" targetText="_blank" />
        </div>
      </li>
      <li>
        <h4>anchor-bread-crumb</h4>
        <div class="demo-layout">
          <anchor-bread-crumb :data="breadcrumbData" />
        </div>
      </li>
      <li>
        <h4>anchor-table</h4>
        <div class="demo-layout">
          <anchor-table :maps="tableMaps" :theadData="theadData" :listData="listData" @handleClick="onTableClick">
            <anchor-tbody
              v-for="(item, key) in listData"
              :key="key"
              :dataKey="key"
              :data="listData"
            >
              <td v-for="{id} in theadData" :class="['anchor-table__cell']">
                <div slot="name" :class="['anchor-table__element']">{{item[id]}}</div>
              </td>
            </anchor-tbody>
          </anchor-table>
        </div>
      </li>
      <li>
        <h4>anchor-pagination</h4>
        <ol class="sub-inline">
          <li>
            <h4>简单模式</h4>
            <div class="demo-layout">
              <anchor-pagination mode="simple" :total="208" :perUnit="10" :setCurrentEntry="18" />
            </div>
          </li>
          <li>
            <h4>正常模式</h4>
            <div class="demo-layout">
              <anchor-pagination :total="400" :perUnit="perUnit" :setCurrentPage="5" @onPageChange="onPageChange" />
              <p>
                当前页数：{{pageData.currentPage}}；
                当前页第一条数据Key：{{pageData.currentEntry}}；
                每页显示条数：{{pageData.perUnit}}；
                总条数：{{pageData.totalCount}}；
                总页数：{{pageData.totalPage}}
              </p>
            </div>
          </li>
        </ol>
      </li>
      <li>
        <h4>anchor-select-number</h4>
        <ol class="sub-inline">
          <li>
            <h5>设定默认值</h5>
            <div class="demo-layout">
              <anchor-select-number
                :scopeEnd="100"
                :defaultValue="20.1"
                :onChangeBack="onSelectNumberChange.bind(null, 'value1')"
              />
            </div>
          </li>
          <li>
            <h5>自定义最小步长</h5>
            <div class="demo-layout">
              <anchor-select-number
                :scopeEnd="100"
                :defaultValue="20"
                :step="0.01"
                :onChangeBack="onSelectNumberChange.bind(null, 'value1')"
              />
            </div>
          </li>
          <li>
            <h5>自定义输入框宽度</h5>
            <div class="demo-layout">
              <anchor-select-number
                :scope="[-200, 100]"
                :defaultValue="20"
                :step="10"
                :width="80"
                :onChangeBack="onSelectNumberChange.bind(null, 'value1')"
              />
            </div>
          </li>
          <li>
            <h5>更换样式</h5>
            <div class="demo-layout">
              <anchor-select-number
                mode="2"
                :scope="[0, 100]"
                :step="10"
                :onChangeBack="onSelectNumberChange.bind(null, 'value1')"
              />
            </div>
          </li>
        </ol>
      </li>
      <li>
        <h4>anchor-icon</h4>
        <div class="demo-layout">
          <anchor-icon name="device-white-black__instance" />
          <anchor-icon name="device-colored__instance" />
          <anchor-icon name="device-colored__dServer" />
          <anchor-icon name="device-colored__hosting" />
          <anchor-icon name="device-colored__volume" />
        </div>
      </li>
      <li>
        <h4>drop-down</h4>
        <ol class="sub-inline">
          <li>
            <h5>简易下拉菜单</h5>
            <div class="demo-layout">
              <anchor-drop-down
                mode="simple"
                :width="80"
                :data="dropdownData.nav.data"
                :hasDot="dropdownData.nav.hasDot"
                :defaultText="dropdownData.nav.defaultText"
              />
            </div>
          </li>
          <li>
            <h5>普通下拉菜单</h5>
            <div class="demo-layout">
              <anchor-drop-down
              	:width="180"
                :data="dropdownData.imageType.data"
                :hasDot="dropdownData.imageType.hasDot"
                :defaultText="dropdownData.imageType.defaultText"
                :onChangeBack="onDropDownChange.bind(null, 'imageType')"
              />
              <anchor-drop-down
                class="ml10"
                :data="dropdownData.imageVersion.data[currentImageType]"
                :hasDot="dropdownData.imageVersion.hasDot"
                :defaultKey="dropdownData.imageType.defaultKey"
                :defaultText="dropdownData.imageVersion.defaultText"
                :onChangeBack="onDropDownChange.bind(null, 'imageVersion')"
              />
            </div>
          </li>
          <li>
            <h5>带图标的下拉菜单</h5>
            <div class="demo-layout">
              <anchor-drop-down
                onShowIcon="device-colored__hosting"
                :data="dropdownData.imageType.data"
                defaultText="点击选择"
              />
            </div>
          </li>
          <li>
            <h5>红色字体的下拉菜单</h5>
            <div class="demo-layout">
              <anchor-drop-down
                onDisplayStyle="2"
                onShowIcon="device-colored__hosting"
                :data="dropdownData.imageType.data"
                defaultText="点击选择"
              />
            </div>
          </li>
          <li>
            <h5>带多选按钮的下拉菜单</h5>
            <div class="demo-layout">
              <anchor-drop-down
                onShowIcon="device-colored__hosting"
                :data="dropdownData.imageType.data"
                isFilter
                defaultText="点击选择"
                @onSelect="onSelect"
              />
            </div>
          </li>
        </ol>
      </li>
      <li>
        <h4>anchor-search</h4>
        <ol class="sub-inline">
          <li>
            <h5>正常模式</h5>
            <div class="demo-layout">
              <anchor-search @search="onSearch" />
              <p class="text">{{searchWord}}</p>
            </div>
          </li>
          <li>
            <h5>简单模式</h5>
            <div class="demo-layout">
              <anchor-search mode="simple"/>
            </div>
          </li>
        </ol>
      </li>
      <li>
        <h4>anchor-input</h4>
        <ol class="sub-inline">
          <li>
            <h5>双向绑定输入框</h5>
            <div class="demo-layout">
              <anchor-input v-model="inputValue" defaultText="双向绑定, testing~" />
            </div>
            <p class="text">{{inputValue}}</p>
          </li>
          <li>
            <h5>数字框</h5>
            <div class="demo-layout">
              <anchor-input :alwaysFeedback="false" valueType="number" :digit="4" :initValue="88" :width="100" @onChange="changeValue('input', ...arguments)" />
            </div>
            <p class="text">{{inputNumber}}</p>
          </li>
          <li>
            <h5>禁止输入</h5>
            <div class="demo-layout">
              <anchor-input disabled defaultText="禁止输入" />
            </div>
          </li>
          <li>
            <h5>自定义宽高</h5>
            <div class="demo-layout">
              <anchor-input defaultText="请输入内容" :height="60" :width="200"/>
            </div>
          </li>
          <li>
            <h5>保持高亮</h5>
            <div class="demo-layout">
              <anchor-input :alwaysActive="true" defaultText="请输入内容"/>
            </div>
          </li>
          <li>
            <h5>初始高亮</h5>
            <div class="demo-layout">
              <anchor-input :isActive="true" defaultText="请输入内容"/>
            </div>
          </li>
          <li>
            <h5>单选按钮</h5>
            <div class="demo-layout">
              <anchor-input mode="radio" v-model="inputValue3" />
              <anchor-input mode="radio" isActive />
              <anchor-input mode="radio" disabled />
              <anchor-input mode="radio" isActive disabled />
            </div>
            <p class="text">{{inputValue3}}</p>
          </li>
          <li>
            <h4>多选按钮</h4>
            <div class="demo-layout">
              <anchor-input mode="checkbox" v-model="inputValue4" />
              <anchor-input mode="checkbox" isActive />
              <anchor-input mode="checkbox" disabled />
              <anchor-input mode="checkbox" isActive disabled />
            </div>
            <p class="text">{{inputValue4}}</p>
          </li>
        </ol>
      </li>
      <li>
        <h4>anchor-button</h4>
        <div class="demo-layout">
          <anchor-button btnStyle="1" />
          <anchor-button btnStyle="2" />
          <anchor-button btnStyle="3" />
          <anchor-button btnStyle="4" />
          <anchor-button btnStyle="5" />
          <anchor-button btnStyle="6" />
          <anchor-button mode="tag" />
          <anchor-button mode="tag" tagColor="2B90E8" />
          <anchor-button mode="tag" tagColor="08B446" />
          <anchor-button mode="tag" tagColor="AEA202" />
          <anchor-button mode="tag" tagColor="6F57FF" />
          <anchor-button mode="tag" tagColor="E15E85" />
          <anchor-button mode="tag" tagColor="1AADE1" />
          <anchor-button mode="tag" tagColor="F96E28" />
        </div>
        <div class="demo-layout">
          <anchor-button btnStyle="1" :isDisabled="true" />
          <anchor-button btnStyle="2" :isDisabled="true" />
          <anchor-button btnStyle="3" :isDisabled="true" />
          <anchor-button btnStyle="4" :isDisabled="true" />
          <anchor-button btnStyle="5" :isDisabled="true" />
          <anchor-button btnStyle="6" :isDisabled="true" />
          <anchor-button mode="tag" :isClicked="false" />
          <anchor-button mode="tag" tagColor="2B90E8" :isClicked="false" />
          <anchor-button mode="tag" tagColor="08B446" :isClicked="false" />
          <anchor-button mode="tag" tagColor="AEA202" :isClicked="false" />
          <anchor-button mode="tag" tagColor="6F57FF" :isClicked="false" />
          <anchor-button mode="tag" tagColor="E15E85" :isClicked="false" />
          <anchor-button mode="tag" tagColor="1AADE1" :isClicked="false" />
          <anchor-button mode="tag" tagColor="F96E28" :isDisabled="true" />
        </div>
        <div class="demo-layout">
          <anchor-button mode="tag" :width="120" />
          <anchor-button mode="tag" tagColor="2B90E8" :width="100" />
          <anchor-button mode="tag" tagColor="08B446" :width="200" />
          <anchor-button mode="tag" tagColor="AEA202" :width="300" />
          <anchor-button mode="tag" tagColor="6F57FF" :width="90" />
          <anchor-button mode="tag" tagColor="E15E85" :width="220" />
          <anchor-button mode="tag" tagColor="1AADE1" :width="80" />
          <anchor-button mode="tag" tagColor="F96E28" :width="170" />
        </div>
        <div class="demo-layout">
          <anchor-button iconName="dot" btnStyle="2" />
          <anchor-button iconName="dot" btnStyle="4" />
          <anchor-button iconName="device-colored__volume" btnStyle="6" />
        </div>
      </li>
      <li>
        <h4>anchor-switch-label</h4>
        <div class="demo-layout">
          区域：<anchor-switch-label immediate :initData="regions" :onChangeBack="onLabelChange.bind(null, 'regions')"/>
        </div>
        <div class="demo-layout">
          类型：<anchor-switch-label :initData="resType" :onChangeBack="onLabelChange.bind(null, 'resType')"/>
        </div>
        <div class="demo-layout">
          主机类型：<anchor-switch-label :initData="hostType" :onChangeBack="onLabelChange.bind(null, 'hostType')"/>
        </div>
        <p class="color-primary">currentLabelValue: {{currentName}}</p>
      </li>
    </ol>
  </div>
</template>

<script>
  import staticData from 'Examples/src/assets/js/model/demo'

  export default {
    name: 'home',

    methods: {
      onTableClick (params) {
        console.log('demo', params)
      },

      onPageChange (obj) {
        this.pageData = obj
      },

      changeValue (type, val, oldVal) {
        this.inputNumber = val
      },

      onSearch (keyword) {
        this.searchWord = keyword
      },

      onLabelChange (type, item, key) {
        if (type === 'regions') {
          console.log('regions')
          this.hostType[1]['forbidden'] = item.id !== 'ac3'
        }
        this.currentName = item.value
      },

      onDropDownChange (type, item, key) {
        console.log(type, item, key)
      },

      onSelect (data) {
        console.log(data)
      },

      onSelectNumberChange (type, value) {
        this.selectNumber[type] = value
      }
    },

    data () {
      return {
        ...staticData
      }
    },
  }
</script>

<style lang="scss">
  @import "~scss/variables";

  .home-col{
    text-align: center;
    color: #ffffff;
    background-color: $color-tips;
    &.col-2{
      background-color: $color-base;
    }
  }
  ol{
    &.sub-inline{
      padding: 10px;
      > li{
        display: inline-block;
        margin: 0 10px;
        vertical-align: top;
      }
    }
    padding: 20px 40px;
    list-style: decimal;
    line-height: 2;
    > li h4, >li h5{
      color: $color-primary;
    }
    .text{
      line-height: 1;
      font-size: 14px;
    }
    .demo-layout{
      margin: 10px 0;
      font-size: 14px;
    }
  }
</style>
