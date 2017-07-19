<template>
  <thead :class="['anchor-thead']">
    <tr>
      <th
        v-for="(item, key) in data"
        :class="['anchor-thead__th']"
      >
        <anchor-element
          :mode="item.mode"
          :style="item.style"
          :iconName="item.iconName"
          :text="item.text"
          :textConfig="item.textConfig"
          :dropDownConfig="item.dropDownConfig"
          :onChangeBack="onChangeBack.bind(null, item.id)"
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
      onChangeBack (id) {
        console.log(arguments)

      }
    }
  }
</script>

<style lang="scss" src="Src/scss/files/table-head" />
