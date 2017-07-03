import AnchorIcon from '../packages/icons/index.js'
import AnchorMenuGroup from '../packages/menu-group/index.js'
import AnchorMenuTitle from '../packages/menu-title/index.js'
import AnchorMenuContent from '../packages/menu-content/index.js'
import AnchorMenuVertical from '../packages/menu-vertical/index.js'
import AnchorSwitchLabel from '../packages/switch-label/index.js'

const components = [
  AnchorIcon,
  AnchorMenuGroup,
  AnchorMenuTitle,
  AnchorMenuContent,
  AnchorMenuVertical,
  AnchorSwitchLabel
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
  install,
  AnchorIcon,
  AnchorMenuGroup,
  AnchorMenuTitle,
  AnchorMenuContent,
  AnchorMenuVertical,
  AnchorSwitchLabel
}