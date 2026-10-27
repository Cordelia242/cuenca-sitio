<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from './mock/AppIcon.vue'
import { prefersReducedMotion, useInView } from '../composables/useInView'
import { appUrl, guideUrl } from '../links'

const panel = ref<HTMLElement | null>(null)
const inView = useInView(panel)
const armed = ref(false)
watch(inView, (seen) => {
  if (seen && !prefersReducedMotion()) armed.value = true
})
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container">
      <div ref="panel" class="panel" :class="{ armed }" data-reveal>
        <!-- Three tributaries that meet in one basin: the brand mark, drawn large. -->
        <svg class="streams" viewBox="0 0 100 100" aria-hidden="true">
          <g fill="none" stroke-linecap="round">
            <path pathLength="1" d="M14 44 C14 68 30 86 50 86 C70 86 86 68 86 44" />
            <path pathLength="1" d="M26 12 C26 32 44 38 46 54" />
            <path pathLength="1" d="M50 8 L50 54" />
            <path pathLength="1" d="M74 12 C74 32 56 38 54 54" />
          </g>
        </svg>
        <h2 id="cta-title">Empieza a darle trabajo a tu <em>dinero</em></h2>
        <div class="ctas">
          <a class="btn on-dark-primary" :href="appUrl">
            Abrir Cuenca
            <AppIcon class="arrow" name="arrowRight" />
          </a>
          <a class="btn on-dark-secondary" :href="guideUrl">Lee la guía</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: clamp(4rem, 9vw, 8rem);
}

.panel {
  position: relative;
  display: grid;
  justify-items: center;
  gap: var(--s8);
  padding: clamp(3.5rem, 9vw, 7rem) var(--s6);
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--header-surface);
  color: var(--on-header);
  text-align: center;
}

.panel h2 {
  position: relative;
  max-width: 16ch;
}

.panel h2 em {
  color: #f0b34b;
}

.streams {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(120%, 52rem);
  transform: translate(-50%, -50%);
}

.streams path {
  stroke: rgb(255 255 255 / 0.08);
  stroke-width: 1.2;
}

.streams path:first-child {
  stroke-width: 1.8;
}

.ctas {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--s3);
}

.on-dark-primary {
  background: var(--on-header);
  color: var(--header-surface);
}

.on-dark-primary:hover {
  --btn-y: -2px;
  background: #ffffff;
}

.on-dark-secondary {
  border-color: rgb(255 255 255 / 0.25);
  color: var(--on-header);
}

.on-dark-secondary:hover {
  --btn-y: -2px;
  border-color: rgb(255 255 255 / 0.6);
}

:focus-visible {
  outline-color: var(--on-header);
}

@media (prefers-reduced-motion: no-preference) {
  .armed .streams path {
    stroke-dasharray: 1;
    animation: stream 1.8s var(--ease-in-out) both;
  }

  .armed .streams path:nth-child(2) {
    animation-delay: 150ms;
  }

  .armed .streams path:nth-child(3) {
    animation-delay: 300ms;
  }

  .armed .streams path:nth-child(4) {
    animation-delay: 450ms;
  }

  .armed .streams path:first-child {
    animation-delay: 700ms;
  }

  @keyframes stream {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>
