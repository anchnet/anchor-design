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
    <slot name="button-left">
      <anchor-icon
        v-if="iconName"
        :name="iconName"
        :active="active"
        :style="{'margin-right': '8px'}"
      />
    </slot>
    <span
      v-if="!removeText && !link"
      :title="text"
      :class="['anchor-button__text']"
      :style="textStyle"
    ><slot name="button-text">{{text}}</slot></span>
    <a
      v-if="!removeText && link"
      :title="text"
      :target="targetText"
      :href="link"
      :class="['anchor-button__text']"
      :style="textStyle"><slot name="button-text">{{text}}</slot></a>
    <slot name="button-right"></slot>
  </span>
</template>

<script>
  /**
   * mode [string] 设置 button 类型，包含'Button'，'tag'，默认为'button'
   * text [string] 按钮文字
   * link [string] 按钮跳转路由, 优先于点击事件
   * targetText [string] 跳转模式，即 a 标签的 target 属性，默认为'_self'
   * textWidth: [number] 设置按钮内文字宽度，由于要保持文字超出设定值显示为省略的样式，因此需要手灯设置文字宽度，不设置怎根据按钮内边距和总宽度计算生成
   * width [number] 按钮总宽度
   * height [number] 按钮总高度
   * btnStyle [string, number] button 模式下，组件内设的按钮样式['1','2','3','4','5','6',]
   * tagColor [string] tag 模式下的内设按钮样式，包含['EA9509', '2B90E8', 'AEA202', '6F57FF', 'E15E85', '1AADE1', 'F96E28',]
   * removeText [boolean] 是否显示文字，默认为 true
   * iconName [string] 图标名称, 名称来源于 anchor-icon 组件
   * isHover [boolean] 是否处于 hover 状态，默认为 false
   * isActive [boolean] 是否一直处于 active 状态，默认为 false
   * isClicked [boolean] 是否绑定点击事件，默认为 true
   * isDisabled [boolean] 是否处于禁用状态
   */

  import AnchorIcon from 'Packages/icons/src/icons'

  export default {
    name: 'anchor-button',

    components: {
      AnchorIcon
    },

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

      removeText: {
        type: Boolean,
        default: false
      },

      iconName: {
        type: [String, Boolean],
        default: ''
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

      link: {
        type: String,
        default: ''
      },

      targetText: {
        type: String,
        default: '_self'
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