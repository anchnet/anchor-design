<template>
  <thead :class="['anchor-thead']">
    <tr>
      <th v-for="(item, key) in data">
        <anchor-element
          :mode="item.mode"
          :style="item.style"
          :iconName="item.iconName"
          :textConfig="item.textConfig"
          :dropDownConfig="item.dropDownConfig"
          :handleClick="handleClick.bind(null, item.id)"
        />
      </th>
    </tr>
  </thead>
</template>

<script>
  import AnchorElement from 'Packages/nav/src/element'

  export default {
    name: 'anchor-thead',

    components: {
      AnchorElement
    },

    props: {
      data: Array,
      maps: Object
    },

    data () {
      return {

      }
    },

    methods: {
      handleClick (id) {

      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/table-head" />
