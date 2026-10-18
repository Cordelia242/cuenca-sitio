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
    <svg class="contours" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="var(--water)" stroke-width="1.5">
        <path d="M-20 520C180 430 300 560 520 500s360-170 560-110 160 60 200 30" />
        <path d="M-20 470C170 380 310 510 520 450s370-150 560-95 170 50 200 20" />
        <path d="M-20 420C160 330 320 460 520 400s380-130 560-80 180 40 200 10" />
        <path d="M-20 370C150 280 330 410 520 350s390-110 560-65 190 30 200 0" />
        <path d="M-20 320C140 230 340 360 520 300s400-90 560-50 200 20 200-10" />
        <path d="M-20 270C130 180 350 310 520 250s410-70 560-35 210 10 200-20" />
      </g>
    </svg>

    <div class="container grid">
      <div class="copy">
        <p class="eyebrow">Presupuesto personal, local-first</p>
        <h1>Dale un trabajo a cada boliviano.</h1>
        <p class="lede">
          Cuenca te ayuda a decidir a dónde va tu dinero antes de gastarlo: asignas cada boliviano a un presupuesto y
          sabes, en todo momento, cuánto te queda para lo que importa.
        </p>
        <div class="ctas">
          <a class="btn btn-primary" :href="appUrl">Abrir Cuenca</a>
          <a class="btn btn-ghost" :href="guideUrl">Lee la guía</a>
        </div>
        <p class="note">App para Android y cliente web para computadora.</p>
      </div>

      <figure class="device" role="img" aria-label="Ejemplo ilustrativo: Disponible para asignar Bs 0, con cuatro presupuestos llenos: Alquiler Bs 2.000, Comida Bs 1.400, Transporte Bs 600 y Ahorro Bs 800.">
        <div class="card" aria-hidden="true">
          <svg class="drops" viewBox="0 0 300 60">
            <path v-for="(x, i) in [40, 110, 190, 255]" :key="x" class="drop" :style="{ '--d': `${i * 0.55}s` }" :transform="`translate(${x} 4)`" d="M0 0c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
          </svg>
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

.contours {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.16;
  pointer-events: none;
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
  box-shadow: 0 30px 60px -30px rgb(27 40 38 / 0.35);
}

.drops {
  display: block;
  width: 100%;
  height: 3rem;
  margin-top: -0.5rem;
}

.drop {
  fill: var(--water);
}

.avail-label {
  color: var(--muted);
  font-size: 0.9rem;
}

.avail-value {
  font-family: var(--display);
  font-size: clamp(2.4rem, 9vw, 3.2rem);
  font-weight: 700;
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
  background: var(--water-soft);
}

.fill {
  width: var(--w);
  height: 100%;
  border-radius: inherit;
  background: var(--water);
}

@media (prefers-reduced-motion: no-preference) {
  .drop {
    opacity: 0;
    animation: fall 2.4s ease-in 0.2s 3 both;
    animation-delay: var(--d);
  }

  .fill {
    transform-origin: left;
    animation: rise 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d) both;
  }

  @keyframes fall {
    0% {
      opacity: 0;
      translate: 0 -6px;
    }
    20% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
      translate: 0 46px;
    }
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
