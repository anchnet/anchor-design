<template>
  <div :class="['anchor-element']" :style="{'margin': margin}">
    <anchor-icon
      v-if="component === 'icon'"
      :name="iconName"
    />
    <anchor-button
      v-if="component === 'button'"
      :iconName="hasIcon && iconName"
      :text="text"
      :targetText="targetText"
      :link="link"
    />
    <anchor-drop-down
      v-if="component === 'dropDown'"
      mode="simple"
      :onShowIcon="hasIcon && iconName"
      :defaultText="text"
      :data="listData"
      :height="height"
      :width="dropDownWidth"
    />
  </div>
</template>

<script>
  import AnchorIcon from 'Packages/icons/src/icons'
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorButton from 'Packages/button/src/button'
  export default {
    name: 'anchor-element',

    components: {
      AnchorIcon, AnchorDropDown, AnchorButton
    },

    props: {
      mode: {
        type: String,
        default: 'icon-text'
      },

      iconName: {
        type: String,
        default: 'dot'
      },

      text: {
        type: String,
        default: '元素内容'
      },

      link: {
        type: String,
        default: ''
      },

      targetText: {
        type: String,
        default: '_self'
      },

      listData: Array,

      height: Number,
      width: Number,
      margin: String,
      dropDownWidth: Number
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
    }
  }
</script>

<style lang="scss" src="Src/scss/files/element" />