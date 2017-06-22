<template>
  <div>
    <menu-sidebar></menu-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MenuSidebar from 'Packages/menu-sidebar/src/menu-sidebar'

  export default {
    name: 'layout',
    components: {
      MenuSidebar
    }
  }
</script>