import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import components from '@/components'
import 'virtual:uno.css'
import '@/assets/style/custom.css'
import 'virtual:svg-icons-register'
import '@/assets/style/dark.css'

const pinia = createPinia()

createApp(App).use(router).use(components).use(pinia).mount('#app')
