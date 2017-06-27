<template>
  <div :class="['anchor-menu-group']">
    <slot name="group-title"></slot>
    <transition name="anchor-menu-group">
      <ul>
        <slot name="group-item"></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'anchor-menu-group',

    props: {
      items: Array
    }
  }
</script>