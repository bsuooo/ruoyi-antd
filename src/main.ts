import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import components from '@/components'
import '@/utils/version-update'
import 'virtual:uno.css'
import '@/assets/style/custom.css'
import 'virtual:svg-icons-register'
import '@/assets/style/dark.css'
import '@/assets/style/transition.css'
import directives from '@/directives'
import { setupI18n } from '@/locales'

const pinia = createPinia()

createApp(App).use(setupI18n).use(router).use(directives).use(components).use(pinia).mount('#app')
