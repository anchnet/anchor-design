<template>
  <div
    ref="dropdown"
    :class="['drop-down']"
    @mouseenter="mode === 'simple' ? hover(true) : ''"
    @mouseleave="mode === 'simple' ? hover(false) : ''"
  >
    <div
      ref="container"
      :class="containerClass"
      :style="{'width': width + 'px'}"
      @click="mode === 'normal' && data && data.length ? onDropClick() : ''"
      @mouseenter="mode === 'normal' ? hover(true) : ''"
      @mouseleave="mode === 'normal' ? hover(false) : ''"
    >
      <span
        :class="['drop-down__on-display', `drop-down__on-display--style-${onDisplayStyle}`]"
        :style="{'line-height': height - 6 + 'px'}"
      >
        <slot name="drop-down-icon">
          <anchor-icon v-if="onShowIcon" :name="onShowIcon" :active="onHover || isShow" :style="{'margin-right': '8px'}" />
        </slot><!--
     -->{{onShowItem.value}}<!--
   --></span>
      <anchor-icon
        name="triangle__down"
        :active="onHover || isShow"
        :isRotating="isShow"
        :class="['drop-down__triangle']"
      />
    </div>
    <transition name="anchor-animation__drop-down">
      <ul ref="droplist" v-show="isShow" class="drop-down__list">
        <li
          v-for="(item, key) in data"
          :class="['drop-down__item', {'drop-down__item--active': item.active}]"
          @click="item.hasOwnProperty('link') ? '' : onItemClick(item, key)"
        >
          <span v-if="hasDot" class="drop-down__item--dot"></span>
          <a
            v-if="item.hasOwnProperty('link')"
            :class="['drop-down__item-element']"
            :target="item.target || '_self'"
            :href="item.link"
            @click="onItemClick('link', key)"
          >{{item.value}}</a>
          <div v-else :class="['drop-down__item-element']">{{item.value}}</div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import vQuery from 'Src/libs/vQuery'
  import utils from 'Src/libs/utils'
  import mixin from 'Src/libs/mixin'
  import AnchorIcon from 'Packages/icons/src/icons'

  /**
   * param
   *   width {number} 120                        //drop-down 宽度，默认为120px
   *   data {array} [{id: id1, value: value1}]   //列表数据
   *   defaultId {string}                        //默认显示的数据的id，优先级最高
   *   defaultKey {string|number}                //默认显示的数据的key，优先级中，有 defaultId 时则无效
   *   type {string}                             //列表数据类型，会影响显示样式，目前只有'image'字段可选，默认无
   *   hasDot {boolean}                          //列表数据前是否有小圆点，默认无
   *   onChangeBack {function}                   //点击列表数据时触发回调
   *   defaultText {string}                      //默认显示的文字，优先级低，有 defaultId/defaultKey 时则无效
   */
  export default {
    name: 'anchor-drop-down',

    mixins: [mixin],

    components: {
      AnchorIcon
    },

    props: {
      mode: {
        type: String,
        default: 'normal'
      },
      width: Number,
      height: Number,
      defaultKey: Number,
      defaultId: [String, Number],
      data: Array,
      onDisplayStyle: {
        type: [String, Number],
        default: 1
      },
      hasDot: {
        type: Boolean,
        default: false
      },
      onShowIcon: {
        type: [String, Boolean],
        default: ''
      },
      onChangeBack: Function,
      defaultText: String
    },

    data () {
      return {
        onHover: false,
        isShow: false,
        //当前显示的 item 的数据
        onShowItem: {
          id: this.defaultId ? this.defaultId : null,
          key: Number(this.defaultKey) >= -1 ? Number(this.defaultKey) : null,
          value: this.defaultText || '请点击选择'
        }
      }
    },

    computed: {
      containerClass () {
        if (this.mode === 'simple') {
          return [
            'drop-down__container-simple',
            {
              'drop-down__container-simple--active': this.onHover,
              'drop-down__container-simple--disabled': !(this.data && this.data.length)
            }
          ]
        }
        return [
          'drop-down__container',
          {'drop-down__container--disabled': !(this.data && this.data.length)}
        ]
      }
    },

    watch: {
      data () {
        this.onShowItem = {
          id: null,
          key: null,
          value: this.defaultText || '请点击选择'
        }
        this.$nextTick(() => {
          this.getDefaultItem()
        })
      },

      defaultId () {
        this.getDefaultItem()
      },

      defaultKey () {
        this.getDefaultItem()
      },

      isShow (val) {
        if (val) this.$nextTick(() => this.fixListWidth())
      }
    },

    mounted () {
      this.getDefaultItem()
      vQuery('body').on('click', this.bodyClickEvent)
    },

    destroyed () {
      vQuery('body').off('click', this.bodyClickEvent)
    },

    methods: {
      hover (onHover) {
        if (this.mode === 'simple') {
          this.isShow = onHover
        }
        this.onHover = onHover
        this.$emit('onHover', onHover)
      },

      resetStatus () {
        this.data.forEach((i, k) => {
          this.data[k]['active'] = false
        })
      },

      /**
       * 计算生成当前默认 Item
       */
      getDefaultItem () {
        let {id, key, value} = this.onShowItem

        if (utils.isArray(this.data)) {
          if (this.defaultId) {
            let findKey = this.data.findIndex((i) => i.id === this.defaultId)
            if (utils.isNumber(findKey)) {
              id = this.defaultId
              key = findKey
              value = this.data[findKey]['value']
              this.resetStatus()
              this.data[findKey]['active'] = true
            }
          } else if (utils.isNumber(this.defaultKey)) {
            let findItemByKey = this.data[this.defaultKey]
            if (findItemByKey) {
              id = findItemByKey.id
              key = this.defaultKey
              value = findItemByKey.value
              this.resetStatus()
              this.data[this.defaultKey]['active'] = true
            }
          }
          this.onShowItem = {id, key, value}
        }

        if (utils.isFunction(this.onChangeBack)) {
          if (!id || Number(key) < 0) {
            id = null
            key = null
            value = null
          }
          this.onChangeBack({id, value}, key)
        }
      },

      /**
       * 重新计算列表页宽度：大于等于 container 宽度
       */
      fixListWidth () {
        let container = vQuery(this.$refs.container)
        let droplist = vQuery(this.$refs.droplist)
        let droplistChild = vQuery(this.$refs.droplist).children('li')
        let containerPadding = 32, droplistChildPadding = 30

        droplist.css({'width': ''})

        let containerWidth = container.width() + containerPadding
        let droplistChildWidth = droplistChild.width() + droplistChildPadding

        containerWidth >= droplistChildWidth ? droplist.css({'width': containerWidth}) : false
      },

      /**
       * 点击 body 关闭下拉菜单窗口
       */
      bodyClickEvent (e) {
        if (!vQuery(this.$refs.dropdown).find(e.target).getDOM().length) {
          this.isShow = false
        }
      },

      /**
       * container 点击事件
       */
      onDropClick () {
        this.isShow = !this.isShow
      },

      /**
       * 列表内 item 点击事件
       * @param  {object} item 当前点击的item数据
       * @param  {string} key  当前点击的列表key
       */
      onItemClick (item, key) {
        this.resetStatus()
        this.data[key]['active'] = true
        this.isShow = false
        if (item !== 'link') {
          this.onShowItem = {
            id: item.id,
            key: key,
            value: item.value
          }
        }
        utils.isFunction(this.onChangeBack) && this.onChangeBack(item, key)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/drop-down" />
