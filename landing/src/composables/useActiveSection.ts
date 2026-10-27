import { onBeforeUnmount, onMounted, ref } from 'vue'

// Id of the section that crosses the middle band of the viewport; used to highlight the nav.
export function useActiveSection(ids: string[]) {
  const active = ref('')
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
          else if (active.value === entry.target.id) active.value = ''
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
