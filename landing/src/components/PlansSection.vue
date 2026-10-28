<script setup lang="ts">
import AppIcon from './mock/AppIcon.vue'
import { selfHostingGuideUrl } from '../links'

// Mirrors `PLAN_FAMILIAR` in the cuenca repository. Informative only: purchase is not available yet and, once the
// app sells through Google Play and the App Store, the store price is the one that applies.
const PLAN_FAMILIAR = { moneda: 'USD', montoMensual: 3, personas: 5 } as const

const precioFamiliar = `${PLAN_FAMILIAR.moneda} ${PLAN_FAMILIAR.montoMensual} al mes`
const personasFamiliar = `hasta ${PLAN_FAMILIAR.personas} personas`
const invitadasFamiliar = PLAN_FAMILIAR.personas - 1

const plans = [
  { name: 'Gratis', summary: 'La app en tu teléfono, sin cuenta' },
  { name: 'Familiar', summary: `Un espacio compartido para ${personasFamiliar}` },
  { name: 'Autohospedado', summary: 'Cuenca en tu propio servidor' },
]

// Summary cards shown above the table.
const cards = [
  {
    id: 'gratis',
    name: 'Gratis',
    audience: 'Para presupuestar en tu teléfono, sin cuenta',
    price: 'Sin costo',
    status: 'Disponible',
    features: [
      'La app en tu teléfono',
      'Funciona sin cuenta ni internet',
      'Tus datos se quedan en tu teléfono',
    ],
  },
  {
    id: 'familiar',
    name: 'Familiar',
    audience: 'Para compartir las cuentas de la casa con tu pareja o tu familia',
    price: precioFamiliar,
    status: 'Próximamente',
    why: `Para ${personasFamiliar}, contando a quien paga. Solo paga una.`,
    features: [
      `Un espacio compartido en la nube para ${personasFamiliar}`,
      'Cada persona sincroniza también su espacio Personal',
      'Sincronización entre los dispositivos de cada persona',
      `Quien paga invita a hasta ${invitadasFamiliar} personas, que no pagan`,
    ],
  },
]

const checkIcon = 'M5 12.5l4.5 4.5L19 7.5'

// One entry per table row; `values` follows the order of `plans`.
const rows = [
  {
    label: 'Precio',
    values: ['Gratis', `${precioFamiliar}. Precio anual por definir`, 'Gratis. Pagas tu propio servidor'],
  },
  {
    label: 'Dónde se guardan tus datos',
    values: ['Solo en tu teléfono', 'En la nube de Cuenca', 'En tu servidor'],
  },
  {
    label: 'Sincronización entre dispositivos',
    values: ['No', 'Sí, del espacio compartido y del Personal de cada persona', 'Sí, con tu servidor'],
  },
  {
    label: 'Espacios sincronizados',
    values: [
      'Ninguno',
      'Un único espacio compartido y el Personal de cada persona. Los demás espacios quedan en el teléfono',
      'Los que alojes en tu servidor',
    ],
  },
  {
    label: 'Personas',
    values: ['Una, en su teléfono', `Hasta ${PLAN_FAMILIAR.personas}, incluida quien paga. Solo paga una`, 'Por definir'],
  },
  {
    label: 'Acceso al web',
    values: ['No', 'Sí. Qué espacios ve cada persona está por definir', 'Sí, el web de tu servidor'],
  },
  {
    label: 'Prueba gratis',
    values: ['No aplica', 'Por definir', 'No aplica'],
  },
  {
    label: 'Al vencer',
    values: [
      'No vence',
      'El espacio compartido deja de sincronizar para todas las personas; el web queda en solo lectura con exportación y los datos se conservan 30 días en la nube',
      'No vence. Las copias de seguridad son tuyas',
    ],
  },
]

const scenarios = [
  {
    title: 'Una persona sola, sin pagar',
    plan: 'Gratis',
    text: 'Ana usa la app en su teléfono y todo queda guardado ahí. No sincroniza con otros dispositivos ni tiene web.',
  },
  {
    title: 'Una pareja',
    plan: 'Un Familiar',
    text: `Carla paga el Familiar y comparte «Casa» con Diego, que no paga. Cada uno sincroniza «Casa» y su propio Personal. Ocupan 2 de los ${PLAN_FAMILIAR.personas} lugares.`,
  },
  {
    title: 'Una familia de cinco',
    plan: 'Un Familiar',
    text: `Elena paga el Familiar y comparte «Familia» con su pareja, sus dos hijos y su madre. Cada persona sincroniza «Familia» y su Personal. Son ${PLAN_FAMILIAR.personas} de ${PLAN_FAMILIAR.personas}: para sumar a una sexta persona, alguien tiene que salir.`,
  },
]

