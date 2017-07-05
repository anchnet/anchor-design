<template>
  <ol>
    <li>
      <h3>anchor-button</h3>
      <div class="demo-layout">
        <anchor-button btnStyle="1" />
        <anchor-button btnStyle="2" />
        <anchor-button btnStyle="3" />
        <anchor-button btnStyle="4" />
        <anchor-button btnStyle="5" />
        <anchor-button btnStyle="6" />
        <anchor-button mode="tag" />
        <anchor-button mode="tag" tagColor="2B90E8" />
        <anchor-button mode="tag" tagColor="08B446" />
        <anchor-button mode="tag" tagColor="AEA202" />
        <anchor-button mode="tag" tagColor="6F57FF" />
        <anchor-button mode="tag" tagColor="E15E85" />
        <anchor-button mode="tag" tagColor="1AADE1" />
        <anchor-button mode="tag" tagColor="F96E28" />
      </div>
      <div class="demo-layout">
        <anchor-button btnStyle="1" :isDisabled="true" />
        <anchor-button btnStyle="2" :isDisabled="true" />
        <anchor-button btnStyle="3" :isDisabled="true" />
        <anchor-button btnStyle="4" :isDisabled="true" />
        <anchor-button btnStyle="5" :isDisabled="true" />
        <anchor-button btnStyle="6" :isDisabled="true" />
        <anchor-button mode="tag" :isClicked="false" />
        <anchor-button mode="tag" tagColor="2B90E8" :isClicked="false" />
        <anchor-button mode="tag" tagColor="08B446" :isClicked="false" />
        <anchor-button mode="tag" tagColor="AEA202" :isClicked="false" />
        <anchor-button mode="tag" tagColor="6F57FF" :isClicked="false" />
        <anchor-button mode="tag" tagColor="E15E85" :isClicked="false" />
        <anchor-button mode="tag" tagColor="1AADE1" :isClicked="false" />
        <anchor-button mode="tag" tagColor="F96E28" :isDisabled="true" />
      </div>
      <div class="demo-layout">
        <anchor-button mode="tag" :width="120" />
        <anchor-button mode="tag" tagColor="2B90E8" :width="100" />
        <anchor-button mode="tag" tagColor="08B446" :width="200" />
        <anchor-button mode="tag" tagColor="AEA202" :width="300" />
        <anchor-button mode="tag" tagColor="6F57FF" :width="90" />
        <anchor-button mode="tag" tagColor="E15E85" :width="220" />
        <anchor-button mode="tag" tagColor="1AADE1" :width="80" />
        <anchor-button mode="tag" tagColor="F96E28" :width="170" />
      </div>
    </li>
    <li>
      <h3>drop-down组件</h3>
      <div class="demo-layout">
        <anchor-drop-down
          :data="dropdownData.imageType.data"
          :type="dropdownData.imageType.type"
          :hasDot="dropdownData.imageType.hasDot"
          :defaultText="dropdownData.imageType.defaultText"
          :onChangeBack="onDropDownChange.bind(null, 'imageType')"
        />
        <anchor-drop-down
          class="ml10"
          :data="dropdownData.imageVersion.data[currentImageType]"
          :hasDot="dropdownData.imageVersion.hasDot"
          :defaultKey="dropdownData.imageType.defaultKey"
          :defaultText="dropdownData.imageVersion.defaultText"
          :onChangeBack="onDropDownChange.bind(null, 'imageVersion')"
        />
      </div>
      <p class="color-primary">parentCurrentkey: {{dropdownData.imageType.defaultKey}}</p>
      <p class="color-primary">childDefaultValue: {{currentImageVersion}}</p>
    </li>
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
  import AnchorDropDown from 'Packages/drop-down/src/drop-down'
  import AnchorButton from 'Packages/button/src/button'

  export default {
    name: 'demo',
    components: {
      AnchorMenuVertical, AnchorSwitchLabel, AnchorDropDown, AnchorButton
    },

    methods: {
      onLabelChange (type, item, key) {
        if (type === 'regions') {
          this.hostType[1]['forbidden'] = item.id !== 'ac3'
        }
        this.currentName = item.value
      },

      onDropDownChange (type, item, key) {
        if (type === 'imageType') {
          this.currentImageType = item.id
          this.dropdownData.imageType.defaultKey = key
        } else if (type === 'imageVersion') {
          this.currentImageVersion = item.value
        }
      },
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
        ],

        dropdownData: {
          imageType: {
            type: "image",
            hasDot: true,
            defaultKey: 2,
            defaultText: '请选择镜像类型',
            data: [
              {id: "windows", value: "windows"},
              {id: "centos", value: "centos"},
              {id: "ubuntu", value: "ubuntu"},
              {id: "debian", value: "debian"},
              {id: "redhat", value: "redhat"},
              {id: "coreos", value: "coreos"},
              {id: "desktop", value: "desktop"},
              {id: "opensuse", value: "opensuse"},
              {id: "arch", value: "arch"}
            ]
          },
          imageVersion: {
            hasDot: true,
            defaultText: '请选择镜像版本',
            data: {
              default: [],
              windows: [
                {id: "windows1", value: "windows1"},
                {id: "windows2", value: "windows2"},
                {id: "windows3", value: "windows3"},
                {id: "windows4", value: "windows4"}
              ],
              centos: [
                {id: "centos1", value: "centos1"},
                {id: "centos2", value: "centos2"},
                {id: "centos3", value: "centos3"}
              ],
              ubuntu: [
                {id: "ubuntu1", value: "ubuntu1"},
                {id: "ubuntu2", value: "ubuntu2ubuntu2ubuntu2"},
                {id: "ubuntu3", value: "ubuntu3"}
              ],
            }
          }
        },
        currentImageType: 'default',
        currentImageVersion: '',
      }
    },
  }
</script>

<style lang="scss">
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