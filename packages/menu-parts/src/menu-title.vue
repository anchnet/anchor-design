<template>
  <span
    :class="['menu-title']"
    @mouseenter="alwaysActive ? '' : mouseHover(true)"
    @mouseleave="alwaysActive ? '' : mouseHover(false)"
    @click="onClick()"
  >
    <anchor-icon v-if="hasIcon" type="device" name="instance" :active="elementStatus" />
    <span
      :class="['menu-title__text']"
      :style="{'width': width - 100 + 'px', 'height': height + 'px', 'line-height': height + 'px'}"
    >{{title}}</span>
    <anchor-icon
      type="triangle"
      :name="triangleName"
      :active="elementStatus"
      :class="['anchor-animation__rotate3d', {'anchor-animation__rotate3d--top-down': isShow}]"
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

      alwaysActive: {
        type: Boolean,
        default: false
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
      }
    },

    methods: {
      mouseHover (status) {
        this.active = status
      },

      onClick () {
        this.isShow = !this.isShow
        this.$emit('onClickBack')
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-title" />