const faqs = [
  {
    q: '¿Qué pasa si no pago?',
    a: 'Nada cambia en tu día a día: la app es gratuita y funciona en tu teléfono sin cuenta ni internet. Tus datos se quedan solo en ese teléfono; no se sincronizan con otros dispositivos ni tienes acceso al web.',
  },
  {
    q: '¿Quién paga el Familiar?',
    a: `Solo una persona. Quien paga invita a hasta ${invitadasFamiliar} personas más, que no pagan. Comparten un único espacio y cada persona sincroniza además su espacio Personal, que nunca se comparte.`,
  },
  {
    q: '¿Qué pasa cuando vence el Familiar?',
    a: 'El espacio compartido deja de sincronizar para todas las personas y el web queda en solo lectura, con la opción de exportar los datos. Los datos en la nube de Cuenca se conservan 30 días y las copias de los teléfonos no se tocan.',
  },
  {
    q: '¿Puedo mezclar espacios en la nube de Cuenca y en mi propio servidor?',
    a: 'Cada espacio elige dónde vive: solo en tu teléfono, en la nube de Cuenca o en un servidor propio. La app compilada desde el código fuente puede mezclar espacios en la nube y en uno o varios servidores propios. La app de las tiendas, por ahora, no se conecta a servidores propios. Cada web habla con un solo servidor: el web de Cuenca muestra los espacios de la nube y el web de tu servidor, los de ese servidor.',
  },
  {
    q: '¿Cómo instalo Cuenca en mi propio servidor?',
    a: 'El autohospedaje ya está disponible. Es gratis y no hay un máximo de servidores por persona. Quien opera el servidor puede leer los datos de los espacios que aloja: únete solo a espacios de servidores en los que confías. Quien lo instala se encarga de las copias de seguridad, las actualizaciones y la seguridad.',
    link: { href: selfHostingGuideUrl, text: 'Lee la guía de autohospedaje' },
  },
  {
    q: '¿Cuánto cuesta el Familiar?',
    a: `${precioFamiliar}, para ${personasFamiliar} contando a quien paga. Por ahora el precio es informativo: todavía no se puede comprar. Cuando se venda en Google Play y en la App Store, el precio vigente será el de cada tienda. La app gratuita seguirá siendo gratuita.`,
  },
]
</script>

<template>
  <section id="planes" class="section plans" aria-labelledby="planes-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="label">Planes</p>
        <h2 id="planes-title">Elige cómo usar <em>Cuenca</em></h2>
        <p class="lede">
          La app es gratis y funciona en tu teléfono. Si quieres tus datos en varios dispositivos, en el web o compartidos
          con tu familia, elige el plan Familiar: {{ precioFamiliar }} para {{ personasFamiliar }}. El precio es informativo:
          todavía no se puede comprar y, cuando se venda en las tiendas, el precio vigente será el de cada tienda.
        </p>
      </div>

      <ul class="cards">
        <li v-for="(card, i) in cards" :key="card.id" data-reveal :style="{ '--i': i }">
          <article class="plan-card" :class="card.id" :aria-labelledby="`plan-${card.id}`">
            <h3 :id="`plan-${card.id}`">{{ card.name }}</h3>
            <p class="audience">{{ card.audience }}</p>
            <p class="price num">{{ card.price }}</p>
            <p class="status">{{ card.status }}</p>
            <p v-if="card.why" class="why">{{ card.why }}</p>
            <ul class="features">
              <li v-for="feature in card.features" :key="feature">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="checkIcon" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </article>
        </li>
      </ul>

      <aside class="selfhost" aria-labelledby="plan-autohospedado" data-reveal style="--i: 2">
        <div>
          <h3 id="plan-autohospedado">Autohospedado</h3>
          <p>
            Instala Cuenca en tu propio servidor, gratis y sin máximo de servidores por persona. Tú te encargas del
            servidor: copias de seguridad, actualizaciones y seguridad.
          </p>
          <a class="guide-link" :href="selfHostingGuideUrl">
            Lee la guía de autohospedaje <AppIcon class="arrow" name="arrowRight" />
          </a>
        </div>
        <p class="status">Disponible</p>
      </aside>

      <h3 class="compare-title" data-reveal>Compara los planes en detalle</h3>
      <div
        class="table-wrap"
        role="region"
        aria-labelledby="planes-tabla"
        tabindex="0"
        data-reveal
      >
        <table>
          <caption id="planes-tabla">Comparación de los planes de Cuenca</caption>
          <thead>
            <tr>
              <td class="corner"></td>
              <th v-for="plan in plans" :key="plan.name" scope="col">
                <span class="plan-name">{{ plan.name }}</span>
                <span class="plan-summary">{{ plan.summary }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td v-for="(value, i) in row.values" :key="i">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="hint">En pantallas pequeñas, desliza la tabla hacia los lados para ver todos los planes.</p>

      <div class="block">
        <h3 data-reveal>Ejemplos</h3>
        <ul class="scenarios">
          <li v-for="(s, i) in scenarios" :key="s.title" class="card scenario" data-reveal :style="{ '--i': i }">
            <p class="tag">{{ s.plan }}</p>
            <h4>{{ s.title }}</h4>
            <p>{{ s.text }}</p>
          </li>
        </ul>
      </div>

      <div class="block" data-reveal>
        <h3>Preguntas frecuentes</h3>
        <div class="faqs">
          <details v-for="f in faqs" :key="f.q">
            <summary>{{ f.q }}</summary>
            <p>
              {{ f.a }}
              <a v-if="f.link" class="guide-link" :href="f.link.href">{{ f.link.text }}</a>
            </p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.plans {
  border-block: 1px solid var(--line);
  background: var(--sunken);
}

.cards {
  display: grid;
  gap: var(--s4);
  margin: clamp(2.5rem, 5vw, 4rem) 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 860px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }
}

