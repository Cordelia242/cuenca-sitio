<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import { appUrl, guideUrl, privacyPolicyUrl, siteRepoUrl } from '../links'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container wrap">
      <div class="about">
        <div class="brand">
          <BrandMark />
          <span class="brand-name">cuenca</span>
        </div>
        <p class="motto">Todo tu dinero, en un mismo cauce.</p>
      </div>
      <nav aria-label="Pie de página">
        <ul>
          <li><a :href="appUrl">Abrir Cuenca</a></li>
          <li><a :href="guideUrl">Guía de uso</a></li>
          <li><a :href="privacyPolicyUrl">Política de privacidad</a></li>
          <li><a :href="siteRepoUrl">Código del sitio</a></li>
        </ul>
      </nav>
      <p class="copy">© {{ year }} Cuenca</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--s9) var(--s8);
  border-top: 1px solid var(--line);
  color: var(--muted);
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s6) var(--s9);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--ink);
}

.brand-name {
  font-family: var(--font-ui);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.motto {
  margin-top: var(--s3);
  color: var(--ink-2);
  font-family: var(--font-display);
  font-size: 1.35rem;
}

ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2) var(--s6);
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition:
    color var(--dur-2) var(--ease-out),
    text-decoration-color var(--dur-2) var(--ease-out);
}

a:hover {
  color: var(--ink);
  text-decoration-color: var(--amber-fill);
}

.copy {
  flex-basis: 100%;
  font-size: 0.9rem;
}
</style>
