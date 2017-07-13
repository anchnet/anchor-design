<template>
  <div :class="['anchor-pagination']">
    <span :class="['anchor-pagination__text']">共{{total}}条, </span>
    <span :class="['anchor-pagination__text']"><!--
   -->每页显示<!--
   --><span v-if="typeof perUnit === 'number'">{{perUnit}}</span>
      <anchor-drop-down
        v-else
        mode="simple"
        :data="perUnit.data"
        :defaultText="perUnit.defaultText"
        :defaultId="perUnit.defaultId"
        :onChangeBack="onChangeBack"
      /><!--
   -->条
    </span>
    <anchor-icon name="direction__left-style-2" />
    <div :class="['anchor-pagination__list']">
      <anchor-button btnStyle="2" />
    </div>
    <anchor-icon name="direction__right-style-2" />
    <span :class="['anchor-pagination__text']"><!--
   -->共 {{pageCount}} 页, 前往<!--
   --><anchor-input valueType="number" size="ip" :alwaysFeedback="false" @onChange="onPageChange" /><!--
   -->页<!--
   --></span>
  </div>
</template>

<script>
  import AnchorButton from 'Packages/button/src/button'
  import AnchorInput from 'Packages/input/src/input'
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorIcon from "../../icons/src/icons";

  export default {
    name: 'anchor-pagination',

    components: {
      AnchorIcon,
      AnchorButton, AnchorInput, AnchorDropDown
    },

    props: {
      total: {
        type: Number,
        default: 400
      },

      perUnit: {
        type: [Number, Object],
        default () {
          return {
            defaultId: 5,
            data: [
              {id: 5, value: 5},
              {id: 10, value: 10},
              {id: 20, value: 20},
              {id: 100, value: 100}
            ]
          }
        }
      }
    },

    data () {
      return {
      }
    },

    computed: {
      pageCount () {
        return this.total
      },

      listData () {

      }
    },

    methods: {
      onPageChange (val, oldVal) {
        console.log(val, oldVal)
      },

      onChangeBack (item, key) {
        console.log(item.id, key)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/pagination" />