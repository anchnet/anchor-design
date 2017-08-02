<template>
  <div :class="['anchor-search']">
    <anchor-input
      mode="search"
      :iconPosition="iconPosition"
      v-model="value"
      :defaultText="defaultText"
      @onKeyupEnter="onKeyupEnter"
      @search="mode === 'simple' ? handleClick() : ''"
    />
    <anchor-button v-if="mode === 'normal'" :class="['anchor-search__button']" btnStyle="2" text="查询" @handleClick="handleClick()" />
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
      mode: {
        type: String,
        default: 'normal'
      },

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

    computed: {
      iconPosition () {
        return this.mode === 'simple' ? 'right' : 'left'
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