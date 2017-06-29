<template>
  <div :class="['menu-vertical']" :style="{'width': width + 'px', 'height': height + 'px'}">
    <anchor-menu-group :key="key" v-for="(item, key) in rootData">
      <anchor-menu-title
        slot="group-title"
        :class="['menu-vertical__title']"
        :title="item.text"
        :hasChildren="!!item.children"
        v-if="item.level !== 2"
      />
      <anchor-menu-vertical-item slot="group-item" v-if="item.children" :children="item.children" :data="data2" />
    </anchor-menu-group>
  </div>
</template>

<script>
  import vQuery from 'Src/libs/vQuery'

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
        type: Array,
        default () {
          return [
            {id: 'mainTitle1', index: '1', parent: null, children: ['subTitle1-1', 'subTitle1-2'], text: '主标题名称1'},
            {id: 'subTitle1-1', index: '1-1', parent: 'subTitle1-1', children: ['content1-1-1', 'content1-1-2'], text: '副标题名称1-1'},
            {id: 'content1-1-1', index: '1-1-1', parent: 'content1-1', text: '菜单内容1-1-1', clickable: true},
            {id: 'content1-1-2', index: '1-1-2', parent: 'content1-1', text: '菜单内容1-1-2', clickable: true},
            {id: 'subTitle1-2', index: '1-2', parent: 'subTitle1', children: ['content1-2-1'], text: '副标题名称1-2'},
            {id: 'content1-2-1', index: '1-2-1', parent: 'subTitle1-2', text: '菜单内容1-2-1', clickable: false},
            {id: 'mainTitle2', index: '2', parent: null, children: ['subTitle2-1', 'subTitle2-2'], text: '主标题名称2'},
            {id: 'subTitle2-1', index: '2-1', parent: 'mainTitle2', text: '副标题名称2-1'},
            {id: 'subTitle2-2', index: '2-2', parent: 'mainTitle2', children: ['content2-2-1'], text: '副标题名称2-2'},
            {id: 'content2-2-1', index: '2-2-1', parent: 'subTitle2-2', text: '菜单内容2-2-1', clickable: true},
            {id: 'mainTitle3', index: '3', parent: null, children: ['content3-0-1'], text: '主标题名称3'},
            {id: 'content3-0-1', index: '3-0-1', parent: 'mainTitle3', text: '菜单内容3-0-1', clickable: false}
          ]
        }
      },

      data2: {
        type: Object,
        default () {
          return {
            'mainTitle1': {
              id: 'mainTitle1',
              index: '1',
              parent: null,
              level: 0,
              children: ['subTitle1-1', 'subTitle1-2'],
              text: '主标题名称1'
            },
            'subTitle1-1': {
              id: 'subTitle1-1',
              index: '1-1',
              level: 1,
              parent: 'subTitle1-1',
              children: ['content1-1-1', 'content1-1-2'],
              text: '副标题名称1-1'
            },
            'content1-1-1': {
              id: 'content1-1-1',
              index: '1-1-1',
              level: 2,
              parent: 'content1-1',
              text: '菜单内容1-1-1',
              clickable: true
            },
            'content1-1-2': {
              id: 'content1-1-2',
              index: '1-1-2',
              level: 2,
              parent: 'content1-1',
              text: '菜单内容1-1-2',
              clickable: true
            },
            'subTitle1-2': {
              id: 'subTitle1-2',
              index: '1-2',
              level: 1,
              parent: 'subTitle1',
              children: ['content1-2-1'],
              text: '副标题名称1-2'
            },
            'content1-2-1': {
              id: 'content1-2-1',
              index: '1-2-1',
              level: 2,
              parent: 'subTitle1-2',
              text: '菜单内容1-2-1',
              clickable: false
            },
            'mainTitle2': {
              id: 'mainTitle2',
              index: '2',
              parent: null,
              level: 0,
              children: ['subTitle2-1', 'subTitle2-2'],
              text: '主标题名称2'
            },
            'subTitle2-1': {
              id: 'subTitle2-1',
              index: '2-1',
              level: 1,
              parent: 'mainTitle2',
              text: '副标题名称2-1'
            },
            'subTitle2-2': {
              id: 'subTitle2-2',
              index: '2-2',
              level: 1,
              parent: 'mainTitle2',
              children: ['content2-2-1'],
              text: '副标题名称2-2'
            },
            'content2-2-1': {
              id: 'content2-2-1',
              index: '2-2-1',
              level: 2,
              parent: 'subTitle2-2',
              text: '菜单内容2-2-1',
              clickable: true
            },
            'mainTitle3': {
              id: 'mainTitle3',
              index: '3',
              parent: null,
              level: 0,
              children: ['content3-0-1'],
              text: '主标题名称3'
            },
            'content3-0-1': {
              id: 'content3-0-1',
              index: '3-0-1',
              level: 2,
              parent: 'mainTitle3',
              text: '菜单内容3-0-1',
              clickable: false
            }
          }
        }
      },

      width: {
        type: Number,
        default: 240
      },

      height: {
        type: Number,
        default: 500
      }
    },

    computed: {
      rootData () {
        let newData = []
        let data2 = JSON.parse(JSON.stringify(this.data2))
        Object.keys(data2).forEach((k) => {
          let item = data2[k]
          if (!item.parent) newData.push(item)
        })
        return newData
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-vertical" />
