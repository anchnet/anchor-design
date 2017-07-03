<template>
  <ol>
    <li>
      <h3>anchor-menu-vertical</h3>
      <div class="demo-layout">
        <anchor-menu-vertical></anchor-menu-vertical>
      </div>
    </li>
    <li>
      <h3>anchor-switch-label</h3>
      <div class="demo-layout">
        区域：<anchor-switch-label :initData="regions" :onChangeBack="onLabelChange.bind(null, 'regions')"/>
      </div>
      <div class="demo-layout">
        类型：<anchor-switch-label :initData="resType" :onChangeBack="onLabelChange.bind(null, 'resType')"/>
      </div>
      <div class="demo-layout">
        主机类型：<anchor-switch-label :initData="hostType" :onChangeBack="onLabelChange.bind(null, 'hostType')"/>
      </div>
      <p class="color-primary">currentLabelValue: {{currentName}}</p>
    </li>
  </ol>
</template>

<script>
  import AnchorMenuVertical from 'Packages/menu-vertical/src/menu-vertical'
  import AnchorSwitchLabel from 'Packages/switch-label/src/switch-label'

  export default {
    name: 'demo',
    components: {
      AnchorMenuVertical, AnchorSwitchLabel
    },

    data () {
      return {
        currentName: "",
        regions: [
          {id: "ac1", value: "华东一区（无锡）", active: false},
          {id: "ac3", value: "华东二区（上海）", active: false},
          {id: "ac2", value: "亚太一区（香港）", active: true}
        ],
        resType: [
          {id: "instance", value: " 云服务器", active: true},
          {id: "rdb", value: "云数据库", active: false}
        ],
        hostType: [
          {id: "hd", value: "性能型", active: true, forbidden: false},
          {id: "hds", value: "超高性能型", active: false, forbidden: true}
        ]
      }
    },

    methods: {
      onLabelChange (type, item, key) {
        if (type === 'regions') {
          this.hostType[1]['forbidden'] = item.id !== 'ac3'
        }
        this.currentName = item.value
      },
    }
  }
</script>

<style lang="scss" scoped>
  ol{
    padding: 20px 40px;
    list-style: decimal;
    line-height: 2;
    > li h3{
      font-size: 16px;
      color: red;
    }
    .demo-layout{
      margin: 10px 0;
      font-size: 14px;
    }
  }
</style>