<template>
  <div :class="['anchor-search']">
    <anchor-input mode="search" v-model="value" :defaultText="defaultText" @onKeyupEnter="onKeyupEnter" />
    <anchor-button :class="['anchor-search__button']" btnStyle="2" text="查询" @handleClick="handleClick()" />
  </div>
</template>

<script>
  import mixin from 'Src/libs/mixin'
  import AnchorInput from 'Packages/input/src/input'
  import AnchorButton from 'Packages/button/src/button'

  export default {
    name: 'anchor-search',

    mixins: [mixin],

    components: {
      AnchorInput, AnchorButton
    },

    props: {
      defaultText: {
        type: [String, Number],
        default: '敲回车键试试~'
      },

      onChangeBack: Function
    },

    data () {
      return {
        value: null
      }
    },

    methods: {
      onKeyupEnter (val, oldVal) {
        this.handleClick()
      },

      handleClick () {
        let callback = () => {
          this.$emit('search', this.value)
        }
        this['__triggerBack'](callback, this.value)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/search" />