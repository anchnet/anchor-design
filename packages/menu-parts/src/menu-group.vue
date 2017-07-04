<template>
  <div :class="['anchor-menu-group']">
    <div @click="oneItem ? '' : handler()">
      <slot name="group-title"></slot>
    </div>
    <transition v-if="!oneItem" name="anchor-animation__slide-vertical">
      <div ref="content" v-show="isShow">
        <div ref="contentWrapper">
          <slot name="group-item"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import vQuery from 'Src/libs/vQuery'
  import mixin from 'Src/libs/mixin'

  export default {
    name: 'anchor-menu-group',

    mixins: [mixin],

    props: {
      oneItem: {
        type: Boolean,
        default: false
      },

      showGroup: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        isShow: this.showGroup
      }
    },

    methods: {
      handler () {
        if (this.isShow) {
          this.fixHeight()
        }

        this.isShow = !this.isShow

        this.$nextTick(() => {
          if (this.isShow) {
            this.fixHeight()
            setTimeout(() => {
              vQuery(this.$refs.content).css({'height': '', 'overflow': ''})
            }, 300)
          } else {
            this.fixHeight().css({'height': 0})
            setTimeout(() => {
              vQuery(this.$refs.content).css({'height': '', 'overflow': ''})
            }, 350)
          }
        })
      },

      fixHeight () {
        let content = this.getContentDOM()
        content.$element.css({'height': content.height + 'px', 'overflow': 'hidden'})
        return content.$element
      },

      getContentDOM () {
        let $element = vQuery(this.$refs.content)
        let $contentWrapper = vQuery(this.$refs.contentWrapper)
        let height = $contentWrapper.height()
        return {$element, height}
      }
    }
  }
</script>