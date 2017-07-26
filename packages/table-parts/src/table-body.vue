<template>
  <tbody :class="['anchor-tbody']">
  <tr>
    <td v-if="hasCheckbox" :class="['anchor-table__cell']">
      <anchor-input
        mode="checkbox"
        :disabled="disabled"
        :isActive="!!selected"
        @handleClick="onSelect"
      />
    </td>
    <td v-for="(item, key) in theadData" :class="['anchor-table__cell']">
      <slot :name="`td_${key}`"></slot>
    </td>
  </tr>
  <slot name="tr"></slot>
  </tbody>
</template>

<script>
  import AnchorInput from 'Packages/input/src/input'

  export default {
    name: 'anchor-tbody',

    components: {
      AnchorInput
    },

    props: {
      theadData: Array,
      disabled: Boolean,
      selected: Boolean,
      hasCheckbox: {
        type: Boolean,
        default: true
      },
      onSelectBack: Function,
    },

    methods: {
      onSelect (checked) {
        if (this.onSelectBack) this.onSelectBack(checked)
      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/table" />