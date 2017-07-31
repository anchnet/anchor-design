<template>
  <div :class="['anchor-row', rowClass]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'anchor-row',

    props: {
      mode: {
        type: String,
        default: 'float'
      },

      justifyContent: {
        type: String,
        default: ''
      },
      alignItems: {
        type: String,
        default: ''
      },
    },

    computed: {
      rowClass () {
        return {
          'anchor-row__flex': this.mode === 'flex',
          [`anchor-row__flex--${this.justifyContent}`]: this.mode === 'flex' && this.justifyContent,
          [`anchor-row__flex--${this.alignItems}`]: this.mode === 'flex' && this.alignItems,
        }
      },
    }
  }
</script>

<style lang="scss" src="Src/scss/files/layout" />