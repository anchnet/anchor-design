<template>
  <div :class="['anchor-table-wrapper']" :style="{'width': width ? width + 'px' : ''}">
    <table :class="['anchor-table']">
      <colgroup>
        <col v-if="hasCheckbox" width="12" />
        <col
          v-if="defineCol"
          v-for="(item, key) in theadData"
          :width="item.width"
          :class="item.class"
        />
      </colgroup>
      <anchor-thead
        :hasCheckbox="hasCheckbox"
        :data="theadData"
        :selected="checkedMap.allChecked"
        :disabled="checkedMap.allDisabled"
        :maps="maps"
        :onClickBack="onHeadClick"
      />
      <slot></slot>
    </table>
  </div>
</template>

<script>
  import mixin from 'Src/libs/mixin'
  import utils from 'Src/libs/utils'
  import AnchorThead from 'Packages/table-parts/src/table-head'
  import AnchorTbody from 'Packages/table-parts/src/table-body'

  export default {
    name: 'anchor-table',

    mixins: [mixin],

    components: {
      AnchorThead, AnchorTbody
    },

    props: {
      width: [Number, String],
      theadData: Array,
      listData: Array,
      maps: {
        type: Object,
        default () {
          return {}
        }
      },
      onChangeBack: Function,

      defineCol: {
        type: Boolean,
        default: false
      },

      hasCheckbox: {
        type: Boolean,
        default: true
      },
    },

    data () {
      return {
        ListData: this.listData,
        checkedMap: {},
        selectedData: [],
        options: {
          filters: {},
        },
      }
    },

    watch: {
      listData: {
        immediate: true,
        deep: true,
        handler (val) {
          let count = 0
          let allDisabled = true
          let selectedData = []
          val.forEach((i) => {
            if (i.active) {
              count++
              selectedData.push(i)
            }
            if (!i.disabled) allDisabled = false
          })
          this.checkedMap = {
            allDisabled: allDisabled,
            allChecked: count === val.length,
            hasChecked: count > 0,
            multiChecked: count > 1,
            singleChecked: count === 1,
            notChekced: count === 0
          }
          this.selectedData = selectedData
          this.ListData = val
          this.triggerBack()
        },
      }
    },

    methods: {
      onHeadClick (params) {
        switch (params.type) {
          case 'filters':
            let options = this.options
            options[params.type][params.theadId] = params.item
            this.options = options
            this.triggerBack()
            break
          case 'select':
            this.ListData.forEach((i, k) => {
              if (!i.disabled) {
                this.$set(this.ListData[k], 'active', params.checked)
              }
            })
            break
          default:
        }
      },

      cleanStatus () {
        this.ListData.forEach((i, k) => {
          if (!i.disabled) {
            this.$set(this.ListData[k], 'active', false)
          }
        })
      },

      triggerBack () {
        this.$nextTick(() => {
          let params = {
            checkedMap: this.checkedMap,
            options: this.options,
            selectedData: this.selectedData
          }
          let callback = () => this.$emit('handleClick', params)
          this.__triggerBack(callback, params)
        })
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/table" />
