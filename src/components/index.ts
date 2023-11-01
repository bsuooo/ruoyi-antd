import { App } from 'vue'
import vForm from '@/components/atom/form/components/form.vue'
import vFormItem from '@/components/atom/form/components/formItem.vue'
import svgIcon from '@/components/atom/svgIcon/index.vue'

export default {
	install(Vue: App) {
		Vue.component('v-form', vForm)
		Vue.component('v-form-item', vFormItem)
		Vue.component('svg-icon', svgIcon)
	}
}

// import { type App, defineAsyncComponent } from 'vue'
// const components = Object.entries(import.meta.glob('@/components/atom/*'))
// const preFix = 'v'
// export default {
// 	// use 的时候
// 	install: (app: App) => {
// 		components.forEach(([key, comp]) => {
// 			console.log(key, comp)

// 			console.log(comp.name, key)
// 			// 得到组件的名称
// 			const name = getCompName(comp.name || key)
// 			app.component(preFix + name, defineAsyncComponent(comp as any))
// 		})
// 	}
// }

// function getCompName(key: string) {
// 	const nameReg = /\/(\w+).vue/
// 	return nameReg.test(key) ? key.match(nameReg)![1] : key
// }
