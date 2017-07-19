<template>
  <div :class="['anchor-table']">
    <table :class="['anchor-table__main']">
      <anchor-thead :data="theadData" />
      <tbody>
      <tr>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import AnchorThead from 'Packages/table-parts/src/table-head'

  export default {
    name: 'anchor-table',

    components: {
      AnchorThead
    },

    props: {
      theadData: Array,
      data: Array,
      maps: Object
    },

    methods: {

    }
  }
</script>

<style lang="scss" src="Src/scss/files/table" />
