import { onBeforeUnmount, ref } from 'vue'
import { prefersReducedMotion } from './useInView'

// easeOutQuint, the same family as the CSS motion tokens.
const easeOut = (t: number) => 1 - (1 - t) ** 5

// Animated number. Renders `initial` (the final value on the server) and tweens on `to()`.
export function useCountUp(initial: number) {
  const value = ref(initial)
  let frame = 0

  function to(target: number, duration = 900, delay = 0) {
    cancelAnimationFrame(frame)
    if (prefersReducedMotion()) {
      value.value = target
      return
    }
    const from = value.value
    const t0 = performance.now() + delay
    const tick = (now: number) => {
      const p = Math.min(Math.max((now - t0) / duration, 0), 1)
      value.value = from + (target - from) * easeOut(p)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  function set(v: number) {
    cancelAnimationFrame(frame)
    value.value = v
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { value, to, set }
}

// "Bs 1.050,00" as the app formats bolivianos.
export function formatBs(value: number, decimals = 2) {
  const fixed = Math.abs(value).toFixed(decimals)
  const [int = '0', dec] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `Bs ${grouped}${dec ? `,${dec}` : ''}`
}
