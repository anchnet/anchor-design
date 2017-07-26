<template>
  <div>
    <anchor-nav :leftData="leftData" :middleData="middleData" :rightData="rightData" />
    <ol>
      <li>
        <h3>anchor-tabs</h3>
        <div class="demo-layout">
          <anchor-tabs :data="tabsData" targetText="_blank" />
        </div>
        <div class="demo-layout">
          <anchor-tabs mode="list" :data="tabsData" targetText="_blank" />
        </div>
      </li>
      <li>
        <h3>anchor-bread-crumb</h3>
        <div class="demo-layout">
          <anchor-bread-crumb :data="breadcrumbData" />
        </div>
      </li>
      <li>
        <h3>anchor-table</h3>
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
        <h3>anchor-pagination</h3>
        <ol class="sub-inline">
          <li>
            <h3>简单模式</h3>
            <div class="demo-layout">
              <anchor-pagination mode="simple" :total="208" :perUnit="10" :setCurrentEntry="18" />
            </div>
          </li>
          <li>
            <h3>正常模式</h3>
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
        <h3>anchor-select-number</h3>
        <ol class="sub-inline">
          <li>
            <h3>设定默认值</h3>
            <div class="demo-layout">
              <anchor-select-number
                :scopeEnd="100"
                :defaultValue="20.1"
                :onChangeBack="onSelectNumberChange.bind(null, 'value1')"
              />
            </div>
          </li>
          <li>
            <h3>自定义最小步长</h3>
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
            <h3>自定义输入框宽度</h3>
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
            <h3>更换样式</h3>
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
        <h3>anchor-icon</h3>
        <div class="demo-layout">
          <anchor-icon name="device-white-black__instance" />
          <anchor-icon name="device-colored__instance" />
          <anchor-icon name="device-colored__dServer" />
          <anchor-icon name="device-colored__hosting" />
          <anchor-icon name="device-colored__volume" />
        </div>
      </li>
      <li>
        <h3>drop-down</h3>
        <ol class="sub-inline">
          <li>
            <h3>简易下拉菜单</h3>
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
            <h3>普通下拉菜单</h3>
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
            <h3>带图标的下拉菜单</h3>
            <div class="demo-layout">
              <anchor-drop-down
                onShowIcon="device-colored__hosting"
                :data="dropdownData.imageType.data"
                defaultText="点击选择"
              />
            </div>
          </li>
          <li>
            <h3>红色字体的下拉菜单</h3>
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
            <h3>带多选按钮的下拉菜单</h3>
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
        <h3>anchor-search(combined by anchor-input and anchor-button)</h3>
        <div class="demo-layout">
          <anchor-search @search="onSearch" />
          <p class="text">{{searchWord}}</p>
        </div>
      </li>
      <li>
        <h3>anchor-input</h3>
        <ol class="sub-inline">
          <li>
            <h3>双向绑定输入框</h3>
            <div class="demo-layout">
              <anchor-input v-model="inputValue" defaultText="双向绑定, testing~" />
            </div>
            <p class="text">{{inputValue}}</p>
          </li>
          <li>
            <h3>数字框</h3>
            <div class="demo-layout">
              <anchor-input :alwaysFeedback="false" valueType="number" :digit="4" :initValue="88" :width="100" @onChange="changeValue" />
            </div>
            <p class="text">{{inputNumber}}</p>
          </li>
          <li>
            <h3>禁止输入</h3>
            <div class="demo-layout">
              <anchor-input disabled defaultText="禁止输入" />
            </div>
          </li>
          <li>
            <h3>自定义宽高</h3>
            <div class="demo-layout">
              <anchor-input defaultText="请输入内容" :height="60" :width="200"/>
            </div>
          </li>
          <li>
            <h3>保持高亮</h3>
            <div class="demo-layout">
              <anchor-input :alwaysActive="true" defaultText="请输入内容"/>
            </div>
          </li>
          <li>
            <h3>初始高亮</h3>
            <div class="demo-layout">
              <anchor-input :isActive="true" defaultText="请输入内容"/>
            </div>
          </li>
          <li>
            <h3>单选按钮</h3>
            <div class="demo-layout">
              <anchor-input mode="radio" v-model="inputValue3" />
              <anchor-input mode="radio" isActive />
              <anchor-input mode="radio" disabled />
              <anchor-input mode="radio" isActive disabled />
            </div>
            <p class="text">{{inputValue3}}</p>
          </li>
          <li>
            <h3>多选按钮</h3>
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
        <h3>anchor-button</h3>
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
        <h3>anchor-menu-vertical</h3>
        <div class="demo-layout">
          <anchor-menu-vertical></anchor-menu-vertical>
        </div>
      </li>
      <li>
        <h3>anchor-switch-label</h3>
        <div class="demo-layout">
          区域：<anchor-switch-label :initData="regions" :onChangeBack="onLabelChange.bind(null, 'regions')"/>
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
  import AnchorIcon from 'Packages/icons/src/icons'
  import AnchorMenuVertical from 'Packages/menu-vertical/src/menu-vertical'
  import AnchorSwitchLabel from 'Packages/switch-label/src/switch-label'
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorButton from 'Packages/button/src/button'
  import AnchorInput from 'Packages/input/src/input'
  import AnchorSearch from 'Packages/search/src/search'
  import AnchorNav from 'Packages/nav/src/nav'
  import AnchorSelectNumber from 'Packages/select-number/src/select-number'
  import AnchorPagination from 'Packages/pagination/src/pagination'
  import AnchorTable from 'Packages/table/src/table'
  import AnchorTbody from 'Packages/table-parts/src/table-body'
  import AnchorBreadCrumb from 'Packages/bread-crumb/src/bread-crumb'
  import AnchorTabs from 'Packages/tabs/src/tabs'

  import staticData from 'Examples/src/assets/js/model/demo'

  export default {
    name: 'demo',
    components: {
      AnchorIcon,
      AnchorMenuVertical,
      AnchorSwitchLabel,
      AnchorDropDown,
      AnchorButton,
      AnchorInput,
      AnchorSearch,
      AnchorNav,
      AnchorSelectNumber,
      AnchorPagination,
      AnchorTable,
      AnchorTbody,
      AnchorBreadCrumb,
      AnchorTabs,
    },

    methods: {
      onTableClick (params) {
        console.log('demo', params)
      },

      onPageChange (obj) {
        this.pageData = obj
      },

      changeValue (val, oldVal) {
        this.inputNumber = val
      },

      onSearch (keyword) {
        this.searchWord = keyword
      },

      onLabelChange (type, item, key) {
        if (type === 'regions') {
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
    > li h3{
      font-size: 16px;
      color: red;
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
