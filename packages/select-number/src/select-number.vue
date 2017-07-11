<template>
  <div class="select-number">
    <anchor-icon :class="['select-number__icon']" name="direction__left" @handleClick="onButtonClick('reduce')" />
    <input class="select-number__input" :style="{width: width + 'px'}" :value="computedValue" @change="onInputChange($event)" />
    <anchor-icon :class="['select-number__icon']" name="direction__right" @handleClick="onButtonClick('increase')" />
  </div>
</template>

<script>
  import mixin from 'Src/libs/mixin'
  import AnchorIcon from 'Packages/icons/src/icons'

  export default {
    name: 'select-number',

    mixins: [mixin],

    components: {
      AnchorIcon
    },

    props: {
      width: Number,
      scope: Array,
      scopeEnd: Number,
      scopeStart: Number,
      onChangeBack: Function,

      defaultValue: {
        type: [Number, String],
        default: 1
      },

      step: {
        type: Number,
        default: 1
      }
    },

    data () {
      return {
        value: null
      }
    },

    computed: {
      digit () {
        let arr = String(this.step).split('.')
        return arr[1] ? arr[1].length : 0
      },

      computedValue () {
        return this.value === null ? 0 : this.value.toFixed(this.digit)
      },

      computedScope () {
        return this.compute(this.scope, this.scopeStart, this.scopeEnd)
      }
    },

    watch: {
      defaultValue (val, oldVal) {
        this.computeValue(val)
      }
    },

    mounted () {
      this.computeValue(this.defaultValue, 'setValue')
    },

    methods: {
      /**
       * 数值范围计算器
       * @param  {array} scope
       * @param  {number} start
       * @param  {number} end
       * @return {object} 计算后的scope
       */
      compute (scope, start, end) {
        let obj = {start: 0, end: 0, length: 0}
        if (scope) {
          obj.start = scope[0]
          obj.end = scope[1]
          obj.length = scope[1] - scope[0]
        } else if (end) {
          if (start) obj.start = start
          obj.end = end
          obj.length = obj.end - obj.start
        }
        return obj
      },

      computeValue (value, type = 'onChange') {
        if (!Number.isNaN(Number(value))) value = Number(value)

        if (type === 'onChange') {
          let computedScope = this.computedScope

          if (value < computedScope.start) value = computedScope.start
          if (value > computedScope.end) value = computedScope.end

          value =  Math.round(Number(value) / this.step) * this.step
        }

        value = Number(value.toFixed(this.digit))
        let oldValue = this.value
        this.value = value
        if (oldValue === value) this.$forceUpdate()
        this.getValue(value)
      },

      onInputChange (e) {
        this.computeValue(e.target.value)
      },

      onButtonClick (type) {
        let value = type === 'increase' ? this.value + this.step : this.value - this.step
        this.computeValue(value)
      },

      getValue (value) {
        value = value === undefined ? this.value : value

        let callback = () => {
          this.$emit('input', value)
        }
        this.triggerBack(callback, value)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/select-number" />