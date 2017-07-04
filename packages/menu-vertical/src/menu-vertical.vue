<template>
  <div :class="['menu-vertical']" :style="{'width': width + 'px', 'min-height': minHeight + 'px'}">
    <anchor-menu-group :key="key" v-for="(item, key) in rootData">
      <slot name="menu-vertial-title">
        <anchor-menu-title
          slot="group-title"
          :class="['menu-vertical__title']"
          :title="item.text"
          :hasIcon="item.hasIcon"
          :hasDot="item.hasDot"
          :hasChildren="!!item.children"
          @handleClick="handleClick(item)"
        />
      </slot>
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
      data: {
        type: Object,
        default () {
          return {
            'mainTitle1': {id: 'mainTitle1', type: 'title', children: ['subTitle1-1', 'subTitle1-2'], text: '主标题名称1', hasDot: true, isRoot: true},
            'subTitle1-1': {id: 'subTitle1-1', type: 'title', children: ['content1-1-1', 'content1-1-2'], text: '副标题名称1-1'},
            'content1-1-1': {id: 'content1-1-1', type: 'content', text: '菜单内容1-1-1', clickable: true},
            'content1-1-2': {id: 'content1-1-2', type: 'content', text: '菜单内容1-1-2', clickable: true},
            'subTitle1-2': {id: 'subTitle1-2', type: 'title', children: ['content1-2-1'], text: '副标题名称1-2'},
            'content1-2-1': {id: 'content1-2-1', type: 'content', text: '菜单内容1-2-1', clickable: false},
            'mainTitle2': {id: 'mainTitle2', type: 'title', children: ['subTitle2-1', 'subTitle2-2'], text: '主标题名称2', hasDot: true, isRoot: true},
            'subTitle2-1': {id: 'subTitle2-1', type: 'title', text: '副标题名称2-1'},
            'subTitle2-2': {id: 'subTitle2-2', type: 'title', children: ['content2-2-1'], text: '副标题名称2-2'},
            'content2-2-1': {id: 'content2-2-1', type: 'content', text: '菜单内容2-2-1', clickable: true},
            'mainTitle3': {id: 'mainTitle3', type: 'title', children: ['content3-0-1'], text: '主标题名称3', hasDot: true, isRoot: true},
            'content3-0-1': {id: 'content3-0-1', type: 'content', text: '菜单内容3-0-1', clickable: false}
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
