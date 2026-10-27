<script setup lang="ts">
import AppIcon from './mock/AppIcon.vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="toggle"
    :class="theme"
    :aria-label="theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    @click="toggle"
  >
    <AppIcon class="sun" name="sun" />
    <AppIcon class="moon" name="moon" />
  </button>
</template>

<style scoped>
.toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  transition:
    border-color var(--dur-2) var(--ease-out),
    transform var(--dur-3) var(--ease-out);
}

/* The toggle needs JS; without it the theme follows the system. */
:global(html:not(.js)) .toggle {
  display: none;
}

.toggle:hover {
  border-color: var(--line-strong);
  transform: rotate(-12deg);
}

.toggle svg {
  grid-area: 1 / 1;
  width: 1.15rem;
  height: 1.15rem;
  transition:
    transform var(--dur-3) var(--ease-out),
    opacity var(--dur-2) var(--ease-out);
}

.moon {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.dark .sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

.dark .moon {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .toggle,
  .toggle svg {
    transition: opacity var(--dur-2);
  }

  .toggle:hover,
  .moon,
  .dark .sun {
    transform: none;
  }
}
</style>
