<template>
  <div :class="['anchor-radio']">
    <div
      v-for="(item, key) in Data"
      :class="['anchor-radio__element', {
        'anchor-radio__element--disabled': item.disabled
      }]"
      @click="item.disabled ? '' : onClick(item, key)"
    >
      <anchor-input
        mode="radio"
        :class="['anchor-radio__button']"
        :isActive="item.active"
        :disabled="item.disabled"
      />{{item.value}}
    </div>
  </div>
</template>

<script>
  import AnchorInput from 'Packages/input/src/input'

  export default {
    name: 'anchor-radio',

    components: {
      AnchorInput
    },

    props: {
      data: Array,
    },

    data () {
      return {
        Data: this.data,
        clickedKey: null,
      }
    },

    watch: {
      data (val) {
        this.Data = val
      }
    },

    methods: {
      onClick (item, key) {
        if (this.clickedKey === key) return
        this.clickedKey = key
        this.Data.forEach((i, k) => {
          this.$set(this.Data[k], 'active', k === key)
        })
        this.$emit('handleClick', item, key)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/radio" />