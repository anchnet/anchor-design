<template>
  <transition name="anchor-animation__rotate3d--top-down">
    <i
      :class="[
        `anchor-icon-${type}`,
        `anchor-icon-${type}${name ? '__' + name : ''}`,
        {
          [`anchor-icon-${type}${name ? '__' + name : ''}--active`]: active,
          'anchor-animation__rotate3d': isRotate,
          [`anchor-animation__rotate3d--${direction}`]: isRotate && rotating,
        }
      ]"
    ></i>
  </transition>
</template>

<script>
  export default {
    name: 'anchor-icon',

    props: {
      type: String,
      name: String,
      active: {
        type: Boolean,
        default: false
      },
      rotating: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      isRotate () {
        return this.type === 'triangle'
      },
      direction () {
        if (['top', 'down'].includes(name)) {
          return 'top-down'
        } else if (['left', 'right'].includes(name)) {
          return 'left-right'
        }
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/icons" />
