import { onMounted, ref } from 'vue'
import { prefersReducedMotion } from './useInView'

export type Theme = 'light' | 'dark'

// Must match public/tema.js, which applies the stored theme before the first paint.
const STORAGE_KEY = 'cuenca-tema'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

export function useTheme() {
  const theme = ref<Theme>('light')

  onMounted(() => {
    theme.value = readStored() ?? systemTheme()
  })

  function apply(next: Theme) {
    theme.value = next
    document.documentElement.dataset.theme = next
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute('content', next === 'dark' ? '#0a0a0a' : '#fafafa')
    }
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode or blocked storage: the choice lasts for this page only.
    }
  }

  // Circular reveal from the toggle with the View Transitions API; plain switch elsewhere or with reduced motion.
  function toggle(event?: MouseEvent) {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    if (!('startViewTransition' in document) || prefersReducedMotion()) {
      apply(next)
      return
    }
    const x = event?.clientX ?? window.innerWidth - 40
    const y = event?.clientY ?? 32
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const root = document.documentElement
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${r}px`)
    root.classList.add('theme-transition')
    const transition = document.startViewTransition(() => apply(next))
    transition.finished.finally(() => root.classList.remove('theme-transition'))
  }

  return { theme, toggle }
}
