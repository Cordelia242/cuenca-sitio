<script setup lang="ts">
const features = [
  {
    title: 'Presupuesto base cero',
    text: 'Todo lo que registras aparece en «Disponible para asignar» hasta que le das un trabajo. Grupos de presupuestos y auto-asignar el mes.',
    icon: 'M12 3v18M3 12h18M7 7l10 10M17 7 7 17',
  },
  {
    title: 'Metas',
    text: 'Aparta un monto, rellena hasta un tope o mantén un saldo, con fecha límite si la necesitas.',
    icon: 'M5 21V4M5 4h12l-2.5 4L17 12H5',
  },
  {
    title: 'Movimientos y programadas',
    text: 'Gastos, ingresos y transferencias, divididos entre presupuestos, con etiquetas; pagos que se repiten, en un calendario.',
    icon: 'M4 7h13l-3-3M20 17H7l3 3M4 12h16',
  },
  {
    title: 'Espacios compartidos',
    text: 'Invita con un código de un solo uso, registren gastos en común y vean los saldos entre personas.',
    icon: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 10a2.5 2.5 0 1 0 0-5M17.5 14c2.2.4 3.5 2.4 3.5 6',
  },
  {
    title: 'Préstamos',
    text: 'Lo que debes y lo que te deben, con tabla de amortización, abonos extraordinarios y simulador; exporta la tabla a Excel o PDF.',
    icon: 'M4 6h16v12H4zM4 10h16M8 14h3',
  },
  {
    title: 'Reportes y tableros',
    text: 'Arma tus propios gráficos o usa los listos: gasto por presupuesto, flujo neto, tendencias.',
    icon: 'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',
  },
  {
    title: 'Asistente de voz y atajos',
    text: 'Dicta un gasto y revísalo antes de guardarlo; usa tu propia clave de Google Gemini. Los atajos registran un movimiento con un toque.',
    icon: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4',
  },
  {
    title: 'Importa y respalda',
    text: 'Importa el CSV de tu banco con detección de duplicados; exporta un respaldo o un CSV cuando quieras.',
    icon: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  },
]
</script>

<template>
  <section id="funciones" class="section features" aria-labelledby="funciones-title">
    <div class="container">
      <div data-reveal>
        <p class="eyebrow">Funciones</p>
        <h2 id="funciones-title">Todo lo que necesitas para llevar tu plan</h2>
        <p class="lede">Bolivianos por defecto; también USD y EUR.</p>
      </div>
      <ul class="grid">
        <li v-for="(f, i) in features" :key="f.title" class="card" data-reveal :style="{ '--i': i % 4 }">
          <span class="icon">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="f.icon" />
            </svg>
          </span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.features {
  background: var(--surface-2);
  border-block: 1px solid var(--line);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: 1.25rem;
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

.card {
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1rem;
  border-radius: 14px;
  background: var(--water-soft);
  color: var(--water);
}

.icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.card p {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.98rem;
}
</style>
