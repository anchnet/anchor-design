<template>
  <tbody :class="['anchor-tbody']">
  <tr>
    <td v-if="hasPlaceholder">
      <anchor-input
        v-if="hasCheckbox"
        mode="checkbox"
        :disabled="Data[dataKey] && Data[dataKey]['disabled']"
        :isActive="Data[dataKey] && Data[dataKey]['active']"
        @handleClick="onSelect"
      />
    </td>
    <slot></slot>
  </tr>
  <slot name="tr"></slot>
  </tbody>
</template>

<script>
  import AnchorInput from 'Packages/input/src/input'

  export default {
    name: 'anchor-tbody',

    components: {
      AnchorInput,
    },

    props: {
      dataKey: Number,
      data: Array,
      component: String,
      hasPlaceholder: {
        type: Boolean,
        default: true
      },
      hasCheckbox: {
        type: Boolean,
        default: true
      },
      onSelectBack: Function,
    },

    data () {
      return {
        Data: this.data || [],
      }
    },

    watch: {
      deep: true,
      handler (val) {
        this.Data = val
      }
    },

    methods: {
      onSelect (checked) {
        if (this.hasPlaceholder && this.hasCheckbox) {
          if (this.Data.length && this.dataKey > -1) {
            this.$set(this.Data[this.dataKey], 'active', checked)
          }
        }
        if (this.onSelectBack) this.onSelectBack(checked)
      }
    }
  }
</script>