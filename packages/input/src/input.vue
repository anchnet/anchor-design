<template>
  <div
    :class="['anchor-input', {
      'anchor-input--active': computedAlwaysActive || computedActive || checkboxHoverStatus,
      'anchor-input__radio-wrap': mode === 'radio',
      'anchor-input__radio-wrap--active': radioStatus
    }]"
  >
    <span v-if="mode === 'search' && iconPosition === 'left'" :class="['anchor-input__search-icon-wrapper']" @click="getFocus()">
      <anchor-icon name="search" :active="computedAlwaysActive || computedActive" :style="iconStyle"/>
    </span>
    <input
      ref="searchInput"
      v-if="['input', 'search'].includes(mode)"
      :value.trim="computedValue"
      :disabled="disabled"
      :style="inputStyle"
      :class="['anchor-input__base', {
        'anchor-input__base--search': mode === 'search' && iconPosition === 'left',
        'anchor-input__base--disabled': disabled,
      }]"
      :placeholder="defaultText"
      @focus="onFocus(true)"
      @blur="onFocus(false)"
      @input="!disabled && alwaysFeedback ? onInput($event) : ''"
      @change="!disabled && !alwaysFeedback ? onChange($event) : ''"
      @keyup.enter="!disabled ? onKeyupEnter($event) : ''"
    />
    <span v-if="mode === 'search' && iconPosition === 'right'" :class="['anchor-input__search-icon-wrapper-right']" @click="search()">
      <anchor-icon name="search" :active="computedAlwaysActive || computedActive" :style="iconStyle"/>
    </span>
    <span
      v-if="mode === 'checkbox'"
      :class="['anchor-input__base', 'anchor-input__checkbox', {
        'anchor-input__checkbox--active': computedActive,
        'anchor-input__checkbox--disabled': disabled && !active,
        'anchor-input__checkbox--disabled-active': disabled && active
      }]"
      @mouseenter="disabled ? '' : onHover(true)"
      @mouseleave="disabled ? '' : onHover(false)"
      @click="disabled ? '' : onClick()"
    ></span>
    <span
      v-if="mode === 'radio'"
      :class="['anchor-input__base', 'anchor-input__radio', {
        'anchor-input__radio--active': computedActive,
        'anchor-input__radio--disabled': disabled && !active,
        'anchor-input__radio--disabled-active': disabled && active
      }]"
      @mouseenter="disabled ? '' : onHover(true)"
      @mouseleave="disabled ? '' : onHover(false)"
      @click="disabled ? '' : onClick()"
    ></span>
  </div>
</template>

