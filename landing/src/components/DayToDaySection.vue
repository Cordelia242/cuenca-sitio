<script setup lang="ts">
import AppIcon from './mock/AppIcon.vue'
import type { IconName } from './mock/icons'

const moments: { when: string; text: string; icon: IconName; tone: string }[] = [
  {
    when: 'Antes de pagar el almuerzo',
    text: 'Miras tu presupuesto Comida y sabes si alcanza, sin hacer cuentas en la cabeza.',
    icon: 'box',
    tone: 'yellow',
  },
  {
    when: 'Cuando te pasas',
    text: 'No pasa nada: cubres el sobregasto moviendo dinero desde otro presupuesto, y el plan sigue cuadrando.',
    icon: 'swap',
    tone: 'blue',
  },
  {
    when: 'A fin de mes',
    text: 'Las cuotas, el alquiler y los servicios ya tenían su dinero apartado; las metas avanzan solas.',
    icon: 'home',
    tone: 'violet',
  },
  {
    when: 'Con quien vives',
    text: 'Compartes un espacio, registran juntos y Cuenca muestra quién debe cuánto.',
    icon: 'users',
    tone: 'green',
  },
]
</script>

<template>
  <section id="dia-a-dia" class="section" aria-labelledby="dia-title">
    <div class="container layout">
      <div class="section-head head" data-reveal>
        <p class="label">Día a día</p>
        <h2 id="dia-title">Lo que cambia en tu <em>día a día</em></h2>
        <p class="lede">El cambio no es anotar gastos: es decidir antes a dónde va tu dinero.</p>
      </div>
      <ol class="moments card">
        <li v-for="(m, i) in moments" :key="m.when" class="moment" data-reveal :style="{ '--i': i }">
          <span class="tile" :class="m.tone"><AppIcon :name="m.icon" /></span>
          <div>
            <h3>{{ m.when }}</h3>
            <p>{{ m.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: start;
  }

  .head {
    position: sticky;
    top: calc(var(--header-h) + 3rem);
  }
}

.moments {
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: var(--radius-xl);
  list-style: none;
}

.moment {
  display: flex;
  gap: var(--s4);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  transition: background-color var(--dur-2) var(--ease-out);
}

.moment + .moment {
  border-top: 1px solid var(--line);
}

.moment:hover {
  background: var(--sunken);
}

.moment .tile {
  transition: transform var(--dur-3) var(--ease-out);
}

.moment:hover .tile {
  transform: scale(1.08) rotate(-4deg);
}

.moment p {
  margin-top: var(--s1);
  color: var(--ink-2);
}

@media (prefers-reduced-motion: reduce) {
  .moment:hover .tile {
    transform: none;
  }
}
</style>
