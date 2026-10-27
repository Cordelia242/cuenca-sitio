<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PhoneFrame from './mock/PhoneFrame.vue'
import AppIcon from './mock/AppIcon.vue'
import type { IconName } from './mock/icons'
import { formatBs, useCountUp } from '../composables/useCountUp'

const steps = [
  'Registra tus cuentas y tu dinero.',
  'Asigna cada boliviano a un presupuesto hasta que «Disponible para asignar» llegue a Bs 0.',
  'Registra tus gastos (a mano, con un atajo o con tu voz).',
  'Ajusta sobre la marcha: mueve dinero cuando la vida cambia.',
]

// Illustrative screen state for each step: available amount, what is left in each budget, and a status line.
const budgets: { name: string; icon: IconName; tone: string }[] = [
  { name: 'Alquiler', icon: 'home', tone: 'violet' },
  { name: 'Comida', icon: 'box', tone: 'yellow' },
  { name: 'Transporte', icon: 'truck', tone: 'yellow' },
  { name: 'Ahorro', icon: 'flag', tone: 'green' },
]
const states = [
  { available: 4800, left: [0, 0, 0, 0], status: 'Billetera Bs 1.200 · Banco Bs 3.600', icon: 'wallet' },
  { available: 0, left: [2000, 1400, 600, 800], status: 'Todo tu dinero tiene un trabajo', icon: 'check' },
  { available: 0, left: [2000, 980, 600, 800], status: 'Supermercado −Bs 420,00 en Comida', icon: 'box' },
  { available: 0, left: [2000, 1180, 400, 800], status: 'Movido Bs 200 de Transporte a Comida', icon: 'swap' },
] as const
const SCALE = 2000

// The server renders the last step, which is also what readers without JS see next to the full list.
const FIRST = states[0]
const FINAL = states[3]
const active = ref(states.length - 1)
const state = computed(() => states[active.value] ?? FINAL)
const available = useCountUp(FINAL.available)
const left = budgets.map((_, i) => useCountUp(FINAL.left[i] ?? 0))

watch(active, () => {
  available.to(state.value.available, 700)
  left.forEach((count, i) => count.to(state.value.left[i] ?? 0, 700))
})

const stepEls = ref<HTMLElement[]>([])
// Set once the observer drives the steps; only then are inactive steps dimmed.
const ready = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  ready.value = true
  active.value = 0
  available.set(FIRST.available)
  left.forEach((count, i) => count.set(FIRST.left[i] ?? 0))
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = Number((entry.target as HTMLElement).dataset.step)
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  stepEls.value.forEach((el) => observer?.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section id="como-funciona" class="section how" aria-labelledby="como-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="label">Paso a paso</p>
        <h2 id="como-title">Cómo <em>funciona</em></h2>
      </div>

      <div class="story" :class="{ ready }">
        <div class="pin">
          <div
            class="stage"
            role="img"
            aria-label="Ejemplo ilustrativo de la pantalla Planes: Disponible para asignar y cuatro presupuestos, Alquiler, Comida, Transporte y Ahorro, que cambian con cada paso."
          >
            <PhoneFrame title="Planes" tab="planes">
              <div class="plan">
                <p class="month">Este mes</p>
                <p class="avail-label">Disponible para asignar</p>
                <p class="avail num">{{ formatBs(available.value.value) }}</p>
                <span class="assign"><AppIcon name="plus" />Asignar</span>
                <div class="list card">
                  <div v-for="(b, i) in budgets" :key="b.name" class="budget">
                    <span class="tile" :class="b.tone"><AppIcon :name="b.icon" /></span>
                    <span class="main">
                      <span class="name">{{ b.name }}</span>
                      <span class="track"><i :style="{ transform: `scaleX(${(left[i]?.value.value ?? 0) / SCALE})` }"></i></span>
                    </span>
                    <span class="num amount">{{ formatBs(left[i]?.value.value ?? 0, 0) }}</span>
                  </div>
                </div>
                <Transition name="status" mode="out-in">
                  <p :key="active" class="status">
                    <AppIcon :name="state.icon" />
                    {{ state.status }}
                  </p>
                </Transition>
              </div>
            </PhoneFrame>
          </div>
        </div>

        <ol class="steps">
          <li
            v-for="(s, i) in steps"
            :key="s"
            ref="stepEls"
            class="step"
            :class="{ on: active === i }"
            :data-step="i"
            :aria-current="active === i ? 'step' : undefined"
          >
            <span class="n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <p>{{ s }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  display: grid;
  gap: var(--s7);
  margin-top: clamp(2.5rem, 5vw, 4rem);
}

