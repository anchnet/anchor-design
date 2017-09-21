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
        <h4>anchor-radio</h4>
        <div class="demo-layout">
          <anchor-radio :data="radioData" />
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
  import staticData from 'examples/src/assets/js/model/demo'

  export default {
    name: 'home',

    methods: {
      onTableClick (params) {
        console.log('demo', params)
      },

      onPageChange (obj) {
        this.pageData = obj
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
