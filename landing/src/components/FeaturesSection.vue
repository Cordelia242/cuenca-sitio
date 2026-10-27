<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from './mock/AppIcon.vue'
import type { IconName } from './mock/icons'
import { formatBs, useCountUp } from '../composables/useCountUp'
import { prefersReducedMotion, useInView } from '../composables/useInView'

const features: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'Metas',
    text: 'Aparta un monto, rellena hasta un tope o mantén un saldo, con fecha límite si la necesitas.',
    icon: 'flag',
  },
  {
    title: 'Movimientos y programadas',
    text: 'Gastos, ingresos y transferencias, divididos entre presupuestos, con etiquetas; pagos que se repiten, con un calendario en la web.',
    icon: 'swap',
  },
  {
    title: 'Espacios compartidos',
    text: 'Invita con un código de un solo uso, registren gastos en común y vean los saldos entre personas.',
    icon: 'users',
  },
  {
    title: 'Préstamos',
    text: 'Lo que debes y lo que te deben, con tabla de amortización, abonos extraordinarios y simulador; exporta la tabla a Excel o PDF.',
    icon: 'receipt',
  },
  {
    title: 'Asistente de voz y atajos',
    text: 'Dicta un gasto y revísalo antes de guardarlo; usa tu propia clave de Google Gemini. Los atajos registran un movimiento con un toque.',
    icon: 'mic',
  },
  {
    title: 'Importa y respalda',
    text: 'Importa el CSV de tu banco con detección de duplicados; exporta un respaldo o un CSV cuando quieras.',
    icon: 'download',
  },
]

// Illustrative plan for the lead card. The server renders the assigned state (Bs 0 available, full bars).
const budgets = [
  { name: 'Alquiler', amount: 2000, fill: 1, icon: 'home', tone: 'violet' },
  { name: 'Comida', amount: 1400, fill: 0.7, icon: 'box', tone: 'yellow' },
  { name: 'Transporte', amount: 600, fill: 0.3, icon: 'truck', tone: 'yellow' },
  { name: 'Ahorro', amount: 800, fill: 0.4, icon: 'flag', tone: 'green' },
] as const
const TOTAL = budgets.reduce((sum, b) => sum + b.amount, 0)

// Illustrative bars for the reports card (relative heights, no real data).
const bars = [0.42, 0.66, 0.5, 0.82, 0.58, 0.74, 0.9]

const lead = ref<HTMLElement | null>(null)
const inView = useInView(lead)
const available = useCountUp(0)
const armed = ref(false)
const wide = ref<HTMLElement | null>(null)
const wideInView = useInView(wide)
const chartArmed = ref(false)

watch(inView, (seen) => {
  if (!seen || prefersReducedMotion()) return
  armed.value = true
  available.set(TOTAL)
  available.to(0, 1400, 150)
})

watch(wideInView, (seen) => {
  if (seen && !prefersReducedMotion()) chartArmed.value = true
})
</script>

<template>
  <section id="funciones" class="section features" aria-labelledby="funciones-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="label">Funciones</p>
        <h2 id="funciones-title">Todo lo que necesitas para llevar tu <em>plan</em></h2>
        <p class="lede">Bolivianos por defecto; también USD y EUR.</p>
      </div>

      <ul class="bento">
        <li ref="lead" class="card item lead" data-reveal>
          <div class="text">
            <span class="tile"><AppIcon name="target" /></span>
            <h3>Presupuesto base cero</h3>
            <p>
              Todo lo que registras aparece en «Disponible para asignar» hasta que le das un trabajo. Grupos de
              presupuestos y auto-asignar el mes.
            </p>
          </div>
          <div class="plan" :class="{ armed }" aria-hidden="true">
            <p class="plan-label">Disponible para asignar</p>
            <p class="plan-value num">{{ formatBs(available.value.value) }}</p>
            <div class="plan-list">
              <div v-for="(b, i) in budgets" :key="b.name" class="budget" :style="{ '--i': i, '--fill': b.fill }">
                <span class="tile" :class="b.tone"><AppIcon :name="b.icon" /></span>
                <span class="budget-main">
                  <span class="budget-name">{{ b.name }}</span>
                  <span class="track"><i></i></span>
                </span>
                <span class="num budget-amount">{{ formatBs(b.amount, 0) }}</span>
              </div>
            </div>
          </div>
        </li>

        <li v-for="(f, i) in features" :key="f.title" class="card item" data-reveal :style="{ '--i': (i % 2) + 1 }">
          <span class="tile"><AppIcon :name="f.icon" /></span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </li>

        <li ref="wide" class="card item wide" data-reveal style="--i: 1">
          <div class="text">
            <span class="tile"><AppIcon name="chart" /></span>
            <h3>Reportes y tableros</h3>
            <p>Arma tus propios gráficos o usa los listos: gasto por presupuesto, flujo neto, tendencias.</p>
          </div>
          <div class="chart" :class="{ armed: chartArmed }" aria-hidden="true">
            <i v-for="(h, i) in bars" :key="i" :style="{ '--h': h, '--i': i }"></i>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.features {
  border-block: 1px solid var(--line);
  background: var(--sunken);
}

