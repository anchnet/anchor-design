<template>
  <i :class="['anchor-icon', `anchor-icon__${type}`]"></i>
</template>

<script>
  export default {
    name: 'anchor-icon',

    props: {
      type: {
        type: String,
        default: 'instance'
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/icons" />
