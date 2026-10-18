<script setup lang="ts">
// BASE_URL is Vite's `base` ("/cuenca-sitio/"), so the guide link resolves under the Pages subpath.
const guideUrl = `${import.meta.env.BASE_URL}guia/`
const appUrl = 'https://cuenca.symm3try.net'
</script>

<template>
  <main class="hero">
    <h1>Cuenca</h1>
    <p>Presupuesta tu día a día.</p>
    <nav class="actions">
      <a class="primary" :href="appUrl">Abrir la app</a>
      <a :href="guideUrl">Leer la guía de uso</a>
    </nav>
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
  font-family: system-ui, sans-serif;
}

body {
  margin: 0;
}
</style>

<style scoped>
.hero {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: clamp(2.5rem, 8vw, 4rem);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.actions a {
  padding: 0.6rem 1.2rem;
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  color: inherit;
  text-decoration: none;
}

.actions a.primary {
  background: #2e7d6b;
  border-color: #2e7d6b;
  color: #fff;
}
</style>
