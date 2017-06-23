<template>
  <span :class="['menu-title']">
    <anchor-icon />
    <span :class="['menu-title__text']">云计算</span>
  </span>
</template>

<script>
  import AnchorIcon from "Packages/icons/src/anchor-icon";

  export default {
    name: 'menu-title',

    components: {
      AnchorIcon
    },

    props: {
      model: {
        type: String,
        default: 'vertical'
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-title" />
