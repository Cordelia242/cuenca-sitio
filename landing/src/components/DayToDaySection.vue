<script setup lang="ts">
const moments = [
  {
    when: 'Antes de pagar el almuerzo',
    text: 'Miras tu presupuesto Comida y sabes si alcanza, sin hacer cuentas en la cabeza.',
  },
  {
    when: 'Cuando te pasas',
    text: 'No pasa nada: cubres el sobregasto moviendo dinero desde otro presupuesto, y el plan sigue cuadrando.',
  },
  {
    when: 'A fin de mes',
    text: 'Las cuotas, el alquiler y los servicios ya tenían su dinero apartado; las metas avanzan solas.',
  },
  {
    when: 'Con quien vives',
    text: 'Compartes un espacio, registran juntos y Cuenca muestra quién debe cuánto.',
  },
]
</script>

<template>
  <section id="dia-a-dia" class="section" aria-labelledby="dia-title">
    <div class="container">
      <div data-reveal>
        <p class="eyebrow">Día a día</p>
        <h2 id="dia-title">Lo que cambia en tu día a día</h2>
        <p class="lede">El cambio no es anotar gastos: es decidir antes a dónde va tu dinero.</p>
      </div>
      <ol class="moments">
        <li v-for="(m, i) in moments" :key="m.when" class="moment" data-reveal :style="{ '--i': i }">
          <svg class="ripple" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="24" cy="24" r="6" />
            <circle cx="24" cy="24" r="13" opacity="0.6" />
            <circle cx="24" cy="24" r="21" opacity="0.3" />
          </svg>
          <h3>{{ m.when }}</h3>
          <p>{{ m.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.moments {
  display: grid;
  gap: 1.25rem;
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 700px) {
  .moments {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .moments {
    grid-template-columns: repeat(4, 1fr);
  }
}

.moment {
  position: relative;
  overflow: hidden;
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.moment:nth-child(even) {
  background: var(--surface-2);
}

.ripple {
  position: absolute;
  top: -0.6rem;
  right: -0.6rem;
  width: 5rem;
  color: var(--water);
  opacity: 0.5;
}

.moment h3 {
  position: relative;
  max-width: calc(100% - 3.25rem);
  color: var(--clay);
}

.moment p {
  margin-top: 0.75rem;
  color: var(--muted);
}
</style>
