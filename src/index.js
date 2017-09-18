import AnchorIcon from '../packages/icons/index.js'
import AnchorMenuGroup from '../packages/menu-group/index.js'
import AnchorMenuTitle from '../packages/menu-title/index.js'
import AnchorMenuContent from '../packages/menu-content/index.js'
import AnchorMenuVertical from '../packages/menu-vertical/index.js'
import AnchorSwitchLabel from '../packages/switch-label/index.js'
import AnchorDropDown from '../packages/drop-down/index.js'
import AnchorButton from '../packages/button/index.js'
import AnchorInput from '../packages/input/index.js'
import AnchorSearch from '../packages/search/index.js'
import AnchorNav from '../packages/nav/index.js'
import AnchorElement from '../packages/element/index.js'
import AnchorSelectNumber from '../packages/select-number/index.js'
import AnchorPagination from '../packages/pagination/index.js'
import AnchorTable from '../packages/table/index.js'
import AnchorTbody from '../packages/table-body/index.js'
import AnchorTcell from '../packages/table-cell/index.js'
import AnchorBreadCrumb from '../packages/bread-crumb/index.js'
import AnchorTabs from '../packages/tabs/index.js'
import AnchorRadio from '../packages/radio/index.js'
import AnchorCheckbox from '../packages/checkbox/index.js'
import AnchorRow from '../packages/layout/index.js'
import AnchorCol from '../packages/layout-col/index.js'
import AnchorTransfer from '../packages/transfer/index.js'
import AnchorSlider from '../packages/slider/index.js'

const components = [
  AnchorIcon,
  AnchorMenuGroup,
  AnchorMenuTitle,
  AnchorMenuContent,
  AnchorMenuVertical,
  AnchorSwitchLabel,
  AnchorDropDown,
  AnchorButton,
  AnchorInput,
  AnchorSearch,
  AnchorNav,
  AnchorElement,
  AnchorSelectNumber,
  AnchorPagination,
  AnchorTable,
  AnchorTbody,
  AnchorTcell,
  AnchorBreadCrumb,
  AnchorTabs,
  AnchorRadio,
  AnchorCheckbox,
  AnchorRow,
  AnchorCol,
  AnchorTransfer,
  AnchorSlider,
]

const install = function (Vue, options) {
  if (install.installed) return
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '0.22.16',
  install,
  AnchorIcon,
  AnchorMenuGroup,
  AnchorMenuTitle,
  AnchorMenuContent,
  AnchorMenuVertical,
  AnchorSwitchLabel,
  AnchorDropDown,
  AnchorButton,
  AnchorInput,
  AnchorSearch,
  AnchorNav,
  AnchorElement,
  AnchorSelectNumber,
  AnchorPagination,
  AnchorTable,
  AnchorTbody,
  AnchorTcell,
  AnchorBreadCrumb,
  AnchorTabs,
  AnchorRadio,
  AnchorCheckbox,
  AnchorRow,
  AnchorCol,
  AnchorTransfer,
  AnchorSlider,
}