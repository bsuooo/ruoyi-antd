import has from './has'
import type { App } from 'vue'

function install(Vue: App) {
  Vue.directive('has', has)
}

export default install
