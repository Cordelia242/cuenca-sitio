<script setup lang="ts">
const steps = [
  'Registra tus cuentas y tu dinero.',
  'Asigna cada boliviano a un presupuesto hasta que «Disponible para asignar» llegue a Bs 0.',
  'Registra tus gastos (a mano, con un atajo o con tu voz).',
  'Ajusta sobre la marcha: mueve dinero cuando la vida cambia.',
]
</script>

<template>
  <section id="como-funciona" class="section" aria-labelledby="como-title">
    <div class="container">
      <div data-reveal>
        <p class="eyebrow">Paso a paso</p>
        <h2 id="como-title">Cómo funciona</h2>
      </div>
      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s" data-reveal :style="{ '--i': i }">
          <span class="num" aria-hidden="true">{{ i + 1 }}</span>
          <p>{{ s }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  display: grid;
  gap: 2rem 1.5rem;
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 700px) {
  .steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .steps {
    grid-template-columns: repeat(4, 1fr);
  }
}

.steps li {
  padding-top: 1rem;
  border-top: 2px solid var(--water);
}

.num {
  display: block;
  color: var(--clay);
  font-family: var(--display);
  font-size: clamp(3.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1;
}

.steps p {
  margin-top: 0.75rem;
  font-size: 1.1rem;
}
</style>
