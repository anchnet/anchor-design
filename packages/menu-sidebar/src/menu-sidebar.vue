<template>
  <div :class="['menu-sidebar']">
    <div class="menu-sidebar__title_active">Menu Sidebar</div>
  </div>
</template>

<script>
  export default {
    name: 'menu-sidebar'
  }
</script>

<style lang="scss">
  .menu-sidebar{
    &__title{
      font-size: 18px;
      &_active{
        color: red;
      }
    }
  }
</style>
