<template>
  <div
    :style="wrapStyle"
    :class="['anchor-input', {
      'anchor-input--active': computedAlwaysActive || computedActive || checkboxHoverStatus,
      'anchor-input__radio-wrap': mode === 'radio',
      'anchor-input__radio-wrap--active': radioStatus
    }]"
  >
    <span v-if="mode === 'search'" :class="['anchor-input__search-icon-wrap']" @click="getFocus()">
      <i
        :style="inputStyle"
        :class="['anchor-input__search-icon', {
          'anchor-input__search-icon--active': computedAlwaysActive || computedActive
        }]"
      ></i>
    </span>
    <input
      ref="searchInput"
      v-if="['input', 'search'].includes(mode)"
      :value.trim="computedValue"
      :disabled="disabled"
      :style="inputStyle"
      :class="['anchor-input__base', {
        'anchor-input__base--search': mode === 'search',
        'anchor-input__base--disabled': disabled,
      }]"
      :placeholder="defaultText"
      @focus="onFocus(true)"
      @blur="onFocus(false)"
      @input="!disabled && alwaysFeedback ? onInput($event) : ''"
      @change="!disabled && !alwaysFeedback ? onChange($event) : ''"
      @keyup.enter="!disabled ? onKeyupEnter($event) : ''"
    />
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
  import mixin from 'Src/libs/mixin'

  export default {
    name: 'anchor-input',

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
        active: this.isActive,
        hover: false,
        sizeMap: {
          'ip': {
            width: 56,
            height: 24
          },
          'smaller': {
            width: 80,
            height: 20
          },
        }
      }
    },

    computed: {
      wrapStyle () {
        return {
          width: this.__width
        }
      },

      inputStyle () {
        return {
          width: this.__width + 'px',
          height: this.__height + 'px',
          'line-height': this.__height + 'px',
          'min-height': this.mode === 'search' ? '12px' : ''
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
      }
    },

    methods: {
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
          this.$emit('input', this.active)
        }
        this['__triggerBack'](callback, this.active)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/input" />