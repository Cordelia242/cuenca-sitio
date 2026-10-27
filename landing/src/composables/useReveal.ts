import { onBeforeUnmount, onMounted } from 'vue'

// Adds `is-revealing` to every [data-reveal] element that starts below the fold, once it enters the viewport.
// Elements are never hidden while waiting: the CSS animation only runs after the class is added.
export function useReveal() {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    const fold = window.innerHeight
    const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
      (el) => el.getBoundingClientRect().top > fold,
    )
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealing')
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0 },
    )
    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
