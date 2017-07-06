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
  AnchorSearch
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
  version: '0.7.2',
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
  AnchorSearch
}