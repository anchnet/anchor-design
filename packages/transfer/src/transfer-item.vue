<template>
  <div :class="['anchor-transfer__box']" :style="boxStyle">
    <div :class="['anchor-transfer__box-header']">{{title}}</div>
    <div :class="['anchor-transfer__box-body']">
      <div v-if="searchable" :class="['anchor-transfer__main-search']">
        <anchor-input mode="search" iconPosition="right" @onKeyupEnter="onSearch" @onSearch="onSearch"/>
      </div>
      <div :class="['anchor-transfer__list-wrapper']" :style="listWrapperStyle">
        <anchor-checkbox
          mode="vertical"
          :data="Data"
          :class="['anchor-transfer__box-list']"
          @handleClick="onClick"
        />
      </div>
    </div>
    <div v-if="hasFooter" :class="['anchor-transfer__box-footer']">
      <anchor-input
        mode="checkbox"
        :isActive="allChecked"
        :disabled="!Data.length"
        :class="['anchor-transfer__checkbox']"
        @handleClick="onAllClick"
      />{{filters.data.length}}/{{Data.length}}条
    </div>
  </div>
</template>

<script>
  import utils from 'src/libs/utils'
  import AnchorInput from 'packages/input/src/input'
  import AnchorButton from 'packages/button/src/button'
  import AnchorCheckbox from 'packages/checkbox/src/checkbox'

  export default {
    name: 'anchor-transfer-item',

    components: {
      AnchorInput, AnchorButton, AnchorCheckbox,
    },

    props: {
      data: Array,
      title: String,
      searchable: {
        type: Boolean,
        default: false
      },
      hasFooter: {
        type: Boolean,
        default: true
      },
      width: Number,
      height: Number,
    },

    data () {
      return {
        Data: utils.clone(this.data),
        filters: {
          data: [],
        },
      }
    },

    computed: {
      allChecked () {
        return !!this.Data.length && this.filters.data.length === this.Data.length
      },

      boxStyle () {
        return {
          'width': this.width ? this.width + 'px' : ''
        }
      },

      listWrapperStyle () {
        let height = '', calcHeight = 0
        if (this.height) {
          calcHeight = this.height - 50
          if (this.searchable) calcHeight -= 41
          if (this.hasFooter) calcHeight -= 28
        }
        if (calcHeight) height = calcHeight + 'px'
        return {
          'height': height
        }
      },
    },

    watch: {
      data (val) {
        this.Data = utils.clone(val)
      }
    },

    methods: {
      onClick (filters) {
        this.filters = filters
        this.triggerBack()
      },

      onAllClick (status) {
        this.Data.forEach((i, k) => {
          this.$set(this.Data[k], 'active', status)
        })
      },

      onSearch (val, oldVal) {
        if (this.asynSearch) {
          this.$emit('onSearch', val, oldVal)
        } else {

        }
      },

      triggerBack () {
        this.$nextTick(() => {
          this.$emit('handleClick', this.filters)
        })
      }
    }
  }
</script>