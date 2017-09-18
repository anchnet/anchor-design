<template>
  <div :class="['anchor-pagination']">
    <span v-if="computedMode.showTotal" :class="['anchor-pagination__text']">共{{total}}条, </span>
    <span v-if="computedMode.showPerUnit" :class="['anchor-pagination__text']"><!--
   -->每页显示<!--
   --><span v-if="typeof perUnit === 'number'">{{perUnit}}</span>
      <anchor-drop-down
        v-else
        mode="simple"
        :height="24"
        :style="{'margin-left': '8px'}"
        :data="perUnit.data"
        :defaultText="perUnit.defaultText"
        :defaultId="perUnit.defaultId"
        @onSelect="onSelect"
      /><!--
   -->条
    </span>
    <span
      :class="['anchor-pagination__operate']"
      @mouseenter="leftActive = true"
      @mouseleave="leftActive = false"
      @click="onPageChange('reduce')"
    >
      <anchor-icon name="direction__left-style-3" :active="leftActive" />
    </span><!--
 --><ul :class="['anchor-pagination__list']">
      <li
        v-for="value in pageList"
        :class="['anchor-pagination__list-item', {
          'anchor-pagination__list-item--active': value === currentPage,
          'anchor-pagination__list-item--disabled': value === '...'
        }]"
        @click="value === '...' ? '' : onPageChange(value)"
      >
        <span :class="['anchor-pagination__list-item-text']">{{value}}</span>
      </li>
    </ul><!--
 --><span
      :class="['anchor-pagination__operate']"
      @mouseenter="rightActive = true"
      @mouseleave="rightActive = false"
      @click="onPageChange('add')"
    >
      <anchor-icon name="direction__right-style-3" :active="rightActive" />
    </span>
    <span v-if="computedMode.showGoTo" :class="['anchor-pagination__text']">
      前往
      <anchor-input valueType="number" size="smaller" :alwaysFeedback="false" @onChange="onPageChange" />
      页
    </span>
  </div>
</template>

<script>
  import mixin from 'src/libs/mixin'
  import AnchorInput from 'packages/input/src/input'
  import AnchorDropDown from 'packages/drop-down/src/drop-down'
  import AnchorIcon from "packages/icons/src/icons";

  export default {
    name: 'anchor-pagination',

    mixins: [mixin],

    components: {
      AnchorIcon, AnchorInput, AnchorDropDown
    },

    props: {
      mode: {
        type: [String, Object],
        default: 'normal'
      },

      total: Number,

      perUnit: [Number, Object],

      keepPage: {
        type: Boolean,
        default: false
      },

      setCurrentPage: {
        type: Number,
        default: 1
      },

      setCurrentEntry: Number,
    },

    data () {
      return {
        leftActive: false,
        rightActive: false,
        currentUnit: -1,
        currentPage: 1
      }
    },

    watch: {
      setCurrentPage: {
        immediate: true,
        handler (val) {
          if (!this.setCurrentEntry) {
            this.currentPage = val
          }
        }
      },

      setCurrentEntry: {
        immediate: true,
        handler (val) {
          if (val === undefined) return
          let currentUnit
          if (this.currentUnit > 0) {
            currentUnit = this.currentUnit
          } else {
            currentUnit = this.getCurrentUnit()
          }
          this.currentPage = Math.ceil(val / currentUnit)
        }
      }
    },

    computed: {
      computedMode () {
        if (this.mode === 'simple') {
          return {
            showTotal: false,
            showPerUnit: false,
            showGoTo: false
          }
        } else if (typeof this.mode === 'object') {
          return this.mode
        } else {
          return {
            showTotal: true,
            showPerUnit: true,
            showGoTo: true
          }
        }
      },

      currentData () {
        return {
          currentPage: this.currentPage,
          currentEntry: this.transformEntryAndPage({page: this.currentPage}),
          perUnit: this.currentUnit,
          totalPage: this.pageCount,
          totalCount: this.total
        }
      },

      pageCount () {
        let currentUnit = this.currentUnit
        if (currentUnit === -1) {
          currentUnit = this.getCurrentUnit()
          this.currentUnit = currentUnit
        }
        let count = Math.ceil(this.total / currentUnit)

        let currentPage = this.currentPage
        if (currentPage > count) currentPage = count
        if (currentPage < 1) currentPage = 1

        this.currentPage = currentPage
        return count
      },

      pageList () {
        let pageList = []
        let pageCount = this.pageCount
        let currentPage = this.currentPage
        if (this.total < 0 || pageCount < 0) return pageList
        if (pageCount < 10)
          pageList = pageCount
        else {
          let leftArr = [], middleArr = [], rightArr = []
          if (currentPage < 6) {
            middleArr = [1,2,3,4,5,6,7]
            rightArr = ['...', pageCount]
          } else if (currentPage > pageCount - 7) {
            leftArr = [1, '...']
            middleArr = [pageCount - 6, pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
          } else {
            leftArr = [1, '...']
            middleArr = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
            rightArr = ['...', pageCount]
          }
          pageList = pageList.concat(leftArr, middleArr, rightArr)
        }
        return pageList
      },
    },

    methods: {
      onSelect (item, key) {
        if (!this.keepPage) {
          let oldUnit = this.currentUnit
          let entryKey = this.transformEntryAndPage({unit: oldUnit, page: this.currentPage})
          let newPage = this.transformEntryAndPage({unit: item.id, entryKey})
          this.currentPage = newPage
        }
        this.currentUnit = item.id
        this.triggerBack()
      },

      onPageChange (val) {
        let page = this.getComputedPage(val)
        this.currentPage = page
        this.triggerBack()
      },

      getComputedPage (val) {
        let oldPage, page
        oldPage = page = this.currentPage
        if (val === 'reduce')
          page = page > 1 ? --page : 1
        else if (val === 'add')
          page = page < this.pageCount ? ++page : this.pageCount
        else page = val

        return page > 0 && page <= this.pageCount ? page : oldPage
      },

      transformEntryAndPage ({unit = this.currentUnit, entryKey = null, page = null} = obj) {
        if (entryKey)
          return Math.ceil(entryKey / unit)
        else if (page)
          return (page - 1) * unit + 1
        else return null
      },

      getCurrentUnit () {
        let currentUnit = -1
        if (!this.perUnit) {
        } else if (typeof this.perUnit === 'number')
          currentUnit = this.perUnit
        else {
          if (this.perUnit.defaultId) currentUnit = this.perUnit.defaultId
          else currentUnit = this.perUnit.data[0]['id']
        }
        return currentUnit
      },

      triggerBack () {
        this.$nextTick(() => {
          let callback = () => this.$emit('onPageChange', this.currentData)
          this.__triggerBack(callback, this.currentData)
        })
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/pagination" />
