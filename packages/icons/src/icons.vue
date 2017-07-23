<template>
  <transition name="anchor-animation__rotate3d--top-down">
    <i
      :class="[block, blockElement, {
        [`${blockElement}--active`]: active,
        [`${blockElement}--disabled`]: disabled,
        'anchor-animation__rotate3d': blockName === 'triangle' || isRotating,
        [`anchor-animation__rotate3d--${computedDir}`]: isRotating && computedDir,
      }]"
      @click="disabled ? '' : handleClick()"
    ></i>
  </transition>
</template>

<script>
  /**
   * params:
   * name {string} 'dot' 图标名称，格式采用'xxx__xx'，中间用双下划线分隔
   * active {boolean} false 是否处于 active 状态
   * disabled {boolean} false 是否处于禁用状态
   * isRotating {boolean} false 是否进行旋转
   * direction {string} '' 旋转方向, 'top-down': 上下旋转，'left-right': 左右旋转
   */
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
      disabled: {
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
    },

    methods: {
      handleClick () {
        this.$emit('handleClick')
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/icons" />
