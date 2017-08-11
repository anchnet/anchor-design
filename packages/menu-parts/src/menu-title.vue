<template>
  <span
    :class="['menu-title', {'menu-title__sub': isSub}]"
    @mouseenter="alwaysActive ? '' : mouseHover(true)"
    @mouseleave="alwaysActive ? '' : mouseHover(false)"
    @click="clickable ? onClick() : ''"
    :style="titleStyle"
    :title="title"
  >
    <slot name="icon">
      <anchor-icon
        v-if="hasIcon"
        :name="iconName"
        :active="elementStatus"
        :style="[iconStyle, leftIconStyle]"
      />
    </slot>
    <slot name="title">{{title}}</slot>
    <anchor-icon
      v-if="hasChildren"
      :name="triangleName"
      :active="elementStatus"
      :isRotating="isShow"
      :style="[iconStyle, {'margin-top': '-2px', 'right': isSub ? '22px' : '12px'}]"
    />
  </span>
</template>

<script>
  import AnchorIcon from 'packages/icons/src/icons'
  import mixin from 'src/libs/mixin'

  /**
   * mode {string} the type of title, includes the title of main and the title of sub
   * title {string} the text of title
   * hasIcon {boolean} weather showing the icon or not
   * hasChildren {boolean} if the component hasn't child content, hide the icon of traingle
   * alwaysActive {boolean} weather make the icon under lighting or not
   * icon {object} choose the icon, includes sets of type and name
   * triangleName {string} choose the icon of triangle
   * width {number}
   * height {number}
   * paddingLeft {number}
   */
  export default {
    name: 'anchor-menu-title',

    mixins: [mixin],

    components: {
      AnchorIcon
    },

    props: {
      onChangeBack: Function,

      mode: {
        type: String,
        default: 'main'
      },

      title: {
        type: String,
        default: '标题名称'
      },

      hasIcon: {
        type: Boolean,
        default: true
      },

      iconName: {
        type: String,
        default: 'dot'
      },

      hasChildren: {
        type: Boolean,
        default: true
      },

      alwaysActive: {
        type: Boolean,
        default: false
      },

      clickable: {
        type: Boolean,
        default: true
      },

      triangleName: {
        type: String,
        default: 'triangle__down'
      },

      width: {
        type: Number,
        default: 240
      },

      height: {
        type: Number,
        default: 40
      },

      paddingLeft: {
        type: Number,
        default: 50
      }
    },

    data () {
      return {
        active: false,
        isShow: false
      }
    },

    computed: {
      isSub () {
        return this.mode === 'sub'
      },

      elementStatus () {
        return this.alwaysActive || this.isShow ? true : this.active
      },

      titleStyle () {
        return {
          'width': this.width + 'px',
          'height': this.height + 'px',
          'line-height': this.height + 'px',
          'padding-left': this.paddingLeft + 'px'
        }
      },

      leftIconStyle () {
        return {
          'margin-top': this.iconName === 'dot' ? '-3px' : '-7px',
          'left': this.iconName === 'dot' ? this.paddingLeft - 20 + 'px' : this.paddingLeft - 30 + 'px'
        }
      },

      iconStyle () {
        return {
          'position': 'absolute',
          'top': '50%'
        }
      }
    },

    methods: {
      mouseHover (status) {
        this.active = status
      },

      onClick () {
        let isShow = !this.isShow
        if (this.$emit.bind(null, 'handleClick')) {
          let status = isShow ? 'open' : 'close'
          this.$emit('handleClick', status)
        } else {
          isShow ? this.$emit('open') : this.$emit('close')
        }
        this.isShow = isShow
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/menu-title" />
