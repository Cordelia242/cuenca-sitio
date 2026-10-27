import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

// Used only at build time to prerender the page, so it reads fully without JavaScript.
export function render() {
  return renderToString(createSSRApp(App))
}
