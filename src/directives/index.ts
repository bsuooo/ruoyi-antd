import ClickOutside from './clickOutside'
import has from './has'
import type { App } from 'vue'

function install(Vue: App) {
  Vue.directive('click-outside', ClickOutside)
  Vue.directive('has', has)
}

export default install
