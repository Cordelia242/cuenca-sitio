<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { appUrl, guideUrl } from '../links'

const budgets = [
  { name: 'Alquiler', amount: 2000, fill: 100 },
  { name: 'Comida', amount: 1400, fill: 70 },
  { name: 'Transporte', amount: 600, fill: 30 },
  { name: 'Ahorro', amount: 800, fill: 40 },
]

const start = 4800
const available = ref(0)
let frame = 0

function format(value: number) {
  return `Bs ${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

// Counts down once; with reduced motion the final state (Bs 0) is shown directly.
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  available.value = start
  const delay = 700
  const duration = 3200
  const t0 = performance.now()
  const tick = (now: number) => {
    const p = Math.min(Math.max((now - t0 - delay) / duration, 0), 1)
    available.value = start * (1 - p)
    if (p < 1) frame = requestAnimationFrame(tick)
    else available.value = 0
  }
  frame = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container grid">
      <div class="copy">
        <p class="eyebrow">Presupuesto personal, local-first</p>
        <h1 id="hero-title">Todo tu dinero, en un mismo cauce.</h1>
        <p class="lede">
          Dale un trabajo a cada boliviano: decide a dónde va tu dinero antes de gastarlo y ten claro,
          en todo momento, cuánto te queda para lo que importa.
        </p>
        <div class="ctas">
          <a class="btn btn-primary" :href="appUrl">Abrir Cuenca</a>
          <a class="btn btn-ghost" :href="guideUrl">Lee la guía</a>
        </div>
        <p class="note">App para Android y cliente web para computadora.</p>
      </div>

      <figure class="device">
        <div class="card" role="img" aria-label="Ejemplo ilustrativo: Disponible para asignar Bs 0, con cuatro presupuestos llenos: Alquiler Bs 2.000, Comida Bs 1.400, Transporte Bs 600 y Ahorro Bs 800.">
          <p class="avail-label">Disponible para asignar</p>
          <p class="avail-value">{{ format(available) }}</p>
          <ul class="basins">
            <li v-for="(b, i) in budgets" :key="b.name">
              <div class="row">
                <span>{{ b.name }}</span>
                <span class="amt">{{ format(b.amount) }}</span>
              </div>
              <div class="track">
                <div class="fill" :style="{ '--w': `${b.fill}%`, '--d': `${0.7 + i * 0.35}s` }"></div>
              </div>
            </li>
          </ul>
        </div>
        <figcaption>Ejemplo ilustrativo</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3rem, 8vw, 6.5rem);
}

.grid {
  position: relative;
  display: grid;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 4rem);
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.note {
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.device {
  justify-self: center;
  width: min(100%, 24rem);
  margin: 0;
}

.device figcaption {
  margin-top: 0.75rem;
  color: var(--muted);
  font-size: 0.85rem;
  text-align: center;
}

.card {
  position: relative;
  padding: 1.5rem 1.25rem 1.25rem;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: var(--surface);
  box-shadow: 0 30px 60px -30px rgb(17 17 17 / 0.25);
}

.avail-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.avail-value {
  font-family: var(--display);
  font-size: clamp(2.4rem, 9vw, 3.2rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.basins {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.amt {
  color: var(--muted);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.track {
  height: 0.7rem;
  margin-top: 0.4rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--accent-soft);
}

.fill {
  width: var(--w);
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
}

@media (prefers-reduced-motion: no-preference) {
  .fill {
    transform-origin: left;
    animation: rise 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d) both;
  }

  @keyframes rise {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
}
</style>
