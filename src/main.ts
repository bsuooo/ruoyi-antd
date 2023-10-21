import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import components from '@/components'
import 'virtual:uno.css'

const pinia = createPinia()

createApp(App).use(router).use(components).use(pinia).mount('#app')
