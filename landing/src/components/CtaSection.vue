<script setup lang="ts">
import { appUrl, guideUrl } from '../links'
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container inner" data-reveal>
      <h2 id="cta-title">Empieza a darle trabajo a tu dinero</h2>
      <div class="ctas">
        <a class="btn btn-primary" :href="appUrl">Abrir Cuenca</a>
        <a class="btn btn-ghost" :href="guideUrl">Lee la guía</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: clamp(2rem, 5vw, 4rem) clamp(4rem, 9vw, 7rem);
}

.inner {
  display: grid;
  justify-items: center;
  gap: 2rem;
  padding: clamp(2.5rem, 7vw, 5rem) 1.5rem;
  border: 1px solid var(--line);
  border-radius: calc(var(--radius) * 1.6);
  background: var(--water-soft);
  text-align: center;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.inner .btn-ghost {
  border-color: var(--ink);
}
</style>
