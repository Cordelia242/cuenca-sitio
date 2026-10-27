<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PhoneFrame from './mock/PhoneFrame.vue'
import AppRow from './mock/AppRow.vue'
import AppIcon from './mock/AppIcon.vue'
import { formatBs, useCountUp } from '../composables/useCountUp'
import { prefersReducedMotion } from '../composables/useInView'
import { appUrl, guideUrl } from '../links'

// Illustrative figures for the mock-up; the server renders the final state.
const AVAILABLE = 1050
const available = useCountUp(AVAILABLE)
// While `pending`, the new row is hidden and the others sit one row up; transforms only, so nothing shifts layout.
const pending = ref(false)
const play = ref(false)
let timer = 0

const headline = ['Todo', 'tu', 'dinero,', 'en', 'un', 'mismo']

onMounted(() => {
  if (prefersReducedMotion()) return
  play.value = true
  available.set(0)
  pending.value = true
  available.to(AVAILABLE, 1600, 700)
  timer = window.setTimeout(() => (pending.value = false), 2600)
})

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container grid">
      <div class="copy">
        <p class="label enter" style="--d: 0">Presupuesto personal, local-first</p>
        <h1 id="hero-title">
          <template v-for="(word, i) in headline" :key="word">
            <span class="word enter" :style="{ '--d': 80 + i * 60 }">{{ word }}</span>{{ ' ' }}
          </template>
          <span class="word enter" :style="{ '--d': 80 + headline.length * 60 }"><em>cauce</em>.</span>
        </h1>
        <p class="lede enter" style="--d: 520">
          Dale un trabajo a cada boliviano: decide a dónde va tu dinero antes de gastarlo y ten claro, en todo momento,
          cuánto te queda para lo que importa.
        </p>
        <div class="ctas enter" style="--d: 620">
          <a class="btn btn-primary" :href="appUrl">
            Abrir Cuenca
            <AppIcon class="arrow" name="arrowRight" />
          </a>
          <a class="btn btn-secondary" :href="guideUrl">Lee la guía</a>
        </div>
        <p class="note enter" style="--d: 700">
          App para Android y cliente web para computadora. <a href="#planes">Mira los planes</a>.
        </p>
      </div>

      <figure class="visual enter" style="--d: 300">
        <div
          class="stage"
          :class="{ play }"
          role="img"
          aria-label="Ejemplo ilustrativo de la pantalla Inicio de Cuenca: Disponible para asignar Bs 1.050,00, una línea de saldo, los botones Registrar y Asignar, y los movimientos recientes Almuerzo, Sueldo y Taxi."
        >
          <PhoneFrame title="Personal" tab="inicio">
            <div class="home">
              <p class="avail-label">Disponible para asignar</p>
              <p class="avail num">{{ formatBs(available.value.value) }}</p>
              <svg class="spark" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M2 74 C40 48 60 38 90 38 L190 38 C230 38 240 18 268 12 L298 6" />
                <circle cx="298" cy="6" r="4" />
              </svg>
              <div class="actions">
                <span class="a primary"><AppIcon name="plus" />Registrar</span>
                <span class="a"><AppIcon name="arrowDown" />Asignar</span>
              </div>
              <p class="list-title">Movimientos recientes</p>
              <div class="list card" :class="{ pending }">
                <AppRow class="new" icon="box" tone="yellow" title="Almuerzo" subtitle="Comida · Hoy" amount="−Bs 38,00" account="Billetera" />
                <AppRow class="rest" icon="arrowUp" tone="green" title="Sueldo" subtitle="Ingreso · Hoy" amount="+Bs 4.800,00" account="Banco" income />
                <AppRow class="rest" icon="truck" tone="yellow" title="Taxi" subtitle="Transporte · Ayer" amount="−Bs 25,00" account="Billetera" />
              </div>
            </div>
          </PhoneFrame>

          <div class="float card parallax" aria-hidden="true">
            <span class="tile violet"><AppIcon name="home" /></span>
            <span class="float-text">
              <span class="float-title">Alquiler</span>
              <span class="bar"><i></i></span>
            </span>
            <span class="num float-amount">Bs 1.500</span>
          </div>
        </div>
        <figcaption>Ejemplo ilustrativo</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(3rem, 7vw, 6rem) clamp(4rem, 8vw, 7rem);
}

