<template>
  <thead :class="['anchor-thead']">
  <tr>
    <th v-if="hasCheckbox">
      <anchor-input mode="checkbox" :isActive="selected" :disabled="disabled" @handleClick="onSelect" />
    </th>
    <th v-for="(item, key) in data">
      <anchor-drop-down
        v-if="item.type === 'dropDown'"
        mode="simple"
        :height="20"
        :defaultText="item.text"
        :isFilter="item.isFilter"
        :data="maps[item.id] || []"
        :onChangeBack="onDropDownClick.bind(null, item.id)"
      />
      <div v-else>{{item.text}}</div>
    </th>
  </tr>
  </thead>
</template>

<script>
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorInput from 'Packages/input/src/input'

  export default {
    name: 'anchor-thead',

    components: {
      AnchorDropDown, AnchorInput
    },

    props: {
      selected: Boolean,
      disabled: Boolean,
      data: Array,
      maps: {
        type: Object,
        default () {
          return {}
        }
      },
      onClickBack: Function,
      hasCheckbox: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {

      }
    },

    methods: {
      onDropDownClick (theadId, item, key) {
        if (this.onClickBack)
          this.onClickBack({type: 'filters', theadId, item, key})
      },

      onSelect (checked) {
        if (this.onClickBack)
          this.onClickBack({type: 'select', checked})
      },
    }
  }
</script>