<script>
  /**
   * params:
   * mode {string} 'input' 输入框模式，分为：input（输入框）, search（搜索框）, radio（单选按钮）, checkbox（多选按钮）
   * valueType {string} 'string' 输入框取值类型，分为'string'，'number'
   * size {string} 'normal' 输入框尺寸
   * digit {string, number} null valueType 为number 时，设置要保留的小数点位数
   * initValue {string, number} null 输入框初始值
   * defaultValue {string, number} null 输入框默认值, 当 valueType 为 number 时，若用户输入不合法，如果设置了 defaultValue，输入框会被重置 defaultValue
   * alwaysFeedback {boolean} true 是否持续返回输入值，即采用 input 事件回调
   * isActive {boolean} false 是否处于 active，仅在初始状态时有效
   * alwaysActive {boolean} false 是否总是处于 active 状态
   * disabled {boolean} false 是否处于禁用状态，禁止输入，并且优先级高于 isActive和 alwaysActive
   * onChangeBack {function} 回调，无回调时采用this.$emit('handleClick', params) 触发父组件事件
   * width {number} 输入框宽度
   * height {number} 输入框高度
   */
  import mixin from 'src/libs/mixin'
  import AnchorIcon from 'packages/icons/src/icons'

  export default {
    name: 'anchor-input',

    components: {
      AnchorIcon
    },

    mixins: [mixin],

    props: {
      mode: {
        type: String,
        default: 'input'
      },

      valueType: {
        type: String,
        default: 'string'
      },

      size: String,

      iconPosition: {
        type: String,
        default: 'right'
      },

      defaultText: {
        type: [String, Number],
        default: ''
      },

      digit: {
        type: [String, Number],
        default: null
      },

      initValue: {
        type: [String, Number],
        default: null
      },

      defaultValue: {
        type: [String, Number],
        default: null
      },

      alwaysFeedback: {
        type: Boolean,
        default: true
      },

      isActive: {
        type: Boolean,
        default: false
      },

      alwaysActive: {
        type: Boolean,
        default: false
      },

      disabled: {
        type: Boolean,
        default: false
      },

      onChangeBack: Function,

      width: Number,
      height: Number
    },

    data () {
      return {
        oldValue: this.initValue,
        value: this.initValue,
        active: false,
        hover: false,
        sizeMap: {
          small: {
            width: 56,
            height: 20
          },
          smaller: {
            width: 80,
            height: 24
          },
        }
      }
    },

    computed: {
      inputStyle () {
        let width = this.mode === 'search' ? this.__width - 22 : this.__width
        let height = this.__height ? this.__height + 'px' : ''
        return {
          width: width - 2 + 'px',
          height: height,
          'line-height': height,
        }
      },

      iconStyle () {
        let height = this.__height ? this.__height + 'px' : ''
        return {
          height: height,
          'line-height': height,
        }
      },

      computedValue () {
        return this.formatValue(this.value)
      },

      computedOldValue () {
        return this.formatValue(this.oldValue)
      },

      radioStatus () {
        return !this.disabled && this.mode=== 'radio'
      },

      checkboxHoverStatus () {
        return !this.disabled && this.mode=== 'checkbox' && this.hover
      },

      computedActive () {
        return !this.disabled && this.active
      },

      computedAlwaysActive () {
        return !this.disabled && this.alwaysActive
      }
    },

    watch: {
      initValue (val) {
        this.value = val
      },

      value (val, oldVal) {
        if (this.alwaysFeedback) {
          this.oldValue = oldVal
          this.$nextTick(() => {
            let callback = () => {
              this.$emit('input', this.computedValue, this.computedOldValue)
            }
            this['__triggerBack'](callback, this.computedValue, this.computedOldValue)
          })
        }
      },

      isActive: {
        immediate: true,
        handler (val) {
          this.active = val
        }
      }
    },

    methods: {
      updateValue (val) {
        this.value = val
      },

      formatValue (value) {
        let hasDefault = this.defaultValue !== null
        let type = this.valueType.toLowerCase()

        if (type === 'number' && !Number.isNaN(Number(value))) {

          value = value === '' && hasDefault ? this.defaultValue : value
          value = value === '' ? value : Number(value)

          if (this.digit !== null) value = Number(value).toFixed(this.digit)

          return value

        }

        return hasDefault ? this.defaultValue : value

      },

      getFocus () {
        this.$refs.searchInput.focus()
      },

      search () {
        this.$emit('onSearch', this.value, this.oldValue)
      },

      onFocus (focus) {
        this.active = focus
      },

      onInput (e) {
        this.value = e.target.value
        if (this.computedValue === this.defaultValue) this.$forceUpdate()
      },

      onChange (e) {
        this.oldValue = this.value
        this.value = e.target.value
        if (this.computedValue === this.defaultValue) this.$forceUpdate()
        let callback = () => {
          this.$emit('onChange', this.computedValue, this.computedOldValue)
        }
        this['__triggerBack'](callback, this.computedValue, this.computedOldValue)
      },

      onKeyupEnter (e) {
        this.oldValue = this.value
        this.value = e.target.value
        let callback = () => {
          this.$emit('onKeyupEnter', this.computedValue, this.computedOldValue)
        }
        this['__triggerBack'](callback, this.computedValue, this.computedOldValue)
      },

      onHover (hover) {
        this.hover = hover
      },

      onClick () {
        this.active = !this.active
        let callback = () => {
          this.$emit('handleClick', this.active)
        }
        this['__triggerBack'](callback, this.active)
      }
    }
  }
</script>

<style lang="scss" src="src/scss/files/input" />