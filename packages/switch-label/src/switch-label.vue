<template>
  <ul :class="['switch-label']">
    <li
      v-for="(item, key) in data"
      :key="item.id"
      :class="['switch-label__item', {
        'switch-label__item--active': item.active,
        'switch-label__item--not-allowed': item.notAllowed
      }]"
      :style="{'width': width + 'px'}"
      @click="item.notAllowed ? null : onLabelChange(item, key)"
    >{{item.value}}</li>
  </ul>
</template>

<script>
  import utils from 'Src/libs/utils'
  import mixin from 'Src/libs/mixin'

  /**
   * param
   *   initData {array} [               //列表数据
   *     {
   *       id: id1,                     //数据Id（必填）
   *       value: value1,               //属性值（必填）
   *       active: false,               //是否处于高亮状态（必填）
   *       forbidden: false            //是否允许点击（可选）
   *     }
   *   ]
   *   allowData {array}                // 允许点击的数据，优先级最高
   *   minKey {number}                  //要显示的最小数据的 key
   *   maxKey {number}                  //要显示的最大数据的 key
   *   clickAlone {boolean}             // 是否只允许点击默认数据（默认数据由 defaultId 获取)
   *   onChangeBack {function}          //点击列表数据时触发回调
   */
  export default {
    name: 'anchor-switch-label',

    mixins: [mixin],

    props: {
      width: Number,
      initData: {
        type: Array,
        required: true
      },
      allowData: Array,
      defaultId: String,
      defaultKey: Number,
      defaultValue: String,
      minKey: Number,
      maxKey: Number,
      clickAlone: Number,
      onChangeBack: Function
    },

    data () {
      return {
        data: []
      }
    },

    watch: {
      initData: {
        immediate: true,
        handler (val) {
          this.computeData()
        },
        deep: true
      },

      allowData: 'computeData',
      defaultId: 'computeData',
      defaultKey: 'computeData',
      defaultValue: 'computeData',
      minKey: 'computeData',
      maxKey: 'computeData',
      clickAlone: 'computeData'
    },

    methods: {
      computeData () {
        let newData = [], activeStatus = false

        utils.clone(this.initData).forEach((item, key) => {
          if (!item.hasOwnProperty('active')) item.active = false

          if (this.defaultId) item.active = item.id === this.defaultId
          if (!this.defaultId && this.defaultValue) item.active = item.value === this.defaultValue
          if (!this.defaultId && !this.defaultValue && utils.isNumber(this.defaultKey)) item.active = key === this.defaultKey

          let notAllowed = (this.minKey && key < this.minKey) || (this.maxKey && key > this.maxKey)
          if (item.forbidden) notAllowed = notAllowed || item.forbidden
          if (this.allowData && this.allowData.length) {
            notAllowed = notAllowed || !this.allowData.includes(item.id)
          } else if (this.clickAlone) {
            notAllowed = notAllowed || this.clickAlone && item.id !== this.defaultId
          }

          item.notAllowed = !!notAllowed
          if (item.hasOwnProperty('forbidden')) delete item.forbidden

          if (item.active) activeStatus = true
          if (item.notAllowed && item.active) {
            item.active = false
            activeStatus = false
          }

          newData.push(item)
        })

        if (!activeStatus) {
          newData.forEach((i) => {
            if (!activeStatus && !i.notAllowed) {
              i.active = true
              activeStatus = true
            }
          })
        }

        let activeItem = newData.find(i => i.active)
        if (activeItem) utils.isFunction(this.onChangeBack) ? this.triggerBack() : this.$emit('input', activeItem.id)

        this.data = newData
      },

      /**
       * label点击事件
       * @param  {object} item 被点击的 label 的数据
       * @param  {number} key  被点击的 label 的 key
       */
      onLabelChange (item, key) {
        for (let i = 0; i < this.data.length; i++) {
          let obj = this.data[i]
          obj.active = i === key
          this.data.splice(i, 1, obj)
        }

        utils.isFunction(this.onChangeBack) ? this.onChangeBack(item, key) : this.$emit('input', item.id)
      },

      // 手动 callback
      triggerBack () {
        this.$nextTick(() => {
          let activeKey = this.data.findIndex((i) => i.active === true)
          let activeItem = this.data[activeKey]
          utils.isFunction(this.onChangeBack) && this.onChangeBack(activeItem, activeKey)
        })
      }
    },
  }
</script>

<style lang="scss" src="Src/scss/files/switch-label" />
