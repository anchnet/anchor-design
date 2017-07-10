<template>
  <div :class="['anchor-nav']">
    <slot name="nav-left">
      <div :class="['anchor-nav__left']">
        <a :class="['anchor-nav__left-link']" target="_blank" href="https://www.anchnet.com/">
          <img :class="['anchor-nav__left-image']" src="../../../src/img/logo-full-white.svg" />
        </a>
      </div>
    </slot>
    <div
      :class="['anchor-nav__main']"
    >
      <div v-if="leftData && leftData.length" :class="['anchor-nav__main-left']">
        <anchor-element
          :key="key"
          v-for="(item, key) in leftData"
          :mode="item.mode"
          :text="item.text"
          :link="item.link"
          :iconName="item.iconName"
          :targetText="item.targetText"
          :listData="item.listData"
          :height="54"
          :width="item.width"
          :margin="item.margin"
          :dropDownWidth="item.dropDownWidth"
        />
      </div>
      <div :class="['anchor-nav__main-middle']"></div>
      <div :class="['anchor-nav__main-right']">
        <anchor-element
          :key="key"
          v-for="(item, key) in rightData"
          :mode="item.mode"
          :text="item.text"
          :link="item.link"
          :iconName="item.iconName"
          :targetText="item.targetText"
          :listData="item.listData"
          :height="54"
          :width="item.width"
          :margin="item.margin"
          :dropDownWidth="item.dropDownWidth"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import AnchorElement from './element'
  export default {
    name: 'anchor-nav',

    components: {
      AnchorElement
    },

    props: {
      width: [Number, String],
      height: Number,

      leftData: {
        type: Array,
        default () {
          return [
            {
              id: 'left1',
              mode: 'icon-text',
              iconName: 'device-colored__hosting',
              text: '控制台首页',
              link: 'https://www.anchnet.com/',
              targetText: '_blank',
              margin: '0 40px 0 20px'
            },
            {
              id: 'left2',
              mode: 'dropDown',
              text: '产品与服务',
              dropDownWidth: 95,
              listData: [
                {id: 'instance', value: '云服务器'},
                {id: 'rdb', value: '云数据库'},
              ]
            }
          ]
        }
      },
      middleData: {
        type: Array,
        default () {
          return []
        }
      },
      rightData: {
        type: Array,
        default () {
          return [
            {
              id: 'right1',
              mode: 'dropDown',
              text: '帮助与服务',
              targetText: '_blank',
              dropDownWidth: 96,
              margin: '0 40px 0 0',
              listData: [
                {id: 'instance', value: '云服务器'},
                {id: 'rdb', value: '云数据库'},
              ]
            },
            {
              id: 'right2',
              mode: 'icon-dropDown',
              iconName: 'device-colored__dServer',
              text: '产品与服务',
              dropDownWidth: 120,
              margin: '0 20px 0 0',
              listData: [
                {id: 'instance', value: '云服务器'},
                {id: 'rdb', value: '云数据库'},
              ]
            }
          ]
        }
      }
    },

    data () {
      return {

      }
    },

    methods: {

    }
  }
</script>

<style lang="scss" src="Src/scss/files/nav" />