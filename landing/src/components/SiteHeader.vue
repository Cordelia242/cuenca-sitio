<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import { appUrl, guideUrl } from '../links'

const links = [
  { href: '#dia-a-dia', label: 'Día a día' },
  { href: '#funciones', label: 'Funciones' },
  { href: '#plataformas', label: 'Teléfono y web' },
  { href: '#privacidad', label: 'Privacidad' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#planes', label: 'Planes' },
]
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <a class="brand" href="#" aria-label="Cuenca, inicio">
        <BrandMark />
        <span class="brand-name">cuenca</span>
      </a>
      <nav class="nav" aria-label="Principal">
        <ul class="anchors">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
        <div class="actions">
          <a class="btn btn-ghost guide" :href="guideUrl">Lee la guía</a>
          <a class="btn btn-primary" :href="appUrl">Abrir Cuenca</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.brand-name {
  font-family: var(--display);
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.anchors {
  display: none;
  margin: 0;
  padding: 0;
  gap: 1.4rem;
  list-style: none;
}

.anchors a {
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
}

.anchors a:hover {
  color: var(--ink);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  min-height: 2.5rem;
  padding: 0.45rem 1rem;
  font-size: 0.95rem;
}

.guide {
  display: none;
}

@media (min-width: 540px) {
  .guide {
    display: inline-flex;
  }
}

@media (min-width: 1040px) {
  .anchors {
    display: flex;
  }
}
</style>
