import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages serves this project under /cuenca-sitio/, so every asset URL needs that prefix.
// https://vite.dev/config/shared-options.html#base
export default defineConfig({
  base: '/cuenca-sitio/',
  plugins: [vue()],
})
