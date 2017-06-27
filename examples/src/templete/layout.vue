<template>
  <div>
    <anchor-menu-vertical></anchor-menu-vertical>
    <router-view></router-view>
  </div>
</template>

<script>
  import AnchorMenuVertical from 'Packages/menu-vertical/src/anchor-menu-vertical'

  export default {
    name: 'layout',
    components: {
      AnchorMenuVertical
    }
  }
</script>

<style lang="sass">
  @import "Src/scss/base"
</style>