.pin {
  display: none;
}

.steps {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.step {
  display: grid;
  gap: var(--s3);
  padding-block: var(--s6);
  border-top: 1px solid var(--line);
}

.n {
  color: var(--amber);
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 1;
}

.step p {
  max-width: 32ch;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.4vw + 0.8rem, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

/* Pinned storytelling: the phone stays while the steps scroll past. */
@media (min-width: 960px) {
  .story {
    grid-template-columns: 0.9fr 1.1fr;
    gap: clamp(3rem, 6vw, 6rem);
  }

  .pin {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
    display: grid;
    place-items: center;
    align-self: start;
    height: calc(100vh - var(--header-h) - 4rem);
  }

  .stage {
    --phone-fs: clamp(11px, 1.6vh, 14px);
  }

  .step {
    align-content: center;
    min-height: 70vh;
    border-top: 0;
  }

  /* Inactive steps step back; the colour keeps AA contrast. */
  .ready .step p {
    color: var(--muted);
    transition: color var(--dur-3) var(--ease-in-out);
  }

  .ready .step .n {
    color: var(--line-strong);
    transition: color var(--dur-3) var(--ease-in-out);
  }

  .ready .step.on p {
    color: var(--ink);
  }

  .ready .step.on .n {
    color: var(--amber);
  }
}

.plan {
  display: grid;
  gap: 0.25em;
  padding-top: 0.6em;
  text-align: center;
}

.month {
  font-family: var(--font-ui);
  font-weight: 600;
}

.avail-label {
  margin-top: 0.8em;
  color: var(--ink-2);
  font-size: 0.95em;
}

.avail {
  font-size: 2.5em;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.assign {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  height: 3em;
  margin-top: 0.6em;
  border-radius: 1.1em;
  background: var(--primary);
  color: var(--on-primary);
  font-family: var(--font-ui);
  font-weight: 600;
}

.assign svg {
  width: 1.1em;
}

.list {
  margin-top: 1em;
  overflow: hidden;
  border-radius: 1.4em;
  text-align: left;
}

.budget {
  display: flex;
  align-items: center;
  gap: 0.8em;
  padding: 0.75em 0.9em;
}

.budget + .budget {
  border-top: 1px solid var(--line);
}

.budget .tile {
  width: 2.4em;
  height: 2.4em;
  border-radius: 0.7em;
}

.budget .tile svg {
  width: 1.2em;
  height: 1.2em;
}

.main {
  display: grid;
  flex: 1;
  gap: 0.4em;
}

.name {
  font-family: var(--font-ui);
  font-weight: 600;
}

.amount {
  min-width: 4.8em;
  font-weight: 600;
  text-align: right;
}

.track {
  display: block;
  height: 0.32em;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--soft);
}

.track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--amber-fill);
  transform-origin: left;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  margin-top: 1em;
  padding: 0.8em 1em;
  border-radius: 1.2em;
  background: var(--soft);
  font-size: 0.9em;
  font-weight: 500;
}

.status svg {
  flex: none;
  width: 1.1em;
}

.status-enter-active,
.status-leave-active {
  transition:
    opacity var(--dur-3) var(--ease-out),
    transform var(--dur-3) var(--ease-out);
}

.status-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.status-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .status-enter-from,
  .status-leave-to {
    transform: none;
  }
}
</style>
