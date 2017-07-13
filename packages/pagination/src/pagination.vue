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
    <span :class="['anchor-pagination__operate']" @mouseenter="leftActive = true" @mouseleave="leftActive = false">
      <anchor-icon name="direction__left-style-3" :active="leftActive" />
    </span><!--
 --><ul :class="['anchor-pagination__list']">
      <li
        v-for="(item, key) in listData"
        :class="['anchor-pagination__list-item', {
          'anchor-pagination__list-item--active': item.active
        }]"
      >
        <span :class="['anchor-pagination__list-item-text']">{{item.text}}</span>
      </li>
    </ul><!--
 --><span :class="['anchor-pagination__operate']" @mouseenter="rightActive = true" @mouseleave="rightActive = false">
      <anchor-icon name="direction__right-style-3" :active="rightActive" />
    </span>
    <span :class="['anchor-pagination__text']"><!--
   -->前往<!--
   --><anchor-input valueType="number" size="ip" :alwaysFeedback="false" @onChange="onPageChange" /><!--
   -->页<!--
   --></span>
  </div>
</template>

<script>
  import AnchorInput from 'Packages/input/src/input'
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorIcon from "../../icons/src/icons";

  export default {
    name: 'anchor-pagination',

    components: {
      AnchorIcon, AnchorInput, AnchorDropDown
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
        leftActive: false,
        rightActive: false,
      }
    },

    computed: {
      pageCount () {
        return this.total
      },

      listData () {
        return [
          {text: 1},
          {text: 2},
          {text: 3, active: true},
          {text: 4},
          {text: 5},
          {text: 6},
          {text: 7},
          {text: 8},
          {text: 9},
        ]
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