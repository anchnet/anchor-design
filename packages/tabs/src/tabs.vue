<template>
  <div :class="['anchor-tabs']">
    <ul :class="['anchor-tabs__card']">
      <li
        v-for="(item, key) in data"
        :class="['anchor-tabs__element-wrapper']"
      >
        <a :class="['anchor-tabs__element']">
          <div :class="['anchor-tabs__element-text']">{{item.text}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'anchor-tabs',

    props: {
      data: Array,
    },
  }
</script>

<style lang="scss" src="Src/scss/files/tabs" />