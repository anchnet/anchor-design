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
      :style="containerStyle"
      @click="((mode === 'normal' || !hoverToShow) && !disabledStatus) ? onDropClick() : ''"
      @mouseenter="mode === 'normal' ? hover(true) : ''"
      @mouseleave="mode === 'normal' ? hover(false) : ''"
    >
      <span
        :class="['drop-down__on-display', `drop-down__on-display--style-${onDisplayStyle}`]"
        :style="{'line-height': __height ? __height - 6 + 'px' : ''}"
      >
        <slot name="drop-down-icon">
          <anchor-icon v-if="onShowIcon" :name="onShowIcon" :active="Active" :style="{'margin-right': '8px'}" />
        </slot><!--
       -->{{onShowItem.value}}<!--
   --></span>
      <anchor-icon
        name="triangle__down"
        :active="Active"
        :isRotating="isShow"
        :class="['drop-down__triangle']"
      />
    </div>
    <transition name="anchor-animation__drop-down">
      <ul ref="droplist" v-show="isShow" class="drop-down__list">
        <li v-if="withSearch" :class="['drop-down__item', 'drop-down__item-search']">
          <anchor-input ref="search" mode="search" v-model="searchWord" />
        </li>
        <li v-if="withSearch" v-show="!(Data && Data.length)" :class="['drop-down__item', 'drop-down__search-none']">无搜索结果</li>
        <li
          v-for="(item, key) in Data"
          :class="['drop-down__item', {'drop-down__item--active': item.active}]"
          @click="item.hasOwnProperty('link') ? '' : onItemClick(item, key)"
        >
          <span v-if="hasDot" class="drop-down__item--dot"></span>
          <a
            v-if="item.hasOwnProperty('link')"
            :class="['drop-down__item-element']"
            :target="item.target || '_self'"
            :href="item.link"
          >{{item.value}}</a>
          <div v-else :class="['drop-down__item-element']">
            <anchor-input
              v-if="isFilter"
              mode="checkbox"
              :isActive="item.active"
              :style="{'margin-right': '5px'}"
              :onChangeBack="onCheckboxClick.bind(null, item, key)"
            />{{item.value}}</div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import utils from 'src/libs/utils'
  import vQuery from 'src/libs/vQuery'
  import mixin from 'src/libs/mixin'
  import AnchorIcon from 'packages/icons/src/icons'
  import AnchorInput from 'packages/input/src/input'

  export default {
    name: 'anchor-drop-down',

    mixins: [mixin],

    components: {
      AnchorIcon, AnchorInput
    },

    props: {
      mode: {
        type: String,
        default: 'normal'
      },
      withSearch: {
        type: Boolean,
        default: false,
      },
      isAsynSearch: {
        type: Boolean,
        default: false,
      },
      size: String,
      width: Number,
      height: Number,
      defaultKey: Number,
      defaultId: [String, Number],
      defaultText: String,
      data: Array,
      onDisplayStyle: {
        type: [String, Number],
        default: 1
      },
      hasDot: {
        type: Boolean,
        default: false
      },
      isFilter: {
        type: Boolean,
        default: false
      },
      hoverToShow: {
        type: Boolean,
        default: false
      },
      onShowIcon: {
        type: [String, Boolean],
        default: false
      },
      immediate: {
        type: Boolean,
        default: false,
      },
      immediateFirstWatch: {
        type: Boolean,
        default: false,
      },
      onChangeBack: Function
    },

    data () {
      return {
        Data: utils.clone(this.data) || [],
        firstWatch: false, // 标记 data 第一次触发 watch
        onHover: false,
        isShow: false,
        generalStatus: false,
        searchWord: null,
        //当前显示的 item 的数据
        onShowItem: {
          id: this.defaultId || typeof this.defaultId === 'number' ? this.defaultId : null,
          key: Number(this.defaultKey) >= -1 ? Number(this.defaultKey) : null,
          value: this.defaultText || '请点击选择'
        },
        sizeMap: {
          'small': {
            width: 40,
            height: 20
          },
          'smaller': {
            width: 80,
            height: 20
          },
          'normal': {
            width: 120,
            height: 28
          }
        }
      }
    },

    computed: {
      Active () {
        return this.generalStatus || this.onHover || this.isShow
      },

    	containerStyle () {
    		let width = this.__width ? this.__width + 'px' : ''
    		return {
    			'width': width,
    			'max-width': width
    		}
    	},

      disabledStatus () {
        return !this.withSearch && (!this.Data || !this.Data.length)
      },

      containerClass () {
        if (this.mode === 'simple') {
          return [
            'drop-down__container-simple',
            {
              'drop-down__container-simple--active': this.onHover,
              'drop-down__container-simple--disabled': this.disabledStatus
            }
          ]
        }
        return [
          'drop-down__container',
          {'drop-down__container--disabled': this.disabledStatus},
        ]
      }
    },

    watch: {
      data (val) {
        this.Data = utils.clone(val)
        this.onShowItem = {
          id: null,
          key: null,
          value: this.defaultText || '请点击选择'
        }
        this.$nextTick(() => {
          this.getDefaultItem()
          // 立即触发回调
          if (this.immediateFirstWatch && !this.firstWatch) {
            this.firstWatch = true
            this.immediateCallback()
          }
        })
      },

      defaultId () {
        this.getDefaultItem()
      },

      defaultKey () {
        this.getDefaultItem()
      },

      isShow (val) {
        if (val) {
          this.$nextTick(() => {
            this.fixListWidth()
            this.fixListHeight()
          })
        } else {
          this.$nextTick(() => {
            this.fixListHeight('hide')
          })
          //清空搜索关键词
          if (this.withSearch) {
            setTimeout(() => {
              this.searchWord = ''
              this.$refs.search.updateValue('')
            }, 245)
          }
        }
      },

      searchWord (val, oldVal) {
        if (this.isAsynSearch) {
          this.$emit('onSearch', val, oldVal)
        } else {
          let Data = utils.clone(this.data)
          if (val) {
            let result = utils.getDataBySearch({data: Data, regExp: val})
            this.Data = result
          } else {
            this.Data = Data
          }
        }
      },
    },

    mounted () {
      this.getDefaultItem()
      if (this.immediate) this.immediateCallback()
      vQuery('body').on('click', this.bodyClickEvent)
    },

    destroyed () {
      vQuery('body').off('click', this.bodyClickEvent)
    },

    methods: {
      hover (onHover) {
        if (this.mode === 'simple' && this.hoverToShow) {
          this.isShow = onHover
        }
        this.onHover = onHover
        this.$emit('onHover', onHover)
      },

      resetStatus () {
        this.Data.forEach((i, k) => {
          this.Data[k]['active'] = false
        })
      },

      /**
       * 计算生成当前默认 Item
       */
      getDefaultItem () {
        let {id, key, value} = this.onShowItem
        if (utils.isArray(this.Data)) {
          if (this.defaultId) {
            let findKey = this.Data.findIndex((i) => i.id === this.defaultId)
            if (utils.isNumber(findKey)) {
              id = this.defaultId
              key = findKey
              value = this.Data[findKey]['value']
              this.resetStatus()
              this.Data[findKey]['active'] = true
            }
          } else if (utils.isNumber(this.defaultKey)) {
            let findItemByKey = this.Data[this.defaultKey]
            if (findItemByKey) {
              id = findItemByKey.id
              key = this.defaultKey
              value = findItemByKey.value
              this.resetStatus()
              this.Data[this.defaultKey]['active'] = true
            }
          }
          this.onShowItem = {id, key, value}
        }
      },

      /**
       * 重新计算列表页宽度：大于等于 container 宽度
       */
      fixListWidth () {
        let container = vQuery(this.$refs.container)
        let droplist = vQuery(this.$refs.droplist)
        let droplistChild = vQuery(this.$refs.droplist).children('li')
        let containerPadding = 28, droplistChildPadding = 30

        droplist.css({'width': ''})

        let containerWidth = container.width() + containerPadding
        let droplistChildWidth = droplistChild.width() + droplistChildPadding

        containerWidth >= droplistChildWidth ? droplist.css({'width': containerWidth}) : false
      },

      /**
       * 重新计算列表高度：超出浏览器窗口则滚动
       * */
      fixListHeight (action = 'show') {
        let $droplist = vQuery(this.$refs.droplist)

        if (action === 'hide') {
          setTimeout(() => {
            $droplist.css({'height': '', 'overflow': ''})
          }, 300)
        }

        let windowHeight = window.innerHeight
        let droplistTop = $droplist.offsetViewport().top
        let droplistHeight = $droplist.height()
        let remainHeight = windowHeight - droplistTop
        if (remainHeight - 24 < droplistHeight) {
          $droplist.css({'height': remainHeight - 15 + 'px', 'overflow': 'auto',})
        }
      },

      /**
       * 点击 body 关闭下拉菜单窗口
       */
      bodyClickEvent (e) {
        if (
          this.isShow &&
          (!vQuery(this.$refs.dropdown).find(e.target) || !vQuery(this.$refs.dropdown).find(e.target).getDOM().length)
        ) {
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
        if (this.isFilter) {
          let Data = this.Data
          Data[key]['active'] = !Data[key]['active']
          let filterData = Data.filter((i) => i.active) || []
          this.generalStatus = !!filterData.length
          this.Data = Data
          this.$forceUpdate()
          let callback = () => this.$emit('onSelect', filterData)
          this['__triggerBack'](callback, filterData)
        } else {
          this.resetStatus()
          this.Data[key]['active'] = true
          this.isShow = false
          if (this.mode === 'normal' && item !== 'link') {
            this.onShowItem = {
              id: item.id,
              key: key,
              value: item.value,
            }
          } else {
            this.generalStatus = !(item.hasOwnProperty('cancelActive') && item.cancelActive)
          }
          let callback = () => this.$emit('input', item.hasOwnProperty('id') ? item.id : item)
          this['__triggerBack'](callback, item, key)
        }
      },

      onCheckboxClick (item, key, status) {
        this.onItemClick(item, key)
      },

      immediateCallback () {
        let { key } = this.onShowItem
        if (key !== null) {
          let item = this.Data[key]
          this.onItemClick(item, key)
        }
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/drop-down" />
