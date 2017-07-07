<template>
  <div :class="['anchor-nav']">
    <div :class="['anchor-nav__left']"></div>
    <div :class="['anchor-nav__main']">
      <div :class="['anchor-nav__main-left']"></div>
      <div :class="['anchor-nav__main-center']"></div>
      <div :class="['anchor-nav__main-right']"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'anchor-nav',

    props: {

    },

    data () {
      return {

      }
    },

    methods: {

    }
  }
</script>

<style lang="scss" src="Src/scss/files/nav" />