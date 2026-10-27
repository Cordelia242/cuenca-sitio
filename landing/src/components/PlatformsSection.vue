<script setup lang="ts">
import { ref, watch } from 'vue'
import PhoneFrame from './mock/PhoneFrame.vue'
import AppRow from './mock/AppRow.vue'
import AppIcon from './mock/AppIcon.vue'
import { prefersReducedMotion, useInView } from '../composables/useInView'

const desk = ref<HTMLElement | null>(null)
const deskInView = useInView(desk)
const armed = ref(false)
watch(deskInView, (seen) => {
  if (seen && !prefersReducedMotion()) armed.value = true
})

const sidebar = ['Inicio', 'Planes', 'Movimientos', 'Reportes', 'Calendario']
const commands = [
  { label: 'Registrar gasto', keys: 'G' },
  { label: 'Ir a Planes', keys: 'P' },
  { label: 'Abrir el calendario', keys: 'C' },
]
</script>

<template>
  <section id="plataformas" class="section" aria-labelledby="plataformas-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="label">Teléfono y web</p>
        <h2 id="plataformas-title">En el bolsillo y en el <em>escritorio</em></h2>
        <p class="lede">Con una cuenta, tus espacios se sincronizan entre tus dispositivos.</p>
      </div>

      <div class="cols">
        <article class="col card" data-reveal>
          <div
            class="art phone-art"
            role="img"
            aria-label="Ilustración de la pantalla Movimientos de la app para Android, con movimientos de hoy y de ayer."
          >
            <div class="phone-clip parallax">
              <PhoneFrame title="Movimientos" tab="movimientos">
                <div class="moves">
                  <span class="search"><AppIcon name="search" />Buscar movimientos</span>
                  <p class="day"><span>Hoy</span><span class="num">Bs 4.737,00</span></p>
                  <div class="card group">
                    <AppRow icon="arrowUp" tone="green" title="Sueldo" subtitle="Ingreso" amount="+Bs 4.800,00" account="Banco" income />
                    <AppRow icon="box" tone="yellow" title="Almuerzo" subtitle="Comida" amount="−Bs 38,00" account="Billetera" />
                    <AppRow icon="truck" tone="yellow" title="Taxi" subtitle="Transporte" amount="−Bs 25,00" account="Billetera" />
                  </div>
                  <p class="day"><span>Ayer</span><span class="num">−Bs 60,00</span></p>
                  <div class="card group">
                    <AppRow icon="home" tone="violet" title="Plomero" subtitle="Mantenimiento del hogar" amount="−Bs 60,00" account="Banco" />
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
          <h3>App para Android</h3>
          <p>Registra al momento, incluso sin conexión; atajos en la pantalla de inicio y en tu reloj Wear OS.</p>
        </article>

        <article class="col card" data-reveal style="--i: 1">
          <div
            ref="desk"
            class="art desk"
            :class="{ armed }"
            role="img"
            aria-label="Ilustración del cliente web de Cuenca en una computadora, con la barra lateral y la paleta de comandos abierta."
          >
            <div class="window">
              <div class="chrome"><i></i><i></i><i></i></div>
              <div class="app">
                <aside class="side">
                  <span class="side-brand">cuenca</span>
                  <span v-for="(item, i) in sidebar" :key="item" class="side-item" :class="{ on: i === 2 }">{{ item }}</span>
                </aside>
                <div class="main">
                  <span class="main-title">Movimientos</span>
                  <span v-for="n in 5" :key="n" class="line" :style="{ '--w': `${92 - n * 9}%` }"></span>
                </div>
                <div class="palette">
                  <span class="palette-input">
                    <AppIcon name="search" />
                    <span class="typed">Paleta de comandos</span>
                  </span>
                  <span v-for="(c, i) in commands" :key="c.label" class="cmd" :class="{ on: i === 0 }" :style="{ '--i': i }">
                    {{ c.label }}<kbd>{{ c.keys }}</kbd>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h3>Cliente web para computadora</h3>
          <p>
            Pensado para pantallas grandes y teclado, con paleta de comandos, atajos de teclado y calendario; para revisar el
            mes con calma. Requiere iniciar sesión con Google.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cols {
  display: grid;
  gap: var(--s4);
  margin-top: clamp(2.5rem, 5vw, 4rem);
}

