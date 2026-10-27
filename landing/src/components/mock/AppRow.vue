<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

// One row of the app's lists: icon tile + title + subtitle, amount and account on the right.
defineProps<{
  icon: IconName
  tone: 'green' | 'blue' | 'yellow' | 'violet' | 'neutral'
  title: string
  subtitle: string
  amount: string
  account?: string
  income?: boolean
}>()
</script>

<template>
  <div class="row">
    <span class="tile" :class="tone"><AppIcon :name="icon" /></span>
    <span class="text">
      <span class="t">{{ title }}</span>
      <span class="s">{{ subtitle }}</span>
    </span>
    <span class="right">
      <span class="amount num" :class="{ income }">{{ amount }}</span>
      <span v-if="account" class="s">{{ account }}</span>
    </span>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 0.85em;
  padding: 0.8em 0.95em;
}

.row + .row {
  border-top: 1px solid var(--line);
}

.tile {
  width: 2.6em;
  height: 2.6em;
  border-radius: 0.75em;
}

.tile svg {
  width: 1.3em;
  height: 1.3em;
}

.text,
.right {
  display: grid;
  gap: 0.15em;
  min-width: 0;
}

.text {
  flex: 1;
}

.right {
  justify-items: end;
}

.t {
  overflow: hidden;
  font-family: var(--font-ui);
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.s {
  color: var(--muted);
  font-size: 0.86em;
  white-space: nowrap;
}

.amount {
  font-weight: 600;
  white-space: nowrap;
}

.income {
  color: var(--income);
}
</style>
