<template>
  <div>
    <anchor-menu-group :key="key" v-for="(item, key) in childrenData">
      <anchor-menu-title
        v-if="item.type !== 'content'"
        slot="group-title"
        mode="sub"
        :class="['menu-vertical__title']"
        :title="item.text"
        :hasIcon="item.hasIcon"
        :iconName="item.iconName ? item.iconName : 'dot'"
        :hasChildren="!!item.children"
        :clickable="item.children ? true : item.clickable"
        @handleClick="handleClick(item)"
      />
      <anchor-menu-content
        v-else-if="!item.children && item.type === 'content'"
        slot="group-title"
        :class="['menu-vertical__content']"
        :content="item.text"
        :clickable="item.clickable"
        @handleClick="handleClick(item)"
      />
      <anchor-menu-vertical-item
        v-if="!!item.children"
        slot="group-item"
        :children="item.children"
        :data="data"
        @handleClick="handleClick"
      />
    </anchor-menu-group>
  </div>
</template>

<script>
  import AnchorMenuGroup from 'Packages/menu-parts/src/menu-group'
  import AnchorMenuTitle from 'Packages/menu-parts/src/menu-title'
  import AnchorMenuContent from 'Packages/menu-parts/src/menu-content'
  import mixin from 'Src/libs/mixin'

  export default {
    name: 'anchor-menu-vertical-item',

    mixins: [mixin],

    components: {
      AnchorMenuGroup, AnchorMenuTitle, AnchorMenuContent
    },

    props: {
      children: Array,
      data: Object
    },

    computed: {
      childrenData () {
        let newData = []
        if (this.children && this.children.length) {
          this.children.forEach((k) => {
            newData.push(this.data[k])
          })
        }
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