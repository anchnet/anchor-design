<template>
  <span
    :class="['menu-title']"
    @mouseenter="alwaysActive ? '' : mouseHover(true)"
    @mouseleave="alwaysActive ? '' : mouseHover(false)"
    @click="onClick()"
    :style="{'width': width + 'px', 'height': height + 'px', 'line-height': height + 'px'}"
    :title="title"
  >
    <anchor-icon
      v-if="hasIcon || hasDot"
      :type="hasDot ? 'dot' : icon.type"
      :name="hasDot ? '' : icon.name"
      :active="elementStatus"
      :style="[iconStyle, {'margin-top': '-7px', 'left': '20px'}]"
    /><!--
    -->{{title}}<!--
    --><anchor-icon
      type="triangle"
      :name="triangleName"
      :active="elementStatus"
      :class="['anchor-animation__rotate3d', {'anchor-animation__rotate3d--top-down': isShow}]"
      :style="[iconStyle, {'margin-top': '-2px', 'right': model === 'sub' ? '22px' : '12px'}]"
    />
  </span>
</template>

<script>
  import AnchorIcon from 'Packages/icons/src/anchor-icon'

  export default {
    name: 'menu-title',

    components: {
      AnchorIcon
    },

    props: {
      model: {
        type: String,
        default: 'main'
      },

      width: {
        type: Number,
        default: 240
      },

      height: {
        type: Number,
        default: 40
      },

      title: {
        type: String,
        default: '主标题名称'
      },

      hasIcon: {
        type: Boolean,
        default: true
      },

      hasDot: {
        type: Boolean,
        default: false
      },

      alwaysActive: {
        type: Boolean,
        default: false
      },

      icon: {
        type: Object,
        default () {
          return {
            type: 'device',
            name: 'instance'
          }
        }
      },

      triangleName: {
        type: String,
        default: 'down'
      }
    },

    data () {
      return {
        active: false,
        isShow: false
      }
    },

    computed: {
      elementStatus () {
        return this.alwaysActive || this.isShow ? true : this.active
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
        isShow ? this.$emit('open') : this.$emit('close')
        this.isShow = isShow
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-title" />
