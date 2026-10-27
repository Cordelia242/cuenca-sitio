<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from './mock/AppIcon.vue'
import { prefersReducedMotion, useInView } from '../composables/useInView'
import { privacyPolicyUrl } from '../links'

const points = [
  'Tus datos se guardan en tu dispositivo y funciona sin conexión.',
  'Para uso personal no necesitas cuenta.',
  'Si inicias sesión (con Google), tus espacios se sincronizan entre dispositivos.',
  'La clave del asistente (Gemini, OpenAI o Claude) se queda en tu dispositivo y solo se envía a ese proveedor.',
  'Los reportes de errores son opcionales y vienen desactivados. Si los activas, se envían sin tu identidad y se filtran para quitar montos, títulos, notas y nombres.',
  'Puedes ver y cerrar sesiones en otros dispositivos, y borrar tu cuenta.',
]

const diagram = ref<HTMLElement | null>(null)
const inView = useInView(diagram)
const armed = ref(false)
watch(inView, (seen) => {
  if (seen && !prefersReducedMotion()) armed.value = true
})
</script>

<template>
  <section id="privacidad" class="section privacy" aria-labelledby="privacidad-title">
    <div class="container layout">
      <div>
        <div class="section-head" data-reveal>
          <p class="label">Privacidad</p>
          <h2 id="privacidad-title">Tus datos, primero en tu <em>dispositivo</em></h2>
        </div>
        <ul class="points">
          <li v-for="(p, i) in points" :key="p" data-reveal :style="{ '--i': i }">
            <span class="check"><AppIcon name="check" /></span>
            <span>{{ p }}</span>
          </li>
        </ul>
        <p class="policy" data-reveal>
          <a :href="privacyPolicyUrl">Lee la política de privacidad <AppIcon class="arrow" name="arrowRight" /></a>
        </p>
      </div>

      <div ref="diagram" class="diagram-wrap" :class="{ armed }" data-reveal>
        <svg
          class="diagram"
          viewBox="0 -28 320 348"
          role="img"
          aria-label="Diagrama: tu dispositivo en el centro, con un anillo punteado opcional de sincronización"
        >
          <g class="rings" fill="none" stroke="var(--line-strong)" stroke-width="1.2">
            <circle cx="160" cy="160" r="60" style="--i: 0" />
            <circle cx="160" cy="160" r="85" style="--i: 1" />
            <circle cx="160" cy="160" r="110" style="--i: 2" />
          </g>
          <circle
            class="sync"
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="var(--amber-fill)"
            stroke-width="2"
            stroke-dasharray="3 9"
            stroke-linecap="round"
          />
          <g class="device">
            <rect x="132" y="120" width="56" height="80" rx="12" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" />
            <g transform="translate(140 130) scale(0.4)">
              <path d="M18 64 Q34 58 50 64 T82 64 C79 77 66 86 50 86 C34 86 21 77 18 64 Z" fill="var(--brand-water)" />
              <g fill="none" stroke="var(--ink)" stroke-linecap="round" stroke-width="7">
                <path d="M14 44 C14 68 30 86 50 86 C70 86 86 68 86 44" stroke-width="9" />
                <path d="M26 12 C26 32 44 38 46 54" />
                <path d="M50 8 L50 54" />
                <path d="M74 12 C74 32 56 38 54 54" />
              </g>
            </g>
          </g>
          <g class="labels" font-family="Inter Variable, system-ui, sans-serif" font-size="12" fill="var(--muted)" text-anchor="middle">
            <text x="160" y="222">Tu dispositivo</text>
            <text class="sync-label" x="160" y="-8" fill="var(--amber)">Sincronización (opcional)</text>
          </g>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.privacy {
  border-block: 1px solid var(--line);
  background: var(--sunken);
}

.layout {
  display: grid;
  align-items: center;
  gap: clamp(3rem, 6vw, 5rem);
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 1.1fr 0.9fr;
  }
}

.points {
  display: grid;
  gap: var(--s4);
  margin: var(--s8) 0 0;
  padding: 0;
  list-style: none;
}

.points li {
  display: flex;
  gap: var(--s3);
  color: var(--ink-2);
}

.check {
  display: grid;
  flex: none;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.05rem;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--ink);
}

.check svg {
  width: 0.95rem;
  height: 0.95rem;
}

.policy {
  margin-top: var(--s8);
}

.policy a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink);
  font-family: var(--font-ui);
  font-weight: 600;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  transition: text-decoration-color var(--dur-2) var(--ease-out);
}

.policy a:hover {
  text-decoration-color: var(--amber-fill);
}

.policy .arrow {
  width: 1rem;
  height: 1rem;
  transition: transform var(--dur-3) var(--ease-out);
}

.policy a:hover .arrow {
  transform: translateX(3px);
}

.diagram-wrap {
  justify-self: center;
  width: min(100%, 26rem);
}

.diagram {
  display: block;
  width: 100%;
  overflow: visible;
}

.labels text {
  paint-order: stroke;
  stroke: var(--sunken);
  stroke-width: 6px;
  stroke-linejoin: round;
}

.rings circle,
.device {
  transform-box: view-box;
  transform-origin: 160px 160px;
}

@media (prefers-reduced-motion: no-preference) {
  .armed .rings circle {
    animation: ripple var(--dur-slow) var(--ease-out) calc(200ms + var(--i) * 120ms) both;
  }

  .armed .device {
    animation: settle var(--dur-reveal) var(--ease-out) both;
  }

  .armed .sync {
    animation: dash 1.6s var(--ease-in-out) 600ms both;
  }

  .armed .sync-label {
    animation: fade var(--dur-reveal) var(--ease-out) 1.2s both;
  }

  @keyframes ripple {
    from {
      opacity: 0;
      transform: scale(0.6);
    }
  }

  @keyframes settle {
    from {
      opacity: 0;
      transform: scale(0.85);
    }
  }

  @keyframes dash {
    from {
      opacity: 0;
      stroke-dashoffset: 120;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .policy a:hover .arrow {
    transform: none;
  }
}
</style>
