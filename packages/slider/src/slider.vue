<template>
  <div :class="['anchor-slider', {'anchor-slider--alone': !hasInputBlock}]">
    <div :class="['anchor-slider__body']" @click.self="onDragClick" :style="{'width': width + 'px'}">
      <div ref="sliderActive" :class="['anchor-slider__active-body']"
           @click.self="onDragClick" :style="{'width': activePercentage * 100 + '%'}"></div>
      <div :class="['anchor-slider__drag-block']" :style="{'left': dragPosition + 'px'}" @mousedown="mousedown">
        <span :class="['anchor-slider__stripes-wrapper']">
          <span :class="['anchor-slider__stripes']"></span>
          <span :class="['anchor-slider__stripes']"></span>
          <span :class="['anchor-slider__stripes']"></span>
        </span>
        <div v-if="hasFloatTip" v-show="showTips" :class="['anchor-slider__float-tip']">
          {{valueTipText}}<anchor-icon name="triangle__down" :class="['anchor-slider__tip-icon']" />
        </div>
      </div>
    </div>
    <input v-if="hasInputBlock" :value="displayValue" @change="onInputChange($event)" class="input-wrapper" type="tel"/>
    <span v-if="!!unit" :class="['anchor-slider__unit']">{{unit}}</span>
  </div>
</template>