.cards > li {
  display: flex;
}

.plan-card {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  background: var(--surface);
  transition:
    transform var(--dur-3) var(--ease-out),
    box-shadow var(--dur-3) var(--ease-out);
}

.plan-card:hover {
  box-shadow: var(--shadow-raised);
  transform: translateY(-3px);
}

/* The shared plan uses the app's dark balance-card surface, in both themes. */
.plan-card.familiar {
  border-color: var(--header-surface);
  background: var(--header-surface);
  color: var(--on-header);
}

.plan-card.familiar .audience,
.plan-card.familiar .features {
  color: var(--on-header-muted);
}

.plan-card.familiar .features {
  border-top-color: rgb(255 255 255 / 0.14);
}

.plan-card.familiar .features span {
  color: var(--on-header);
}

.plan-card.familiar .status {
  border-color: rgb(255 255 255 / 0.3);
}

.plan-card.familiar .why {
  color: #f0b34b;
}

/* Subgrid lines up name, price, status and features across the cards. */
@media (min-width: 860px) {
  .cards {
    grid-template-rows: repeat(6, auto);
    row-gap: 0;
  }

  .cards > li,
  .plan-card {
    display: grid;
    grid-row: span 6;
    grid-template-rows: subgrid;
  }

  .plan-card h3 {
    grid-row: 1;
  }

  .audience {
    grid-row: 2;
  }

  .price {
    grid-row: 3;
  }

  .plan-card .status {
    grid-row: 4;
  }

  .why {
    grid-row: 5;
  }

  .features {
    grid-row: 6;
  }
}

.plan-card h3 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.audience {
  margin-top: var(--s2);
  color: var(--ink-2);
  font-size: 0.98rem;
}

.price {
  margin-top: var(--s5);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.status {
  align-self: flex-start;
  justify-self: start;
  margin-top: var(--s4);
  padding: 0.3rem 0.85rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-pill);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 600;
}

.why {
  margin-top: var(--s4);
  color: var(--amber);
  font-size: 0.95rem;
  font-weight: 500;
}

.features {
  display: grid;
  align-content: start;
  gap: 0.6rem;
  margin: var(--s5) 0 0;
  padding: var(--s5) 0 0;
  border-top: 1px solid var(--line);
  list-style: none;
  font-size: 0.97rem;
}

.features li {
  display: flex;
  gap: 0.6rem;
}

.features svg {
  flex: none;
  width: 1.15rem;
  height: 1.15rem;
  margin-top: 0.2rem;
  color: var(--amber-fill);
}

.selfhost {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4) var(--s7);
  margin-top: var(--s4);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-xl);
  background: var(--surface);
}

.selfhost h3 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
}

