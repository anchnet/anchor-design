<template>
  <ul :class="['anchor-checkbox']">
    <li
      v-for="(item, key) in Data"
      :class="['anchor-checkbox__element', {
        'anchor-checkbox__element-vertical': mode === 'vertical',
        'anchor-checkbox__element--disabled': item.disabled
      }]"
      @click="item.disabled ? '' : onClick(item, key)"
    >
      <anchor-input
        mode="checkbox"
        :class="['anchor-checkbox__button']"
        :isActive="item.active"
        :disabled="item.disabled"
      />{{item.value}}
    </li>
  </ul>
</template>

<script>
  import AnchorInput from 'packages/input/src/input'

  export default {
    name: 'anchor-checkbox',

    components: {
      AnchorInput
    },

    props: {
      mode: {
        type: String,
        default: 'horizontal'
      },

      data: Array,
    },

    data () {
      return {
        Data: this.data,
        filters: {}
      }
    },

    watch: {
      data: {
        deep: true,
        handler (val) {
          this.Data = val
          this.getFilters(val)
          this.triggerBack()
        }
      }
    },

    methods: {
      getFilters (val) {
        let filters = {keys: [], data: [], ids: [],}
        val.forEach((i, k) => {
          if (i.active) {
            filters.keys.push(k)
            filters.data.push(i)
            if (i.hasOwnProperty('id')) {
              filters.ids.push(i.id)
            }
          }
        })
        this.filters = filters
      },

      onClick (item, key) {
        this.$set(this.Data[key], 'active', !item.active)
      },

      triggerBack () {
        this.$nextTick(() => {
          this.$emit('handleClick', this.filters)
        })
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/checkbox" />