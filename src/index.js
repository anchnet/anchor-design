import AnchorIcon from '../packages/icons/index.js'
import AnchorMenuVertical from '../packages/menu-vertical/index.js'

const components = [
  AnchorMenuVertical,
  AnchorIcon
]

const install = function (Vue, options) {
  if (install.installed) return
  components.forEach((component) => {
    Vue.directive(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install,
  AnchorIcon,
  AnchorMenuVertical
}