<template>
  <div :class="['layout']">
    <div :class="['layout__left']">
      <router-link :class="['layout__logo-wrapper']" :to="{ name: 'home' }">
        <img :class="['layout__logo']" src="../../../src/img/logo-full-white.svg" />
      </router-link>
      <anchor-menu-vertical :data="menuData" @handleClick="handleClick" />
    </div>
    <div :class="['layout__right']">
      <anchor-nav :class="['layout__nav']" :leftData="leftData" :middleData="middleData" :rightData="rightData" hiddenNavLeft />
      <div :class="['layout__main']">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AnchorNav from 'packages/nav/src/nav'
  import AnchorMenuVertical from 'packages/menu-vertical/src/menu-vertical'

  import staticData from 'examples/src/assets/js/model/layout'

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
  @import "../assets/scss/public";
  @import "~scss/mixins";
  @import "~scss/variables";

  @include b('layout'){
    position: relative;
    height: 100%;

    @include e('left'){
      position: absolute;
      width: 240px;
      height: 100%;
      background-color: $color-menu-bg;
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


    @include e('right'){
      height: 100%;
      margin-left: 240px;
      background-color: $color-base-background;
      overflow-y: auto;
    }

    .layout__nav{
      position: absolute;
      top: 0;
      right: 0;
      width: 87.5%;
      width: calc(100% - 240px);
    }

    @include e('main'){
      margin: 71px 15px 15px;
      padding: 15px;
      box-sizing: border-box;
      border: 1px solid $color-table-line;
      box-shadow: 0 0 6px $color-table-line;
      border-radius: 4px;
      background-color: #ffffff;
    }
  }
</style>