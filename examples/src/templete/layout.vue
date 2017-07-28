<template>
  <div :class="['layout']">
    <anchor-nav :leftData="leftData" :middleData="middleData" :rightData="rightData" />
    <div>
      <div>
        <anchor-menu-vertical />
      </div>
      <div>
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
    }
  }
</script>

<style lang="scss">
  @import "Src/scss/base";
</style>