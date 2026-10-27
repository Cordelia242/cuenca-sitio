import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

// True once the element starts entering the viewport (one-shot), so state changes happen at its edge, not mid-view.
// Stays false on the server.
export function useInView(target: Ref<HTMLElement | null>, threshold = 0) {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const el = target.value
    if (!el || !('IntersectionObserver' in window)) {
      inView.value = true
      return
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        inView.value = true
        observer?.disconnect()
      },
      { threshold },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
