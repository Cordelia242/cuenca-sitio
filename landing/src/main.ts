import { createApp, createSSRApp } from 'vue'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/space-grotesk/wght.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/motion.css'
import App from './App.vue'

// The production build prerenders the page (scripts/prerender.mjs), so the client hydrates it; `npm run dev` mounts fresh.
const container = document.getElementById('app')
const app = container?.hasChildNodes() ? createSSRApp(App) : createApp(App)
app.mount('#app')
