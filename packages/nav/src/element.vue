<template>
  <div :class="['anchor-element']">
    <anchor-icon
      v-if="component === 'icon'"
      :name="iconName"
    />
    <anchor-button
      v-if="component === 'button'"
      :iconName="hasIcon && iconName"
      :text="textConfig.text"
      :targetText="textConfig.target"
      :link="textConfig.link"
      @handleClick="textConfig.link ? '' : handleClick()"
    />
    <anchor-drop-down
      v-if="component === 'dropDown'"
      mode="simple"
      :onShowIcon="hasIcon && iconName"
      :defaultText="dropDownConfig.text"
      :data="dropDownConfig.data"
      :height="height"
      :width="dropDownConfig.width"
      :onChangeBack="handleClick"
    />
  </div>
</template>

<script>
  import mixin from 'Src/libs/mixin'
  import AnchorIcon from 'Packages/icons/src/icons'
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorButton from 'Packages/button/src/button'
  export default {
    name: 'anchor-element',

    mixins: [mixin],

    components: {
      AnchorIcon, AnchorDropDown, AnchorButton
    },

    props: {
      height: Number,
      width: Number,
      onChangeBack: Function,

      mode: {
        type: String,
        default: 'icon-text'
      },

      iconName: {
        type: String,
        default: 'dot'
      },

      textConfig: {
        type: Object,
        default () {
          return {
            text: '元素内容',
            link: '',
            target: '_self'
          }
        }
      },

      dropDownConfig: {
        type: Object,
        default () {
          return {
            width: 100,
            data: []
          }
        }
      }
    },

    data () {
      return {
        component: '',
        hasIcon: false,
        hasText: false,
        hasDropDown: false
      }
    },

    watch: {
      mode: {
        immediate: true,
        handler (val) {
          let hasIcon = false, hasText = false, hasDropDown = false
          val.split('-').forEach((item) => {
            if (item === 'icon') hasIcon = true
            if (item === 'text') hasText = true
            if (item === 'dropDown') hasDropDown = true
          })
          this.hasIcon = hasIcon
          this.hasText = hasText
          this.hasDropDown = hasDropDown
          this.component = hasDropDown ? 'dropDown' : hasText ? 'button' : 'icon'
        }
      }
    },

    methods: {
      handleClick (item, key) {
        let callback = () => {
          this.$emit('handleClick', item, key)
        }
        this['__triggerBack'](callback, item, key)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/element" />