<script setup lang="ts">
const points = [
  'Tus datos se guardan en tu dispositivo y funciona sin conexión.',
  'Para uso personal no necesitas cuenta.',
  'Si inicias sesión (con Google), tus espacios se sincronizan entre dispositivos.',
  'Tu clave de Gemini se queda en tu dispositivo y solo se envía a Google.',
  'Los reportes de errores son anónimos —nunca incluyen montos, títulos, notas ni nombres— y puedes desactivarlos.',
  'Puedes ver y cerrar sesiones en otros dispositivos, y borrar tu cuenta.',
]
</script>

<template>
  <section id="privacidad" class="section privacy" aria-labelledby="privacidad-title">
    <div class="container layout">
      <div data-reveal>
        <p class="eyebrow">Privacidad</p>
        <h2 id="privacidad-title">Tus datos, primero en tu dispositivo</h2>
        <ul class="points">
          <li v-for="p in points" :key="p">
            <svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m4 10.5 4 4 8-9" />
            </svg>
            <span>{{ p }}</span>
          </li>
        </ul>
      </div>

      <svg class="diagram" viewBox="0 -28 320 348" role="img" aria-label="Diagrama: tu dispositivo en el centro, con un anillo punteado opcional de sincronización" data-reveal>
        <g fill="none" stroke="var(--water)" stroke-width="1.5" opacity="0.35">
          <circle cx="160" cy="160" r="60" />
          <circle cx="160" cy="160" r="85" />
          <circle cx="160" cy="160" r="110" />
        </g>
        <circle cx="160" cy="160" r="140" fill="none" stroke="var(--clay)" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round" />
        <rect x="132" y="120" width="56" height="80" rx="10" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" />
        <path d="M160 140c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" fill="var(--water)" />
        <path d="M148 168h24" stroke="var(--water)" stroke-width="3" stroke-linecap="round" />
        <g font-family="system-ui, sans-serif" font-size="12" fill="var(--muted)" text-anchor="middle">
          <text x="160" y="226">Tu dispositivo</text>
          <text x="160" y="-8" fill="var(--clay)">Sincronización (opcional)</text>
        </g>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.privacy {
  background: var(--surface-2);
  border-block: 1px solid var(--line);
}

.layout {
  display: grid;
  align-items: center;
  gap: 3rem;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.points {
  display: grid;
  gap: 1rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.points li {
  display: flex;
  gap: 0.75rem;
}

.points svg {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.3rem;
  color: var(--water);
}

.diagram {
  justify-self: center;
  width: min(100%, 26rem);
}
</style>
