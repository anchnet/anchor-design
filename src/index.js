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
  version: '0.14.0',
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
}