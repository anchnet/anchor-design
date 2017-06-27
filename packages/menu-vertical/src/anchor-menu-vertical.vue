<template>
  <div :class="['menu-vertical']" :style="{'width': width + 'px'}">
    <!--主菜单1-->
    <anchor-menu-group>
      <anchor-menu-title slot="group-title" :class="['menu-vertical__title']" />

      <anchor-menu-group slot="group-item">
        <anchor-menu-title slot="group-title" :hasDot="true" :class="['menu-vertical__title']" />
        <anchor-menu-content slot="group-item" :class="['menu-vertical__content']" />
        <anchor-menu-content slot="group-item" :class="['menu-vertical__content']" />
      </anchor-menu-group>

      <anchor-menu-group slot="group-item">
        <anchor-menu-title slot="group-title" :hasDot="true" :class="['menu-vertical__title']" />
        <anchor-menu-content slot="group-item" :class="['menu-vertical__content']" />
      </anchor-menu-group>
    </anchor-menu-group>

    <!--主菜单2-->
    <anchor-menu-group slot="group-item">
      <anchor-menu-title slot="group-title" :class="['menu-vertical__title']" />
      <anchor-menu-title slot="group-title" :hasDot="true" :class="['menu-vertical__title']" />
      <anchor-menu-content slot="group-item" :class="['menu-vertical__content']" />
    </anchor-menu-group>

    <!--主菜单3-->
    <anchor-menu-group slot="group-item">
      <anchor-menu-title slot="group-title" :class="['menu-vertical__title']" />
      <anchor-menu-content slot="group-item" :class="['menu-vertical__content']" />
    </anchor-menu-group>
  </div>
</template>

<script>
  import AnchorMenuGroup from 'Packages/menu-parts/src/anchor-menu-group'
  import AnchorMenuTitle from 'Packages/menu-parts/src/anchor-menu-title'
  import AnchorMenuContent from 'Packages/menu-parts/src/anchor-menu-content'

  export default {
    name: 'menu-vertical',

    components: {
      AnchorMenuGroup, AnchorMenuTitle, AnchorMenuContent
    },

    props: {
      data: {
        type: Array,
        default () {
          return [
            {id: 'mainTitle1', index: '1', text: '主标题名称1'},
            {id: 'subTitle1-1', index: '1-1', text: '副标题名称1-1'},
            {id: 'content1-1-1', index: '1-1-1', text: '菜单内容1-1-1', clickable: true},
            {id: 'content1-1-2', index: '1-1-2', text: '菜单内容1-1-2', clickable: true},
            {id: 'subTitle2', index: '1-2', text: '副标题名称1-2'},
            {id: 'content1-2-1', index: '1-2-1', text: '菜单内容1-2-1', clickable: false},
            {id: 'mainTitle2', index: '2', text: '主标题名称2'},
            {id: 'subTitle2-1', index: '2-1', text: '副标题名称2-1'},
            {id: 'subTitle2-2', index: '2-2', text: '副标题名称2-2'},
            {id: 'content2-2-1', index: '2-2-1', text: '菜单内容2-2-1', clickable: true},
            {id: 'mainTitle3', index: '3', text: '主标题名称3'},
            {id: 'content3-0-1', index: '3-0-1', text: '菜单内容3-0-1', clickable: false}
          ]
        }
      },

      width: {
        type: Number,
        default: 240
      }
    },

    computed: {
      computedData () {
        return []
      }
    },

    methods: {
      close (obj) {
        return JSON.parse(JSON.stringify(obj))
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/menu-vertical" />
