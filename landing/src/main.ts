import { createApp } from 'vue'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import './styles/base.css'
import App from './App.vue'

document.documentElement.classList.add('js')

createApp(App).mount('#app')
