<template>
  <div :class="['anchor-menu-group']">
    <div @click="oneItem ? '' : handler()">
      <slot name="group-title"></slot>
    </div>
    <transition v-if="!oneItem" name="anchor-animation__slide-vertical">
      <div ref="contentWrapper" v-show="isShow">
        <div ref="content">
          <slot name="group-item"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'anchor-menu-group',

    props: {
      oneItem: {
        type: Boolean,
        default: false
      },
    },

    data () {
      return {
        isShow: false
      }
    },

    methods: {
      handler () {
        if (this.isShow) this.fixHeight()

        this.isShow = !this.isShow

        let status = this.isShow ? 'open' : 'close'
        this.$emit('handleClick', status)

        this.$nextTick(() => {
          if (this.isShow) {
            this.fixHeight()
            setTimeout(() => {
              vQuery(this.$refs.contentWrapper).css({'height': '', 'overflow': ''})
            }, 300)
          } else {
            this.fixHeight().css({'height': 0})
            setTimeout(() => {
              vQuery(this.$refs.contentWrapper).css({'height': '', 'overflow': ''})
            }, 350)
          }
        })
      },

      fixHeight () {
        let contentWrapper = this.getContentDOM()
        contentWrapper.$contentWrapper.css({'height': contentWrapper.height + 'px', 'overflow': 'hidden'})
        return contentWrapper.$contentWrapper
      },

      getContentDOM () {
        let $contentWrapper = vQuery(this.$refs.contentWrapper)
        let $content = vQuery(this.$refs.content)
        let height = $content.height()
        return {$contentWrapper, height}
      }
    }
  }
</script>