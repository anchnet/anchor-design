<template>
  <div :class="['menu-vertical']">
    <div :class="['menu-vertical__wrapper']">
      <menu-title></menu-title>
      <ul :class="['menu-vertical__list']"></ul>
    </div>
  </div>
</template>

<script>
  import MenuTitle from 'Packages/menu-parts/src/menu-title'

  export default {
    name: 'menu-vertical',

    components: {
      MenuTitle
    },

    props: {
      model: {
        type: String,
        default: 'vertical'
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-vertical" />
