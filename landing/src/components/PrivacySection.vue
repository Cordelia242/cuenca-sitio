<script setup lang="ts">
import { privacyPolicyUrl } from '../links'

const points = [
  'Tus datos se guardan en tu dispositivo y funciona sin conexión.',
  'Para uso personal no necesitas cuenta.',
  'Si inicias sesión (con Google), tus espacios se sincronizan entre dispositivos.',
  'La clave del asistente (Gemini, OpenAI o Claude) se queda en tu dispositivo y solo se envía a ese proveedor.',
  'Los reportes de errores son opcionales y vienen desactivados. Si los activas, se envían sin tu identidad y se filtran para quitar montos, títulos, notas y nombres.',
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
        <p class="policy"><a :href="privacyPolicyUrl">Lee la política de privacidad</a></p>
      </div>

      <svg class="diagram" viewBox="0 -28 320 348" role="img" aria-label="Diagrama: tu dispositivo en el centro, con un anillo punteado opcional de sincronización" data-reveal>
        <g fill="none" stroke="var(--accent)" stroke-width="1.5" opacity="0.35">
          <circle cx="160" cy="160" r="60" />
          <circle cx="160" cy="160" r="85" />
          <circle cx="160" cy="160" r="110" />
        </g>
        <circle cx="160" cy="160" r="140" fill="none" stroke="var(--accent-text)" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round" />
        <rect x="132" y="120" width="56" height="80" rx="10" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" />
        <g transform="translate(140 130) scale(0.4)">
          <path d="M18 64 Q34 58 50 64 T82 64 C79 77 66 86 50 86 C34 86 21 77 18 64 Z" fill="var(--accent)" />
          <g fill="none" stroke="var(--ink)" stroke-linecap="round" stroke-width="7">
            <path d="M14 44 C14 68 30 86 50 86 C70 86 86 68 86 44" stroke-width="9" />
            <path d="M26 12 C26 32 44 38 46 54" />
            <path d="M50 8 L50 54" />
            <path d="M74 12 C74 32 56 38 54 54" />
          </g>
        </g>
        <g font-family="Outfit, system-ui, sans-serif" font-size="12" fill="var(--muted)" text-anchor="middle">
          <text x="160" y="226">Tu dispositivo</text>
          <text x="160" y="-8" fill="var(--accent-text)">Sincronización (opcional)</text>
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
  color: var(--accent-text);
}

.policy {
  margin-top: 2rem;
}

.policy a {
  color: var(--accent-text);
  font-weight: 600;
}

.diagram {
  justify-self: center;
  width: min(100%, 26rem);
}
</style>
