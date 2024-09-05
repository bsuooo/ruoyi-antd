import type { App } from 'vue'
import vForm from '@/components/atom/Form/components/form.vue'
import vFormItem from '@/components/atom/Form/components/formItem'
import svgIcon from '@/components/atom/SvgIcon/index.vue'
import baseCard from '@/components/atom/BaseCard/index.vue'

export default {
  install(Vue: App) {
    Vue.component('v-form', vForm)
    Vue.component('v-form-item', vFormItem)
    Vue.component('svg-icon', svgIcon)
    Vue.component('base-card', baseCard)
  },
}
