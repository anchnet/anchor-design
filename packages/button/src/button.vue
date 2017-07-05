<template>
  <span
    :class="['anchor-button', {
      'anchor-button__tag': mode === 'tag',
      [`anchor-button__tag--color-${tagColor.toUpperCase()}`]: mode === 'tag',
      'anchor-button__tag--disabled': mode === 'tag' && isDisabled,
      [`anchor-button__style-${btnStyle}`]: mode === 'button',
      [`anchor-button__style-${btnStyle}--disabled`]: mode === 'button' && isDisabled,
      [`anchor-button__style-${btnStyle}--active`]: mode === 'button' && isActive && !isDisabled
    }]"
    :style="buttonStyle"
    @mouseenter="hoverStatus ? onHover(true) : ''"
    @mouseleave="hoverStatus ? onHover(false) : ''"
    @click="isClicked && !isDisabled ? handleClick() : ''"
  >
    <slot name="button-left"></slot>
    <span
      :title="text"
      :class="['anchor-button__text']"
      :style="textStyle"
    ><slot name="button-text">{{text}}</slot></span>
    <slot name="button-right"></slot>
  </span>
</template>

<script>
  export default {
    name: 'anchor-button',

    props: {
      mode: {
        type: String,
        default: 'button'
      },

      btnStyle: {
        type: [Number, String],
        default: 1
      },

      tagColor: {
        type: String,
        default: 'EA9509'
      },

      isHover: {
        type: Boolean,
        default: false
      },

      isClicked: {
        type: Boolean,
        default: true
      },

      isActive: {
        type: Boolean,
        default: false
      },

      isDisabled: {
        type: Boolean,
        default: false
      },

      text: {
        type: [String, Number],
        default: '按钮文字'
      },

      textWidth: Number,
      width: Number,
      height: Number
    },

    data () {
      return {
        active: false
      }
    },

    computed: {
      hoverStatus () {
        return this.isHover || this.isClicked && !this.isDisabled
      },

      buttonStyle () {
        let style = {
          width: this.width ? this.width + 'px' : ''
        }
        if (this.mode === 'tag') {
          style.cursor = this.isClicked ? 'pointer' : 'default'
        }
        return style
      },

      textStyle () {
        return {
          width: this.textWidth ? this.textWidth + 'px' : '',
          height: this.height ? this.height + 'px' : '',
          'line-height': this.height ? this.height + 'px' : ''
        }
      },
    },

    methods: {
      onHover (isHover) {
        this.active = isHover
        this.$emit('onHover', isHover)
      },

      handleClick () {
        this.$emit('handleClick')
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/button" />