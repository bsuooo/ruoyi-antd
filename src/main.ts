import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import components from '@/components'
import 'virtual:uno.css'
import '@/assets/style/custom.css'
import 'virtual:svg-icons-register'
import '@/assets/style/dark.css'
import microApp from '@micro-zoe/micro-app'

const pinia = createPinia()
microApp.start()
createApp(App).use(router).use(components).use(pinia).mount('#app')
