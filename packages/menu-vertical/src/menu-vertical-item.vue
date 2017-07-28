<template>
  <anchor-menu-group :oneItem="!hasChildren">
    <span
      slot="group-title"
      :class="['anchor-menu-vertical__item', {
        'anchor-menu-vertical__item--active': active,
      }]"
      :style="itemStyle"
      @mouseenter="mouseHover(true)"
      @mouseleave="mouseHover(false)"
      @click="data.disabled ? '' : handleClick(data, $event)"
    >
       <anchor-icon
         v-if="hasChildren"
         name="triangle__down"
         :class="['anchor-menu-vertical__icon']"
         :active="active"
         :isRotating="isShow"
       /><slot>{{data.text}}</slot>
    </span>
    <anchor-menu-vertical-item
      slot="group-item"
      v-if="hasChildren"
      v-for="(item, key) in data.children"
      :key="key"
      :data="item"
      :indent="indent + 1"
      @handleClick="handleClick"
    />
  </anchor-menu-group>
</template>

<script>
  import AnchorMenuGroup from 'Packages/menu-parts/src/menu-group'
  import AnchorIcon from 'Packages/icons/src/icons'

  /**
   * hasChildren {boolean} if the component hasn't child content, hide the icon of traingle
   * width {number}
   * height {number}
   * paddingLeft {number}
   */
  export default {
    name: 'anchor-menu-vertical-item',

    components: {
      AnchorMenuGroup, AnchorIcon
    },

    props: {
      data: Object,
      indent: {
        type: [String, Number],
        default: 0
      },
    },

    data () {
      return {
        active: false,
        isShow: false
      }
    },

    computed: {
      hasChildren () {
        return !!this.data.children && !!this.data.children.length
      },

      itemStyle () {
        let indent = Number(this.indent)
        let basic = this.hasChildren ? 20 : 36
        return {
          'padding-left': indent !== 0 ? basic + 12 * indent + 'px' : '',
        }
      }
    },

    methods: {
      mouseHover (status) {
        this.active = status
      },

      handleClick (data, event) {
        let status = null
        //判断当前参数来源：当前 click 事件 or 冒泡事件
        if (event && event.target) {
          if (this.hasChildren) {
            let isShow = !this.isShow
            status = isShow ? 'open' : 'close'
            this.isShow = isShow
          } else {
            status = 'click'
          }
        } else {
          status = event
        }
        this.$emit('handleClick', data, status)
      }
    }
  }
</script>