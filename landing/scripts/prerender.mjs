// Injects the server-rendered markup into dist/index.html. Runs after `vite build` and `vite build --ssr`.
import { readFile, rm, writeFile } from 'node:fs/promises'

const ssrDir = new URL('../dist-ssr/', import.meta.url)
const indexFile = new URL('../dist/index.html', import.meta.url)

const { render } = await import(new URL('entry-server.js', ssrDir).href)
const markup = await render()
const template = await readFile(indexFile, 'utf8')
const placeholder = '<div id="app"></div>'
if (!template.includes(placeholder)) throw new Error(`Missing ${placeholder} in dist/index.html`)
await writeFile(indexFile, template.replace(placeholder, `<div id="app">${markup}</div>`))
await rm(ssrDir, { recursive: true, force: true })
console.log(`Prerendered dist/index.html (${markup.length} characters of markup)`)
