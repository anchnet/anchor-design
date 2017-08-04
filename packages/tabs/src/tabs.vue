<template>
  <div :class="['anchor-tabs']">
    <ul
      :class="{
        'anchor-tabs__card': mode === 'card',
        'anchor-tabs__list': mode === 'list',
      }"
    >
      <li
        :ref="`elementWrapper_${key}`"
        v-for="(item, key) in Data"
        :class="['anchor-tabs__element-wrapper', {
          'anchor-tabs__element-wrapper--active': item.active,
          'anchor-tabs__element-wrapper--disabled': item.disabled,
        }]"
      >
        <anchor-icon
          v-if="mode === 'card' && item.active"
          class="anchor-tabs__triangle"
          name="triangle__down"
          disableAnimation
          active
        />
        <a v-if="item.link" :class="['anchor-tabs__element']" :href="item.link" :target="targetText" @click="item.disabled ? '' : onClick(item, key, 'link')">
          <div :class="['anchor-tabs__element-text']">{{item.value}}</div>
        </a>
        <div v-else :class="['anchor-tabs__element']" @click="item.disabled ? '' : onClick(item, key)">
          <div :class="['anchor-tabs__element-text']">{{item.value}}</div>
        </div>
      </li>
    </ul>
    <span v-if="mode === 'list'" ref="elementLine" class="anchor-tabs__element-line"></span>
  </div>
</template>

<script>
  /**
   * params:
   * mode {string} 'card' tabs 样式，可选'card', 'list'
   * targetText {string} '_self' 跳转路由属性，即 a 标签的 target 属性
   * defaultId {string, number} null 由此ID指定当前显示的默认值，优先级最高
   * defaultValue {string, number} null 由此指定当前显示的默认值，优先级中
   * defaultKey {string, number} null 由此KEY指定当前显示的默认值，优先级最低
   * data {array} [
   *  {id: 'id1', value: 'value1', link: 'xxx', targetText: '_blank',},
   *  {id: 'id2', value: 'value2',},
   * ] tabs数据
   *
   * onChangeback {function} 回调函数，不存在时则由 this.$emit('handleClick', params) 触发回调
   */
  import mixin from 'Src/libs/mixin'
  import AnchorIcon from 'Packages/icons/src/icons'

  export default {
    name: 'anchor-tabs',

    mixins: [mixin],

    components: {
      AnchorIcon
    },

    props: {
      mode: {
        type: String,
        default: 'card'
      },
      targetText: {
        type: String,
        default: '_self'
      },
      defaultId: [String, Number],
      defaultValue: [String, Number],
      defaultKey: [String, Number],
      data: Array,
      onChangeback: Function
    },

    data () {
      return {
        Data: [],
        lineKey: null,
      }
    },

    computed: {
      Key () {
        let $data = this.$data, data = this.data
        if ($data.hasOwnProperty('defaultId')) {
          return data.findIndex(i => i.id === this.defaultId)
        } else if ($data.hasOwnProperty('defaultValue')) {
          return data.findIndex(i => i.value === this.defaultValue)
        } else if ($data.hasOwnProperty('defaultKey')) {
          return this.defaultKey
        } else {
          return null
        }
      },
    },

    watch: {
      data: {
        immediate: true,
        deep: true,
        handler (val) {
          this.computedata(val)
        },
      },
    },

    methods: {
      onClick (item, key = 0, type) {
        this.Data.forEach((i, k) => {
          this.$set(this.Data[k], 'active', k === key)
        })

        this.moveLine(key)

        if (type !== 'link') {
          let callback = () => {
            this.$emit('handleClick', item, key)
          }
          this.__triggerBack(callback, item, key)
        }
      },

      moveLine (key) {
        if (typeof key !== 'number' && !key) key = 0
        if (this.mode === 'list') {
          let refsNode = this.$refs[`elementWrapper_${key}`]
          let width = vQuery(refsNode).width()
          vQuery(this.$refs.elementLine).css({
            'left': refsNode[0].offsetLeft + 'px',
            'width': width + 'px',
          })
        }
      },

      computedata (val) {
        let Data = vQuery().clone(val), Key = this.Key, firstActiveKey = 0
        let status = true
        Data.forEach((i, k) => {
          if (Key !== null){
            i.active = k === Key
          } else if (status && i.active) {
            firstActiveKey = k
            status = false
          }
        })
        if (Key === null && status) Data[0]['active'] = true
        this.Data = Data
        this.$nextTick(() => {
          let lineKey = Key || firstActiveKey
          this.moveLine(lineKey)
        })
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/tabs" />