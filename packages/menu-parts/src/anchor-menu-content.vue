<template>
  <span
    :title="content"
    :class="['menu-content', {'menu-content--active': active}]"
    @mouseenter="mouseHover(true)"
    @mouseleave="mouseHover(false)"
    @click="onClick()"
    :style="contentStyle"
  >
    <span v-show="active" :class="['menu-content__bar']"></span>
    <slot name="content">{{content}}</slot></span>
</template>

<script>
  import AnchorIcon from 'Packages/icons/src/anchor-icon'

  export default {
    name: 'anchor-menu-content',

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

      content: {
        type: String,
        default: '列表内容'
      },

      paddingLeft: {
        type: Number,
        default: 70
      }
    },

    data () {
      return {
        active: false
      }
    },

    computed: {
      contentStyle () {
        return {
          'width': this.width + 'px',
          'height': this.height + 'px',
          'line-height': this.height + 'px',
          'padding-left': this.paddingLeft + 'px'
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
        if (this.$emit.bind(null, 'handleClick')) {
          this.$emit('handleClick')
        }
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-content" />