.selfhost p:not(.status) {
  max-width: 62ch;
  margin-top: var(--s1);
  color: var(--ink-2);
}

.selfhost .status {
  margin-top: 0;
}

.guide-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink);
  font-family: var(--font-ui);
  font-weight: 600;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  transition: text-decoration-color var(--dur-2) var(--ease-out);
}

.selfhost .guide-link {
  margin-top: var(--s3);
}

.guide-link:hover {
  text-decoration-color: var(--amber-fill);
}

.guide-link .arrow {
  width: 1rem;
  height: 1rem;
  transition: transform var(--dur-3) var(--ease-out);
}

.guide-link:hover .arrow {
  transform: translateX(3px);
}

@media (prefers-reduced-motion: reduce) {
  .guide-link:hover .arrow {
    transform: none;
  }
}

.compare-title,
.block > h3 {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 2.5vw + 1rem, 2.75rem);
  font-weight: 400;
  letter-spacing: -0.01em;
}

.compare-title {
  margin-top: clamp(4rem, 8vw, 6rem);
}

.table-wrap {
  margin-top: var(--s6);
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

table {
  width: 100%;
  min-width: 44rem;
  border-collapse: collapse;
  font-size: 0.95rem;
  line-height: 1.5;
}

caption {
  padding: var(--s5) var(--s5) 0;
  color: var(--muted);
  font-size: 0.9rem;
  text-align: left;
}

th,
td {
  padding: 0.95rem 1.1rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

tbody tr:last-child > * {
  border-bottom: 0;
}

tbody tr {
  transition: background-color var(--dur-2) var(--ease-out);
}

tbody tr:hover,
tbody tr:hover th {
  background: var(--sunken);
}

thead th,
.corner {
  width: 25%;
}

/* Keeps the row labels visible while the table scrolls sideways. */
tbody th {
  position: sticky;
  left: 0;
  background: var(--surface);
  font-family: var(--font-ui);
  font-weight: 600;
  transition: background-color var(--dur-2) var(--ease-out);
}

td {
  color: var(--ink-2);
}

.plan-name {
  display: block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
}

.plan-summary {
  display: block;
  margin-top: var(--s1);
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 400;
}

.hint {
  margin-top: var(--s3);
  color: var(--muted);
  font-size: 0.9rem;
}

@media (min-width: 1000px) {
  .hint {
    display: none;
  }
}

.block {
  margin-top: clamp(4rem, 8vw, 6rem);
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: var(--s4);
  margin: var(--s6) 0 0;
  padding: 0;
  list-style: none;
}

.scenario {
  padding: var(--s6);
  border-radius: var(--radius-lg);
  transition:
    transform var(--dur-3) var(--ease-out),
    border-color var(--dur-2) var(--ease-out);
}

.scenario:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
}

.tag {
  color: var(--amber);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h4 {
  margin-top: var(--s2);
  font-size: 1.1rem;
}

.scenario p:last-child {
  margin-top: var(--s2);
  color: var(--ink-2);
  font-size: 0.98rem;
}

.faqs {
  display: grid;
  gap: var(--s3);
  max-width: 52rem;
  margin-top: var(--s6);
}

details {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface);
  transition: border-color var(--dur-2) var(--ease-out);
}

details:hover,
details[open] {
  border-color: var(--line-strong);
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  padding: var(--s4) var(--s5);
  cursor: pointer;
  font-family: var(--font-ui);
  font-weight: 600;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

/* Plus that turns into a minus. */
summary::after {
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
  background:
    linear-gradient(currentColor, currentColor) center / 100% 1.5px no-repeat,
    linear-gradient(currentColor, currentColor) center / 1.5px 100% no-repeat;
  content: '';
  transition: transform var(--dur-3) var(--ease-out);
}

details[open] summary::after {
  transform: rotate(135deg);
}

details p {
  padding: 0 var(--s5) var(--s5);
  color: var(--ink-2);
}

/* Height animation for the answers where the browser supports it; elsewhere they open instantly. */
@supports (interpolate-size: allow-keywords) {
  details {
    interpolate-size: allow-keywords;
  }

  details::details-content {
    height: 0;
    overflow: clip;
    transition:
      height var(--dur-3) var(--ease-out),
      content-visibility var(--dur-3) allow-discrete;
  }

  details[open]::details-content {
    height: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plan-card:hover,
  .scenario:hover {
    transform: none;
  }

  details::details-content {
    transition: none;
  }
}
</style>