@media (min-width: 900px) {
  .cols {
    grid-template-columns: 0.8fr 1.2fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  padding: clamp(1.25rem, 3vw, 2rem);
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.col p {
  color: var(--ink-2);
}

.art {
  display: grid;
  place-items: center;
  height: clamp(17rem, 34vw, 22rem);
  margin-bottom: var(--s4);
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--sunken);
}

/* The phone peeks out of its panel. */
.phone-art {
  place-items: start center;
  padding-top: 2rem;
}

.phone-clip {
  --drift: 18px;
  --phone-fs: 11px;
}

.moves {
  display: grid;
  gap: 0.6em;
  padding-top: 0.6em;
}

.search {
  display: flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.75em 1em;
  border-radius: 1em;
  background: var(--soft);
  color: var(--muted);
}

.search svg {
  width: 1.1em;
}

.day {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4em;
  padding-inline: 0.3em;
  color: var(--ink-2);
  font-size: 0.9em;
  font-weight: 600;
}

.group {
  overflow: hidden;
  border-radius: 1.2em;
}

/* Desktop window. */
.desk {
  padding: 1.5rem;
}

.window {
  width: 100%;
  max-width: 34rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg);
  box-shadow: var(--shadow-raised);
  font-size: 0.78rem;
}

.chrome {
  display: flex;
  gap: 0.35rem;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid var(--line);
}

.chrome i {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--line-strong);
}

.app {
  position: relative;
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  min-height: 14rem;
}

.side {
  display: grid;
  align-content: start;
  gap: 0.2rem;
  padding: 0.8rem 0.6rem;
  border-right: 1px solid var(--line);
  background: var(--surface);
}

.side-brand {
  margin: 0 0.5rem 0.6rem;
  font-family: var(--font-ui);
  font-size: 0.95rem;
  font-weight: 600;
}

.side-item {
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  color: var(--muted);
}

.side-item.on {
  background: var(--soft);
  color: var(--ink);
  font-weight: 600;
}

.main {
  display: grid;
  align-content: start;
  gap: 0.7rem;
  padding: 0.9rem 1rem;
}

.main-title {
  margin-bottom: 0.3rem;
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 600;
}

.line {
  width: var(--w);
  height: 0.55rem;
  border-radius: var(--radius-pill);
  background: var(--soft);
}

.palette {
  position: absolute;
  top: 1.6rem;
  left: 50%;
  display: grid;
  width: min(80%, 19rem);
  padding: 0.4rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface);
  box-shadow: var(--shadow-float);
  transform: translateX(-50%);
}

.palette-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.6rem 0.7rem;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
}

.palette-input svg {
  width: 0.95rem;
}

.cmd {
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
}

.cmd.on {
  background: var(--soft);
}

kbd {
  padding: 0 0.35rem;
  border: 1px solid var(--line);
  border-radius: 5px;
  color: var(--muted);
  font-family: var(--font-ui);
  font-size: 0.7rem;
}

@media (prefers-reduced-motion: no-preference) {
  .armed .palette {
    animation: palette var(--dur-reveal) var(--ease-out) 300ms both;
  }

  .armed .typed {
    animation: type 900ms steps(18, end) 700ms both;
  }

  .armed .cmd {
    animation: fade var(--dur-3) var(--ease-out) calc(1100ms + var(--i) * var(--stagger)) both;
  }

  .armed .cmd.on {
    animation:
      fade var(--dur-3) var(--ease-out) 1100ms both,
      highlight 500ms var(--ease-in-out) 1500ms both;
  }

  @keyframes palette {
    from {
      opacity: 0;
      transform: translate(-50%, 12px) scale(0.96);
    }
  }

  @keyframes type {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  @keyframes highlight {
    from {
      background: transparent;
    }
  }
}
</style>