.bento {
  display: grid;
  gap: var(--s4);
  margin: clamp(2.5rem, 5vw, 4rem) 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 700px) {
  .bento {
    grid-template-columns: repeat(2, 1fr);
  }

  .lead,
  .wide {
    grid-column: span 2;
  }
}

@media (min-width: 1100px) {
  .bento {
    grid-template-columns: repeat(4, 1fr);
  }

  .lead {
    grid-row: span 2;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  transition:
    transform var(--dur-3) var(--ease-out),
    border-color var(--dur-2) var(--ease-out),
    box-shadow var(--dur-3) var(--ease-out);
}

.item:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
}

.item .tile {
  margin-bottom: var(--s2);
  transition:
    background-color var(--dur-2) var(--ease-out),
    color var(--dur-2) var(--ease-out);
}

.item:hover > .tile,
.item:hover .text > .tile {
  background: var(--amber-soft);
  color: var(--amber);
}

.item p {
  color: var(--ink-2);
  font-size: 0.98rem;
}

.text {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
}

.lead {
  gap: var(--s7);
}

.lead,
.wide {
  justify-content: space-between;
}

/* Mini Plan screen. */
.plan {
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--bg);
  text-align: center;
}

.plan-label {
  color: var(--ink-2);
  font-size: 0.85rem;
}

.plan .plan-value {
  font-size: clamp(1.9rem, 3vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.plan-list {
  display: grid;
  margin-top: var(--s4);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface);
  text-align: left;
}

.budget {
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: 0.65rem 0.8rem;
  font-size: 0.88rem;
}

.budget + .budget {
  border-top: 1px solid var(--line);
}

.budget .tile {
  width: 2rem;
  height: 2rem;
  margin: 0;
  border-radius: 8px;
}

.budget .tile svg {
  width: 1rem;
  height: 1rem;
}

.budget-main {
  display: grid;
  flex: 1;
  gap: 0.35rem;
}

.budget-name {
  font-family: var(--font-ui);
  font-weight: 600;
}

.budget-amount {
  font-weight: 600;
}

.track {
  display: block;
  height: 0.28rem;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--soft);
}

.track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--amber-fill);
  transform: scaleX(var(--fill));
  transform-origin: left;
}

/* Bars of the reports card. */
.chart {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 7rem;
  padding-top: var(--s4);
}

.chart i {
  flex: 1;
  height: 100%;
  border-radius: 6px 6px 2px 2px;
  background: var(--soft);
  transform: scaleY(var(--h));
  transform-origin: bottom;
}

.chart i:last-child {
  background: var(--amber-fill);
}

@media (min-width: 700px) {
  .wide {
    flex-direction: row;
    align-items: flex-end;
    gap: var(--s7);
  }

  .wide .text {
    flex: 1;
  }

  .chart {
    flex: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .armed .track i {
    animation: fill-x var(--dur-slow) var(--ease-out) calc(200ms + var(--i) * var(--stagger)) both;
  }

  .armed.chart i {
    animation: fill-y var(--dur-reveal) var(--ease-out) calc(300ms + var(--i) * 50ms) both;
  }

  @keyframes fill-x {
    from {
      transform: scaleX(0);
    }
  }

  @keyframes fill-y {
    from {
      transform: scaleY(0.04);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .item,
  .item:hover {
    transform: none;
  }
}
</style>
