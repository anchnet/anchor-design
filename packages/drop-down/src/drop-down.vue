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

  /**
   * param
   *   mode {string} 'normal'                    //菜单模式，分为'simple'，'normal'两种，默认为'normal'
   *   hoverToShow {boolean} false               // 是否在 hover 时显示下拉菜单
   *   isFilter { boolean} false                 // 是否采用可筛选模式，即下拉菜单中出现多选框
   *   onShowIcon {string, boolean} ''           // 是否显示图标， 图标名称来源于 anchor-icon 组件
   *   width {number} 120                        //drop-down 宽度，默认为120px
   *   height {number} 28                        //drop-down 高度，默认为28px
   *   size {string}                             //菜单尺寸, 内置多种菜单尺寸，['small', 'smaller', 'normal', 'larger', 'large']
   *   onDisplayStyle {string}                   //要显示的菜单样式, 内置两种，['1', '2'】
   *   data {array} [{id: id1, value: value1}]   //列表数据
   *   defaultId {string|number}                 //默认显示的数据的id，优先级最高
   *   defaultKey {string|number}                //默认显示的数据的key，优先级中，有 defaultId 时则无效
   *   defaultText {string}                      //默认显示的文字，优先级低，有 defaultId/defaultKey 时则无效
   *   type {string}                             //列表数据类型，会影响显示样式，目前只有'image'字段可选，默认无
   *   hasDot {boolean}                          //列表数据前是否有小圆点，默认无
   *   onChangeBack {function}                   //点击列表数据时触发回调
   */
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
      onChangeBack: Function
    },

    data () {
      return {
        Data: utils.clone(this.data) || [],
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
          })
        } else {
          //清空搜索关键词
          if (this.withSearch) {
            setTimeout(() => {
              this.searchWord = ''
              this.$refs.search.updateValue('')
            }, 200)
          }
        }
      },

      searchWord (val, oldVal) {
        if (this.isAsynSearch) {
          this.$emit('onSearch', val, oldVal)
        } else {
          console.log('searchword')
          if (val) {
            let result = utils.getDataBySearch({data: this.Data, regExp: val})
            console.log('result',result)
            this.Data = result
          } else {
            this.Data = utils.clone(this.data)
          }
        }
      },
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
       * 点击 body 关闭下拉菜单窗口
       */
      bodyClickEvent (e) {
        if (this.isShow && !vQuery(this.$refs.dropdown).find(e.target).getDOM().length) {
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
              value: item.value
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
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/drop-down" />
