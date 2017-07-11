<template>
  <div :class="['anchor-nav']" :style="navStyle">
    <slot name="nav-left">
      <div v-if="!hiddenNavLeft" :class="['anchor-nav__left']">
        <a :class="['anchor-nav__left-link']" target="_blank" href="https://www.anchnet.com/">
          <img :class="['anchor-nav__left-image']" src="../../../src/img/logo-full-white.svg" />
        </a>
      </div>
    </slot>
    <div :class="['anchor-nav__main']">
      <div
        v-if="child.data.length"
        v-for="(child, index) in navData"
        :class="[`anchor-nav__main-${child.position}`]"
        :style="{'line-height': child.position === 'middle' ? height + 'px' : ''}"
      >
        <anchor-element
          :height="height"
          v-for="(item, key) in child.data"
          :key="key"
          :mode="item.mode"
          :width="item.width"
          :style="item.style"
          :iconName="item.iconName"
          :textConfig="item.textConfig"
          :dropDownConfig="item.dropDownConfig"
          :onChangeBack="handleClick.bind(null, item.id)"
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
      height: {
        type: Number,
        default: 54
      },

      hiddenNavLeft: {
        type: Boolean,
        default: false
      },

      leftData: {
        type: Array,
        default () {
          return [
            {
              id: 'left1',
              mode: 'icon',
              iconName: 'device-colored__volume',
              style: {'margin': '0 20px 0 20px'}
            },
            {
              id: 'left2',
              mode: 'text',
              iconName: 'device-colored__volume',
              style: {'margin': '0 20px 0 0'},
              textConfig: {
                text: '可以只显示文字或图标'
              }
            },
            {
              id: 'left3',
              mode: 'text',
              style: {'margin': '0 20px 0 0'},
              textConfig: {
                text: '给文字加链接',
                link: 'https://www.anchnet.com/',
                target: '_blank'
              },
            },
            {
              id: 'left4',
              mode: 'dropDown',
              dropDownConfig: {
                text: '显示下拉菜单',
                width: 106,
                data: [
                  {id: 'instance', value: '云服务器'},
                  {id: 'rdb', value: '云数据库'},
                ]
              }
            }
          ]
        }
      },
      middleData: {
        type: Array,
        default () {
          return [
            {
              id: 'middle1',
              mode: 'icon-text',
              iconName: 'device-colored__volume',
              style: {'margin': '0 20px 0 0'},
              textConfig: {
                text: '居中显示组',
                link: 'https://www.anchnet.com/',
                target: '_blank'
              }
            },
            {
              id: 'middle2',
              mode: 'icon-text',
              iconName: 'device-colored__hosting',
              style: {'margin': '0 20px 0 0'},
              textConfig: {
                text: '显示图标和文字'
              },
            }
          ]
        }
      },
      rightData: {
        type: Array,
        default () {
          return [
            {
              id: 'right1',
              mode: 'dropDown',
              style: {'margin': '0 40px 0 0'},
              dropDownConfig: {
                text: '给下拉列表加链接',
                width: 140,
                data: [
                  {id: 'instance', value: '云服务器', link: 'https://www.anchnet.com/'},
                  {id: 'rdb', value: '云数据库', link: 'https://www.baidu.com/'}
                ]
              }
            },
            {
              id: 'right2',
              mode: 'icon-dropDown',
              style: {'margin': '0 20px 0 0'},
              iconName: 'device-colored__dServer',
              dropDownConfig: {
                text: '可以显示图标和菜单',
                width: 180,
                data: [
                  {id: 'router', value: '云路由器'},
                  {id: 'loadbalancer', value: '云负载均衡器'}
                ]
              }
            }
          ]
        }
      }
    },

    computed: {
      navData () {
        let leftData = this.leftData ? this.leftData : []
        let middleData = this.middleData ? this.middleData : []
        let rightData = this.rightData ? this.rightData : []
        return [
          {position: 'left', data: leftData},
          {position: 'middle', data: middleData},
          {position: 'right', data: rightData}
        ]
      },

      navStyle () {
        let height = this.height + 'px'
        let width = typeof this.width === 'number' ? this.width + 'px' : this.width
        return {height, width}
      }
    },

    methods: {
      handleClick (id, item, key) {

      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/nav" />