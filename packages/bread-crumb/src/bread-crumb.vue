<template>
  <div :class="['anchor-breadcrumb']">
    <span
      v-for="(item, key) in data"
      :class="['anchor-breadcrumb__element', {
        'anchor-breadcrumb__element--active': !!item.to
      }]"
    >
      <a v-if="!!item.to" :class="['anchor-breadcrumb__text']" :href="item.to">{{item.text}}</a>
      <span v-else :class="['anchor-breadcrumb__text']">{{item.text}}</span>
      <span v-if="key !== data.length - 1" :class="['anchor-breadcrumb__separator']">{{item.separator ? item.separator : separator}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'anchor-bread-crumb',

    props: {
      data: Array,
      separator: {
        type: String,
        default: '>'
      }
    },
  }
</script>

<style lang="scss" src="Src/scss/files/bread-crumb"/>

