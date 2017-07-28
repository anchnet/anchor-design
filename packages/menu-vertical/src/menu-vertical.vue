<template>
  <div :class="['anchor-menu-vertical']">
    <anchor-menu-group v-for="(item, key) in data" :key="key">
      <anchor-menu-title slot="group-title" :title="item.text" @handleClick="handleClick(item, ...arguments)" />
      <anchor-menu-vertical-item
        slot="group-item"
        v-if="item.children && item.children.length"
        v-for="(value, index) in item.children"
        :key="index"
        :data="value"
        :indent="1"
        @handleClick="handleClick"
      />
    </anchor-menu-group>
  </div>
</template>

<script>
  import mixin from 'Src/libs/mixin'
  import utils from 'Src/libs/utils'
  import AnchorMenuGroup from 'Packages/menu-parts/src/menu-group'
  import AnchorMenuTitle from 'Packages/menu-parts/src/menu-title'
  import AnchorMenuVerticalItem from './menu-vertical-item'

  export default {
    name: 'anchor-menu-vertical',

    mixins: [mixin],

    components: {
      AnchorMenuVerticalItem, AnchorMenuGroup, AnchorMenuTitle,
    },

    props: {
      data: Array,
    },

    methods: {
      handleClick (item, status) {
        this.$emit('handleClick', item, status)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-vertical" />
