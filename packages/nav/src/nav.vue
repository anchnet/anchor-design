<template>
  <div :class="['anchor-nav']" :style="navStyle">
    <slot name="nav-left">
      <div v-if="!hiddenNavLeft" :class="['anchor-nav__left']">
        <a :class="['anchor-nav__left-link']" target="_blank" href="https://www.anchnet.com/">
          <img :class="['anchor-nav__left-image']" src="../../../src/img/logo-full-white.svg" />
        </a>
      </div>
    </slot>
    <div :class="['anchor-nav__main']">
      <div
        v-if="child.data.length"
        v-for="(child, index) in navData"
        :class="[`anchor-nav__main-${child.position}`]"
        :style="{'line-height': child.position === 'middle' ? height + 'px' : ''}"
      >
        <anchor-element
          :height="height"
          v-for="(item, key) in child.data"
          :key="key"
          :mode="item.mode"
          :width="item.width"
          :style="item.style"
          :iconName="item.iconName"
          :text="item.text"
          :textConfig="item.textConfig"
          :dropDownConfig="item.dropDownConfig"
          :onChangeBack="handleClick.bind(null, item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import AnchorElement from './element'
  export default {
    name: 'anchor-nav',

    components: {
      AnchorElement
    },

    props: {
      width: [Number, String],
      height: {
        type: Number,
        default: 54
      },

      hiddenNavLeft: {
        type: Boolean,
        default: false
      },

      leftData: Array,
      middleData: Array,
      rightData: Array
    },

    computed: {
      navData () {
        let leftData = this.leftData ? this.leftData : []
        let middleData = this.middleData ? this.middleData : []
        let rightData = this.rightData ? this.rightData : []
        return [
          {position: 'left', data: leftData},
          {position: 'middle', data: middleData},
          {position: 'right', data: rightData}
        ]
      },

      navStyle () {
        let height = this.height + 'px'
        let width = typeof this.width === 'number' ? this.width + 'px' : this.width
        return {height, width}
      }
    },

    methods: {
      handleClick (id, item, key) {

      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/nav" />
