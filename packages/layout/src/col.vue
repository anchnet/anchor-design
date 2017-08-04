<template>
  <div
    :class="['anchor-col', `anchor-col__span-${span}`]"
    :style="colStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'anchor-col',

    props: {
      span: {
        type: [Number, String],
        default: 12,
      },

      offset: {
        type: [Number, String],
        default: 0,
      }
    },

    computed: {
      colStyle () {
        let offset = Number(this.offset) / 24 * 100
        return {
          'margin-left': offset ? offset + '%' : '',
        }
      }
    },
  }
</script>