import { App } from 'vue'
import vForm from '@/components/atom/form/components/form.vue'
import vFormItem from '@/components/atom/form/components/formItem.vue'

export default {
	install(Vue: App) {
		Vue.component('v-form', vForm)
		Vue.component('v-form-item', vFormItem)
	}
}
