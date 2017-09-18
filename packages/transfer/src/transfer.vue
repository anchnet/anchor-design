<template>
  <div :class="['anchor-transfer']">
    <div :class="['anchor-transfer__main']">
      <anchor-transfer-item
        :width="config.width"
        :height="config.height"
        :searchable="config.searchable"
        :hasFooter="config.hasFooter"
        :title="config.title"
        :data="Data"
        @handleClick="onLeftClick"
        @onSearch="onSearch('main', 0, ...arguments)"
      />
    </div>
    <div :class="['anchor-transfer__sub-wrapper']" :style="subWrapperStyle">
      <div v-for="(item, key) in SubData" :class="['anchor-transfer__sub']">
        <div :class="['anchor-transfer__sub-left']">
          <div :class="['anchor-transfer__sub-button']">
            <anchor-button
              btnStyle="5"
              :height="24"
              :text="item.textToLeft"
              :isDisabled="!filters.data || !filters.data.length"
              @handleClick="onTransfer(key, 'toRight')"
            />
          </div>
          <div :class="['anchor-transfer__sub-button']">
            <anchor-button
              btnStyle="5"
              :height="24"
              :text="item.textToRight"
              :isDisabled="!item.data.length || !item.filters.data.length"
              @handleClick="onTransfer(key, 'toLeft')"
            />
          </div>
        </div>
        <div :class="['anchor-transfer__sub-right']">
          <anchor-transfer-item
            :width="item.width"
            :height="subHeight"
            :searchable="item.searchable"
            :hasFooter="item.hasFooter"
            :title="item.title"
            :data="item.data"
            @handleClick="onRightClick(key, ...arguments)"
            @onSearch="onSearch('sub', key, ...arguments)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from 'src/libs/utils'
  import AnchorButton from 'packages/button/src/button'
  import AnchorTransferItem from './transfer-item'

  export default {
    name: 'anchor-transfer',

    components: {
      AnchorButton, AnchorTransferItem,
    },

    props: {
      data: Array,
      config: Object,
      subData: [Object, Array],
    },

    data () {
      return {
        Data: utils.clone(this.data),
        filters: {},
        SubData: [],
      }
    },

    computed: {
      subHeight () {
        let totalHeight = this.config && this.config.height ? this.config.height : 300
        let count = this.subData ? utils.isObject(this.subData) ? 1 : this.subData.length : 1
        let padding = 20 * (count - 1)
        return (totalHeight - padding) / count
      },

      allChecked () {
        return !!this.filters.data && this.filters.data.length === this.Data.length
      },

      subWrapperStyle () {
        return {
          'margin-left': this.config && this.config.width ? this.config.width + 2 + 'px' : ''
        }
      }
    },

    watch: {
      data (val) {
        this.Data = utils.clone(val)
      },

      subData: {
        immediate: true,
        handler (val) {
          let subData = utils.clone(val)
          if (utils.isObject(subData)) {
            subData = [subData]
          }
          subData.forEach((i) => {
            i.data = utils.isArray(i.data) ? i.data : []
            i.existIds = []
            i.filters = {data: []}
            i.data.forEach((v) => {
              i.existIds.push(v.id)
            })
          })
          this.SubData = subData
        }
      }
    },

    methods: {
      onLeftClick (filters) {
        this.filters = filters
      },

      onRightClick (key, filters) {
        this.SubData[key].filters = filters
      },

      onSearch (type, key, val, oldVal) {
        this.$emit('onSearch', {type, key, value: val, oldValue: oldValue})
      },

      onTransfer (key, action) {
        if (action === 'toRight') {
          // 清除左侧栏已选中数据状态
          this.Data.forEach((i, k) => {
            this.$set(this.Data[k], 'active', false)
          })

          // 过滤掉被选中的数据中已转移过的数据，防止数据重复
          let addData = [], existIds = this.SubData[key].existIds || []
          this.filters.data.forEach((i) => {
            i.active = false
            if (!existIds.includes(i.id)) {
              addData.push(i)
              existIds.push(i.id)
            }
          })
          // 更新转移后的数据
          this.SubData[key].data = this.SubData[key].data.concat(addData)
          // 标记已转移的数据，用于过滤重复数据
          this.SubData[key].existIds = existIds

        } else {
          // 删除右侧栏已选中数据
          let remainData = [], remainIds = [], currentItem = this.SubData[key]
          currentItem.data.forEach((i, k) => {
            if (!currentItem.filters.keys.includes(k)) {
              remainData.push(i)
              remainIds.push(i.id)
            }
          })
          this.SubData[key].data = remainData
          this.SubData[key].existIds = remainIds
        }
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/transfer" />