.grid {
  display: grid;
  align-items: center;
  gap: clamp(3rem, 6vw, 5rem);
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

.copy {
  display: grid;
  justify-items: start;
  gap: var(--s6);
}

.word {
  display: inline-block;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s3);
  margin-top: var(--s2);
}

.note {
  color: var(--muted);
  font-size: 0.95rem;
}

.note a {
  color: var(--ink);
  text-underline-offset: 3px;
}

.visual {
  justify-self: center;
  margin: 0;
}

.visual figcaption {
  margin-top: var(--s5);
  color: var(--muted);
  font-size: var(--text-sm);
  text-align: center;
}

.stage {
  --phone-fs: clamp(11.5px, 3.3vw, 14px);
  position: relative;
}

.home {
  display: grid;
  gap: 0.2em;
  padding-top: 1.4em;
  text-align: center;
}

.avail-label {
  color: var(--ink-2);
  font-size: 0.95em;
}

.avail {
  font-size: 2.6em;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.spark {
  width: 100%;
  height: 4.6em;
  margin-block: 0.4em 0.6em;
  overflow: visible;
}

.spark path {
  fill: none;
  stroke: var(--ink);
  stroke-width: 2.5;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.spark circle {
  fill: var(--bg);
  stroke: var(--ink);
  stroke-width: 2.5;
  vector-effect: non-scaling-stroke;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7em;
}

.a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  height: 3.1em;
  border-radius: 1.1em;
  background: var(--soft);
  font-family: var(--font-ui);
  font-weight: 600;
}

.a svg {
  width: 1.1em;
}

.a.primary {
  background: var(--primary);
  color: var(--on-primary);
}

.list-title {
  margin-top: 1.2em;
  font-family: var(--font-ui);
  font-weight: 600;
  text-align: left;
}

.list {
  margin-top: 0.4em;
  overflow: hidden;
  border-radius: 1.4em;
  text-align: left;
}


/* Floating budget card from the Plan screen. */
.float {
  --drift: 24px;
  position: absolute;
  bottom: 12%;
  left: -72%;
  display: none;
  align-items: center;
  gap: 0.8rem;
  width: 15.5rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-raised);
  font-size: 0.9rem;
}

@media (min-width: 1100px) {
  .float {
    display: flex;
  }
}

.float-text {
  display: grid;
  flex: 1;
  gap: 0.45rem;
}

.float-title {
  font-family: var(--font-ui);
  font-weight: 600;
}

.float-amount {
  font-weight: 600;
}

.bar {
  display: block;
  height: 0.3rem;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--soft);
}

.bar i {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--tile-violet);
  transform-origin: left;
}

@media (prefers-reduced-motion: no-preference) {
  .play .spark path {
    stroke-dasharray: 1;
    animation: draw 1.6s var(--ease-out) 700ms both;
  }

  .play .spark circle {
    animation: pop var(--dur-3) var(--ease-out) 2.1s both;
  }

  .list .new,
  .list .rest {
    transition:
      transform 640ms var(--ease-out),
      opacity var(--dur-3) var(--ease-out) 200ms;
  }

  .list.pending .new {
    opacity: 0;
    transition: none;
  }

  .list.pending .rest {
    transform: translateY(-100%);
    transition: none;
  }

  .play .bar i {
    animation: grow 1.2s var(--ease-out) 1.2s both;
  }

  @keyframes draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0);
    }
  }

  @keyframes grow {
    from {
      transform: scaleX(0);
    }
  }
}

.spark circle {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
