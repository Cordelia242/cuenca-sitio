import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// Preloads the Latin font files the first screen uses, so the swap happens before the first paint instead of shifting
// the hero once they arrive. Names come from the build, since Vite hashes them.
function preloadFonts(): Plugin {
  const wanted = /(instrument-serif-latin-400-(normal|italic)|inter-latin-wght-normal|space-grotesk-latin-wght-normal)-.*\.woff2$/
  let base = '/'
  return {
    name: 'preload-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => wanted.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `${base}${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          }))
      },
    },
  }
}

// The landing is served at the root of cuenca.app, so asset URLs start at /.
// https://vite.dev/config/shared-options.html#base
export default defineConfig({
  base: '/',
  plugins: [vue(), preloadFonts()],
})