<script>
  import utils from 'Src/libs/utils'
  import mixin from 'Src/libs/mixin'
  import AnchorIcon from 'Packages/icons/src/icons'

  /**
   * param
   *   scope {array} [0, 100] 滑动条数值显示范围，优先级高
   *   scopeStart {number} 1 显示范围起始值，优先级低
   *   scopeEnd {number} 1 显示范围结束值，优先级低
   *   defaultValue {number} 1 默认值
   *   width {number} 300 滑动条像素长度
   *   unit {string} Mbps 滑动条显示单位，默认为Mbps
   *   step {number} 1 滑动时，数值单位长度，默认为1
   *   alwaysFeedback {boolean} false 设置是否总是触发回调，默认为false，只在释放鼠标时触发
   *   hasFloatTip {boolean} true 是否显示数值提示浮框
   *   hasInputBlock {boolean} true 是否显示滑动条的输入框
   *   onChangeBack {function} 回调，参数返回当前数据
   */
  export default {
    name: 'anchor-slider',

    mixins: [mixin],

    components: {
      AnchorIcon
    },

    props: {
      scope: Array,
      defaultValue: Number,
      scopeStart: Number,
      scopeEnd: Number,
      tipText: String,
      onChangeBack: Function,
      unit: String,
      width: {
        type: Number,
        default: 300
      },
      step: {
        type: Number,
        default: 1
      },
      alwaysFeedback: {
        type: Boolean,
        default: false
      },
      hasFloatTip: {
        type: Boolean,
        default: true
      },
      hasInputBlock: {
        type: Boolean,
        default: true
      },
    },

    data () {
      return {
        value: null, //当前显示的数值
        activePercentage: 0, //活跃进度条像素宽度百分比
        dragPosition: -8, //拖动块的像素位置
        perUnit: 0, //单位数据(即: this.step)对应的像素长度
        sliderActObj: {
          clientX: null, //活跃进度条右侧、拖动块、鼠标起始 的像素位置（相对于浏览器可视区域）
          width: 0 // 活跃进度条的像素宽度
        },
        showTips: false // 控制 value 浮动提示框的显示
      }
    },

    computed: {
      valueTipText () {
        return this.tipText ? this.tipText : this.displayValue
      },

      displayValue () {
        return this.value === 0 ? 0 : this.value.toFixed(this.digit)
      },

      digit () {
        let num = String(this.step).split('.')[1] || ''
        return num.length
      },

      /**
       * 根据 scope、scopeStart、scopeEnd 计算生成滑动条数值范围
       * @type {array}
       */
      computedScope: {
        get () {
          return this.compute(this.scope, this.scopeStart, this.scopeEnd)
        },
        set (val) {
          this.getActiveData(this.defaultValue, val)
        }
      },
    },

    watch: {
      defaultValue: {
        immediate: true,
        handler (val) {
          this.getActiveData(val, this.computedScope)
        }
      },
    },

    methods: {
      /**
       * 格式化 value
       * @param  {number} value 数值
       * @return {number}       格式化后的数值
       */
      toFixed (value) {
        return Number(value.toFixed(this.digit))
      },

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
          if (typeof start === 'number') obj.start = start
          obj.end = end
          obj.length = obj.end - obj.start
        }
        return obj
      },

      /**
       * 根据默认值和计算后的scope，计算获取组件所需数据
       * @param  {number} defaultValue  [description]
       * @param  {array} computedScope [description]
       */
      getActiveData (defaultValue, computedScope) {
        if (utils.isNumber(defaultValue) && /^\d+$/.test(defaultValue)) {
          // 控制默认值范围
          if (defaultValue < computedScope.start) defaultValue = computedScope.start
          if (defaultValue > computedScope.end) defaultValue = computedScope.end

          // 获得百分比
          this.activePercentage = (defaultValue - computedScope.start) / computedScope.length
        } else {
          this.activePercentage = 0
        }

        // 获得活跃条宽度
        let newActWidth = this.activePercentage * this.width
        this.sliderActObj.width = newActWidth
        // 获得滑块位置
        this.dragPosition = newActWidth - 8
        let {computedValue} = this.getStepData(newActWidth)
        let value = computedValue + this.computedScope.start //获取输入框的 value 值
        this.value = this.toFixed(value) //更新输入框的 value 值
        // 触发回调
        this.triggerBack(value, {action: 'done'})
      },

      /**
       * 根据活跃条原始宽度，计算获得数据值 value 及活跃条相对scope数据取整后的宽度
       * @param  {number} actwidth 原始宽度
       * @return {object} actwidth 计算后的宽度 && value
       */
      getStepData (actwidth) {
        if (this.step === 0) return actwidth

        // 单位数据(即: this.step)对应的像素长度
        let perUnit = this.width * this.step / this.computedScope.length
        //保存数据（单位：px/step）
        this.perUnit = perUnit
        // 步数取整
        let steps = Math.round(actwidth / perUnit)

        actwidth = steps * perUnit      //取整后的宽度
        let computedValue = steps * this.step   //取整后的 value

        let oldValue = this.value

        return {actwidth, computedValue, oldValue}
      },

      /**
       * 更新滑动条
       * @param  {number} clientX 滑动条调用时为鼠标点击位置X，input 输入框调用时为 value 值
       * @param  {String} type    调用方式
       */
      changeSlider (clientX, type = 'slider', action = 'mousemove') {
        let sliderActObj = utils.clone(this.sliderActObj)
        let {start, end} = this.computedScope
        // 获取滑动条左侧在浏览器可视区域的位置
        let sliderLeft = vQuery(this.$refs.sliderActive).offset().left - vQuery('body').scrollLeft()

        if (sliderActObj.clientX === null) {
          // 获取活跃进度条右侧相对可视区域的水平位置（即：滑块起始位置）
          sliderActObj.clientX = sliderLeft + sliderActObj.width
        }

        // 获取活跃条宽度
        if (type === 'slider') {
          sliderActObj.width += clientX - sliderActObj.clientX
          if (sliderActObj.width < 0) sliderActObj.width = 0
          if (sliderActObj.width > this.width) sliderActObj.width = this.width

          let {computedValue, oldValue} = this.getStepData(sliderActObj.width)

          if (computedValue < 0) computedValue = start
          if (computedValue > end - start) {
            computedValue = end - start
          }

          sliderActObj.width = computedValue / this.step * this.perUnit

          let value = computedValue + start

          //更新输入框的 value 值
          this.value = this.toFixed(value)

          // 触发回调
          let isCallback = this.alwaysFeedback && oldValue !== value
          isCallback = action === 'mouseup' || isCallback
          if (isCallback) {
            this.triggerBack(value, {action: action === 'mouseup' ? 'done' : null})
          }
        }

        // 获取活跃条宽度
        if (type === 'input') {
          sliderActObj.width = (clientX - start) / this.step * this.perUnit
        }

        //更新 dragPosition
        this.dragPosition = sliderActObj.width - 8

        //更新 activePercentage
        this.activePercentage = sliderActObj.width / this.width

        // 更新 this.sliderActObj 数据
        this.sliderActObj.clientX = sliderLeft + sliderActObj.width
        this.sliderActObj.width = sliderActObj.width
      },

      mousedown (event) {
        vQuery('body').css({'cursor': 'default'})
        vQuery('body').on('selectstart', () => false)
        this.showTips = true
        vQuery('body').on('mousemove', (e) => {
          this.changeSlider(e.clientX)
        })

        vQuery('body').on('mouseup', (e) => {
          this.showTips = false
          this.changeSlider(e.clientX, 'slider', 'mouseup')
          vQuery('body').css({'cursor': ''})
          vQuery('body').off('selectstart')
          vQuery('body').off('mousemove')
          vQuery('body').off('mouseup')
        })
      },

      onDragClick (e) {
        this.changeSlider(e.clientX, 'slider', 'mouseup')
      },

      onInputChange (e) {
        let value = Number(e.target.value)

        if (Number.isNaN(value)) return this.$forceUpdate()

        if (value < this.computedScope.start) value = this.computedScope.start
        if (value > this.computedScope.end) value = this.computedScope.end

        if (this.step) value = Math.round(value / this.step) * this.step

        this.changeSlider(value, 'input')

        if (this.value === this.toFixed(value)) {
          this.$forceUpdate()
        }

        this.value = this.toFixed(value)

        //回调
        this.triggerBack(value, {action: 'done'})
      },

      triggerBack (value, params = {}) {
        value = value || value === 0 ? value : this.value
        let callback = () => {
          this.$emit('input', value)
        }
        this.__triggerBack(callback, value, params)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/slider" />
