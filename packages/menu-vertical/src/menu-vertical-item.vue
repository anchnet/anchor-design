<template>
  <div>
    <anchor-menu-group :key="key" v-for="(item, key) in childrenData">
      <anchor-menu-title
        slot="group-title"
        :class="['menu-vertical__title']"
        :title="item.text"
        :oneItem="!item.children"
        mode="sub"
        :hasDot="true"
        :hasChildren="!!item.children"
        v-if="item.type !== 'content'"
        @handleClick="handleClick(item)"
      />
      <anchor-menu-content
        slot="group-title"
        :class="['menu-vertical__content']"
        :content="item.text"
        :oneItem="true"
        v-else-if="!item.children && item.type === 'content'"
        @handleClick="handleClick(item)"
      />
      <anchor-menu-vertical-item
        slot="group-item"
        :children="item.children"
        :data="data"
        v-if="!!item.children"
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