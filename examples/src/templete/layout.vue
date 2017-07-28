<template>
  <div :class="['layout']">
    <div class="layout__left">
      <a :class="['layout__logo-wrapper']" target="_blank" href="https://www.anchnet.com/">
        <img :class="['layout__logo']" src="../../../src/img/logo-full-white.svg" />
      </a>
      <anchor-menu-vertical :data="menuData" @handleClick="handleClick" />
    </div>
    <div class="layout__right">
      <anchor-nav class="layout__nav" :leftData="leftData" :middleData="middleData" :rightData="rightData" hiddenNavLeft />
      <div class="layout__main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AnchorNav from 'Packages/nav/src/nav'
  import AnchorMenuVertical from 'Packages/menu-vertical/src/menu-vertical'

  import staticData from 'Examples/src/assets/js/model/layout'

  export default {
    name: 'layout',

    components: {
      AnchorNav,
      AnchorMenuVertical,
    },

    data () {
      return {
        ...staticData
      }
    },

    methods: {
      handleClick (data, status) {
        console.log('layout',data, status)
      }
    }
  }
</script>

<style lang="scss">
  @import "Src/scss/base";
  @import "~scss/mixins";
  @import "~scss/variables";

  @include b('layout'){
    position: relative;
    height: 100%;
    background-color: $color-menu-bg;

    @include e('left'){
      float: left;
      width: 240px;
    }

    @include e('right'){
      margin-left: 240px;
      background-color: #ffffff;
    }

    @include e('logo-wrapper'){
      display: block;
      width: 100%;
      height: 55px;
      text-align: center;
      background-color: $color-primary;
    }

    @include e('logo'){
      display: inline-block;
      margin-top: 8px;
    }
  }
</style>