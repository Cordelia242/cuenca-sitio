import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// The landing is served at the root of cuenca.app, so asset URLs start at /.
// https://vite.dev/config/shared-options.html#base
export default defineConfig({
  base: '/',
  plugins: [vue()],
})
