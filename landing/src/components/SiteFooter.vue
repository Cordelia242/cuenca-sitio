<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import { appUrl, guideUrl } from '../links'

const year = new Date().getFullYear()
const repoUrl = 'https://github.com/Cordelia242/cuenca-sitio'
</script>

<template>
  <footer class="footer">
    <div class="container wrap">
      <div class="about">
        <div class="brand">
          <BrandMark />
          <span class="brand-name">cuenca</span>
        </div>
        <p>Todo tu dinero, en un mismo cauce.</p>
      </div>
      <nav aria-label="Pie de página">
        <ul>
          <li><a :href="appUrl">Abrir Cuenca</a></li>
          <li><a :href="guideUrl">Guía de uso</a></li>
          <li><a :href="repoUrl">Código del sitio</a></li>
        </ul>
      </nav>
      <p class="copy">© {{ year }} Cuenca</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 2.5rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem 3rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--ink);
}

.brand-name {
  font-family: var(--display);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.about p {
  margin-top: 0.5rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

a:hover {
  color: var(--ink);
}

.copy {
  flex-basis: 100%;
  font-size: 0.9rem;
}
</style>
