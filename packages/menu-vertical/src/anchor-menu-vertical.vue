<template>
  <div :class="['menu-vertical']" :style="{'width': width + 'px', 'min-height': minHeight + 'px'}">
    <anchor-menu-group :key="key" v-for="(item, key) in rootData">
      <anchor-menu-title
        slot="group-title"
        :class="['menu-vertical__title']"
        :title="item.text"
        :hasChildren="!!item.children"
        @handleClick="handleClick(item)"
        v-if="item.level !== 2"
      />
      <anchor-menu-vertical-item
        slot="group-item"
        v-if="item.children"
        :children="item.children"
        :data="data"
        @handleClick="handleClick"
      />
    </anchor-menu-group>
  </div>
</template>

<script>
  import AnchorMenuVerticalItem from './anchor-menu-vertical-item'
  import AnchorMenuGroup from 'Packages/menu-parts/src/anchor-menu-group'
  import AnchorMenuTitle from 'Packages/menu-parts/src/anchor-menu-title'

  export default {
    name: 'menu-vertical',

    components: {
      AnchorMenuVerticalItem, AnchorMenuGroup, AnchorMenuTitle
    },

    props: {
      data: {
        type: Object,
        default () {
          return {
            'mainTitle1': {id: 'mainTitle1', index: '1', type: 'title', children: ['subTitle1-1', 'subTitle1-2'], text: '主标题名称1', isRoot: true},
            'subTitle1-1': {id: 'subTitle1-1', index: '1-1', type: 'title', children: ['content1-1-1', 'content1-1-2'], text: '副标题名称1-1'},
            'content1-1-1': {id: 'content1-1-1', index: '1-1-1', type: 'content', text: '菜单内容1-1-1', clickable: true},
            'content1-1-2': {id: 'content1-1-2', index: '1-1-2', type: 'content', text: '菜单内容1-1-2', clickable: true},
            'subTitle1-2': {id: 'subTitle1-2', index: '1-2', type: 'title', children: ['content1-2-1'], text: '副标题名称1-2'},
            'content1-2-1': {id: 'content1-2-1', index: '1-2-1', type: 'content', text: '菜单内容1-2-1', clickable: false},
            'mainTitle2': {id: 'mainTitle2', index: '2', type: 'title', children: ['subTitle2-1', 'subTitle2-2'], text: '主标题名称2', isRoot: true},
            'subTitle2-1': {id: 'subTitle2-1', index: '2-1', type: 'title', text: '副标题名称2-1'},
            'subTitle2-2': {id: 'subTitle2-2', index: '2-2', type: 'title', children: ['content2-2-1'], text: '副标题名称2-2'},
            'content2-2-1': {id: 'content2-2-1', index: '2-2-1', type: 'content', text: '菜单内容2-2-1', clickable: true},
            'mainTitle3': {id: 'mainTitle3', index: '3', type: 'title', children: ['content3-0-1'], text: '主标题名称3', isRoot: true},
            'content3-0-1': {id: 'content3-0-1', index: '3-0-1', type: 'content', text: '菜单内容3-0-1', clickable: false}
          }
        }
      },

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
