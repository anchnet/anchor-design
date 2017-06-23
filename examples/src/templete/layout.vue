<template>
  <div>
    <menu-vertical></menu-vertical>
    <router-view></router-view>
  </div>
</template>

<script>
  import MenuVertical from 'Packages/menu-vertical/src/menu-vertical'

  export default {
    name: 'layout',
    components: {
      MenuVertical
    }
  }
</script>