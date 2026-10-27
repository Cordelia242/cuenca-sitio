<script setup lang="ts">
import { icons, type IconName } from './icons'

defineProps<{ name: IconName }>()
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path :d="icons[name]" />
  </svg>
</template>
