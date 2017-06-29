import AnchorMenuVertical from 'Packages/menu-vertical/index.js'
import AnchorIcon from 'Packages/icons/index.js'

const components = [
  AnchorMenuVertical, AnchorIcon
]

const installPlugins = function (Vue, options) {
  components.forEach((component) => {
    Vue.directive(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  installPlugins(window.Vue)
}

module.exports = {
  installPlugins
}