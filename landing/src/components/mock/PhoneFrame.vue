<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

// Recreation of the app's shell: status bar, centred title, content and the bottom tab bar.
// Sized in em, so `font-size` on the frame scales the whole screen. Decorative: callers give it an accessible name.
defineProps<{ title: string; tab: 'inicio' | 'planes' | 'movimientos' }>()

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: 'inicio', label: 'Inicio', icon: 'tabHome' },
  { id: 'planes', label: 'Planes', icon: 'tabPlan' },
  { id: 'movimientos', label: 'Movimientos', icon: 'tabList' },
  { id: 'mas', label: 'Más', icon: 'tabMore' },
]
</script>

<template>
  <div class="phone" aria-hidden="true">
    <div class="status">
      <span class="num">10:00</span>
      <span class="dots"><i></i><i></i><i></i></span>
    </div>
    <div class="top">
      <span class="title">{{ title }}</span>
      <span class="eye"><AppIcon name="eye" /></span>
    </div>
    <div class="screen">
      <slot />
    </div>
    <nav class="tabs">
      <span v-for="t in tabs" :key="t.id" class="tab" :class="{ on: t.id === tab }">
        <AppIcon :name="t.icon" />
        {{ t.label }}
      </span>
    </nav>
  </div>
</template>

<style scoped>
.phone {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 22em;
  height: 44em;
  overflow: hidden;
  border: 0.5em solid var(--header-surface);
  border-radius: 3em;
  background: var(--bg);
  /* The outer ring separates the dark frame from a dark page. */
  box-shadow:
    0 0 0 1px var(--line-strong),
    var(--shadow-float);
  font-family: var(--font-body);
  font-size: var(--phone-fs, 14px);
  line-height: 1.35;
  user-select: none;
}

.status {
  display: flex;
  justify-content: space-between;
  padding: 0.9em 1.6em 0;
  color: var(--ink-2);
  font-size: 0.8em;
}

.dots {
  display: flex;
  gap: 0.3em;
  align-items: center;
}

.dots i {
  width: 0.55em;
  height: 0.55em;
  border-radius: 50%;
  background: currentColor;
}

.top {
  position: relative;
  display: grid;
  place-items: center;
  padding: 0.9em 1.2em 0.4em;
}

.title {
  font-family: var(--font-ui);
  font-size: 1.15em;
  font-weight: 600;
}

.eye {
  position: absolute;
  right: 1.1em;
  display: grid;
  place-items: center;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  background: var(--soft);
}

.eye svg {
  width: 1.1em;
}

.screen {
  position: relative;
  flex: 1;
  min-height: 0;
  padding: 0 1.1em;
  overflow: hidden;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.6em 0.4em 1.1em;
  border-top: 1px solid var(--line);
  background: var(--bg);
}

.tab {
  display: grid;
  justify-items: center;
  gap: 0.2em;
  color: var(--muted);
  font-size: 0.72em;
}

.tab svg {
  width: 1.7em;
  height: 1.7em;
}

.tab.on {
  color: var(--ink);
  font-weight: 600;
}
</style>
