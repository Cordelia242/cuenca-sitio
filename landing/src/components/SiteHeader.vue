<script setup lang="ts">
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import BrandMark from './BrandMark.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useActiveSection } from '../composables/useActiveSection'
import { appUrl, guideUrl } from '../links'

const links = [
  { id: 'dia-a-dia', label: 'Día a día' },
  { id: 'funciones', label: 'Funciones' },
  { id: 'plataformas', label: 'Teléfono y web' },
  { id: 'privacidad', label: 'Privacidad' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'planes', label: 'Planes' },
]

const active = useActiveSection(links.map((l) => l.id))
const list = ref<HTMLElement | null>(null)
const pill = ref({ x: 0, w: 0 })
const scrolled = ref(false)

// The pill slides under the active link; it is purely visual (the link also carries aria-current).
async function placePill() {
  await nextTick()
  const el = list.value?.querySelector<HTMLElement>(`a[href="#${active.value}"]`)
  if (el) pill.value = { x: el.offsetLeft, w: el.offsetWidth }
}

const pillStyle = computed(() => ({
  transform: `translateX(${pill.value.x}px)`,
  width: `${pill.value.w}px`,
}))

function onScroll() {
  scrolled.value = window.scrollY > 8
}

watch(active, placePill)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', placePill)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', placePill)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="container bar">
      <a class="brand" href="#" aria-label="Cuenca, inicio">
        <BrandMark />
        <span class="brand-name">cuenca</span>
      </a>
      <nav class="nav" aria-label="Principal">
        <div ref="list" class="anchors">
          <span class="pill" :class="{ on: active }" :style="pillStyle" aria-hidden="true"></span>
          <ul>
          <li v-for="link in links" :key="link.id">
            <a :href="`#${link.id}`" :aria-current="active === link.id ? 'location' : undefined">{{ link.label }}</a>
          </li>
          </ul>
        </div>
      </nav>
      <div class="actions">
        <ThemeToggle />
        <a class="btn btn-secondary guide" :href="guideUrl">Lee la guía</a>
        <a class="btn btn-primary" :href="appUrl">Abrir Cuenca</a>
      </div>
    </div>
    <span class="progress" aria-hidden="true"></span>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid transparent;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  transition: border-color var(--dur-3) var(--ease-out);
}

.site-header.scrolled {
  border-bottom-color: var(--line);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  min-height: var(--header-h);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
}

.brand :deep(.mark) {
  transition: transform var(--dur-3) var(--ease-out);
}

.brand:hover :deep(.mark) {
  transform: rotate(-8deg) scale(1.06);
}

.brand-name {
  font-family: var(--font-ui);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.nav {
  display: none;
}

.anchors {
  position: relative;
  padding: 0.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  background: var(--surface);
}

.anchors ul {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pill {
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0.25rem;
  border-radius: var(--radius-pill);
  background: var(--soft);
  opacity: 0;
  transition:
    transform var(--dur-3) var(--ease-out),
    width var(--dur-3) var(--ease-out),
    opacity var(--dur-2) var(--ease-out);
}

.pill.on {
  opacity: 1;
}

.anchors a {
  position: relative;
  display: block;
  padding: 0.4rem 0.7rem;
  border-radius: var(--radius-pill);
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: color var(--dur-2) var(--ease-out);
}

.anchors a:hover,
.anchors a[aria-current] {
  color: var(--ink);
}

.actions {
  display: flex;
  align-items: center;
  gap: var(--s2);
}

.btn {
  min-height: 2.5rem;
  padding: 0.45rem 1rem;
  font-size: 0.92rem;
}

.guide {
  display: none;
}

@media (min-width: 560px) {
  .guide {
    display: inline-flex;
  }
}

@media (min-width: 1040px) {
  .nav {
    display: block;
  }

  .guide {
    display: none;
  }
}

@media (min-width: 1280px) {
  .guide {
    display: inline-flex;
  }
}

/* Reading progress, scroll-linked where supported. */
.progress {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 2px;
  background: var(--amber-fill);
  transform: scaleX(0);
  transform-origin: left;
}

@supports (animation-timeline: scroll()) {
  .progress {
    animation: progress linear both;
    animation-timeline: scroll(root);
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress {
    display: none;
  }

  .pill {
    transition: opacity var(--dur-2);
  }
}
</style>
