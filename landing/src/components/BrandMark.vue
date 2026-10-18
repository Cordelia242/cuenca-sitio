<template>
  <svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="var(--water)" />
    <path
      d="M16 4.5c2.6 3.3 4.2 5.6 4.2 7.6a4.2 4.2 0 0 1-8.4 0c0-2 1.6-4.3 4.2-7.6z"
      fill="var(--on-water)"
    />
    <path
      d="M5.5 19.5h21c0 4.4-4.7 8-10.5 8s-10.5-3.6-10.5-8z"
      fill="none"
      stroke="var(--on-water)"
      stroke-width="2.6"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.mark {
  width: 2rem;
  height: 2rem;
  flex: none;
}
</style>
