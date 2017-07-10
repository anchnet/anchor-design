<template>
  <transition name="anchor-animation__rotate3d--top-down">
    <i
      :class="[block, blockElement, {
        [`${blockElement}--active`]: active,
        'anchor-animation__rotate3d': blockName === 'triangle' || isRotating,
        [`anchor-animation__rotate3d--${computedDir}`]: isRotating && computedDir,
      }]"
    ></i>
  </transition>
</template>

<script>
  import mixin from 'Src/libs/mixin'

  export default {
    name: 'anchor-icon',

    mixins: [mixin],

    props: {
      name: {
        type: String,
        default: 'dot'
      },
      active: {
        type: Boolean,
        default: false
      },
      loadAnimation: {
        type: Boolean,
        default: false
      },
      isRotating: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        blockName: '',
        block: '',
        blockElement: '',
        _direction: 'top-down'
      }
    },

    computed: {
      computedDir () {
        if (this.direction) return this.direction
        else return this._direction
      }
    },

    watch: {
      name: {
        immediate: true,
        handler (val) {
          this.blockElement = `anchor-icon-${val}`
          let arr = val.split('__')
          this.blockName = arr[0] ? arr[0] : ''
          this.block = arr[1] ? `anchor-icon-${arr[0]}` : ''
          if (!arr[1]) return
          if (['top', 'down'].includes(arr[1])) this._direction = 'top-down'
          if (['left', 'right'].includes(arr[1])) this._direction = 'left-right'
        }
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/icons" />
