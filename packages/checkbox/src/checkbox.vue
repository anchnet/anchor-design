<template>
  <div :class="['anchor-checkbox']">
    <div
      v-for="(item, key) in Data"
      :class="['anchor-checkbox__element', {
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
    </div>
  </div>
</template>

<script>
  import AnchorInput from 'Packages/input/src/input'

  export default {
    name: 'anchor-checkbox',

    components: {
      AnchorInput
    },

    props: {
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
        handler (val) {
          this.Data = val
        }
      },
      Data: {
        deep: true,
        handler (val) {
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
        }
      }
    },

    methods: {
      onClick (item, key) {
        this.$set(this.Data[key], 'active', !item.active)
        this.$nextTick(() => {
          this.$emit('handleClick', this.filters)
        })
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/checkbox" />