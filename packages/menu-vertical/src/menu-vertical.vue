<template>
  <div :class="['menu-vertical']" :style="{'width': width + 'px', 'min-height': minHeight + 'px'}">
    <anchor-menu-group :key="key" v-for="(item, key) in rootData">
      <anchor-menu-title
        slot="group-title"
        :class="['menu-vertical__title']"
        :title="item.text"
        :hasIcon="item.hasIcon"
        :iconName="item.iconName"
        :hasChildren="!!item.children"
        @handleClick="handleClick(item)"
      />
      <anchor-menu-vertical-item
        v-if="item.children"
        slot="group-item"
        :children="item.children"
        :data="data"
        @handleClick="handleClick"
      />
    </anchor-menu-group>
  </div>
</template>

<script>
  import AnchorMenuVerticalItem from './menu-vertical-item'
  import AnchorMenuGroup from 'Packages/menu-parts/src/menu-group'
  import AnchorMenuTitle from 'Packages/menu-parts/src/menu-title'
  import mixin from 'Src/libs/mixin'

  export default {
    name: 'anchor-menu-vertical',

    mixins: [mixin],

    components: {
      AnchorMenuVerticalItem, AnchorMenuGroup, AnchorMenuTitle
    },

    props: {
      data: Object,

      width: {
        type: Number,
        default: 240
      },

      minHeight: {
        type: Number,
        default: 300
      }
    },

    computed: {
      rootData () {
        let newData = []
        Object.keys(this.data).forEach((k) => {
          let item = this.data[k]
          if (item.isRoot) newData.push(item)
        })
        return newData
      }
    },

    methods: {
      handleClick (item) {
        this.$emit('handleClick', item)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-vertical" />
