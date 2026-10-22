<script setup lang="ts">
const plans = [
  { name: 'Gratis', summary: 'La app en tu teléfono, sin cuenta' },
  { name: 'Individual', summary: 'Tus espacios en todos tus dispositivos' },
  { name: 'Compartido', summary: 'Un espacio para hasta 5 personas' },
  { name: 'Autohospedado', summary: 'Cuenca en tu propio servidor', soon: true },
]

// Summary cards shown above the table; the featured one is highlighted as best value.
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
    id: 'individual',
    name: 'Individual',
    audience: 'Para tener tus cuentas en todos tus dispositivos',
    price: 'Precio por anunciar',
    status: 'Próximamente',
    featured: true,
    why: 'Incluye la sincronización, tu espacio Personal y 5 espacios más, y el web completo.',
    features: [
      'Sincronización entre tus dispositivos',
      'Tu espacio Personal y 5 espacios más',
      'Acceso completo al web',
      'Comparte espacios con personas que tienen su suscripción',
      'Prueba gratis de un mes',
    ],
  },
  {
    id: 'compartido',
    name: 'Compartido',
    audience: 'Para compartir un espacio con tu pareja, tu familia o tus amistades',
    price: 'Precio por anunciar, por espacio',
    status: 'Próximamente',
    features: [
      'Un espacio compartido con hasta 5 personas',
      'Solo paga quien contrata el espacio',
      'Cada persona sincroniza también su Personal',
      'Web del espacio compartido',
      'Se puede tener junto con el Individual',
    ],
  },
]

const checkIcon = 'M5 12.5l4.5 4.5L19 7.5'

// One entry per table row; `values` follows the order of `plans`.
const rows = [
  {
    label: 'Precio',
    values: ['Gratis', 'Precio por anunciar', 'Precio por anunciar, por espacio', 'Gratis. Pagas tu propio servidor'],
  },
  {
    label: 'Dónde se guardan tus datos',
    values: ['Solo en tu teléfono', 'En la nube de Cuenca', 'En la nube de Cuenca', 'En tu servidor'],
  },
  {
    label: 'Sincronización entre dispositivos',
    values: ['No', 'Sí', 'Sí, del espacio compartido y del Personal de cada persona', 'Sí, con tu servidor'],
  },
  {
    label: 'Espacios sincronizados',
    values: [
      'Ninguno',
      'Tu Personal y 5 espacios más. Los espacios de otras personas a los que te unes no cuentan',
      'El espacio compartido y el Personal de cada persona. No ocupa uno de los 5 espacios del Individual de quien paga',
      'Sin límite',
    ],
  },
  {
    label: 'Acceso al web',
    values: ['No', 'Sí, completo', 'Sí, solo al espacio compartido. El Personal se usa en la app', 'Sí, el web de tu servidor'],
  },
  {
    label: 'Compartir espacios',
    values: [
      'No',
      'Sí, con personas que también tienen su propia suscripción',
      'Sí, ese espacio, con hasta 5 personas además de quien paga',
      'Sí, con las personas de tu servidor',
    ],
  },
  {
    label: 'Quién necesita suscripción',
    values: [
      'Nadie',
      'Tú y cada persona con la que compartes',
      'Solo quien paga el espacio. Cada persona invitada ocupa un lugar, aunque ya tenga su Individual',
      'Nadie',
    ],
  },
  {
    label: 'Prueba gratis',
    values: ['No aplica', 'Un mes', 'No tiene', 'No aplica'],
  },
  {
    label: 'Al vencer',
    values: [
      'No vence',
      'Dejan de sincronizar; el web queda en solo lectura con exportación y los datos se conservan 30 días en la nube',
      'Si quien paga tiene un Individual vigente (la prueba gratis cuenta), el espacio vuelve al cupo de su Individual; si no, se pausa para todas las personas. Los datos se conservan 30 días',
      'No vence. Las copias de seguridad son tuyas',
    ],
  },
]

const scenarios = [
  {
    title: 'Una persona sola',
    plan: 'Gratis o Individual',
    text: 'Sin pagar, Ana usa la app en su teléfono y todo queda guardado ahí, sin web. Si contrata el Individual, su Personal y hasta 5 espacios más se sincronizan en todos sus dispositivos y en el web completo.',
  },
  {
    title: 'Una pareja en la que ambas personas pagan el Individual',
    plan: 'Dos Individual',
    text: 'Beto y Carla tienen cada uno su Individual. Beto comparte el espacio «Casa» con Carla: para Beto, «Casa» es uno de sus 5 espacios; para Carla no cuenta, porque es de Beto. Ambos tienen el web completo.',
  },
  {
    title: 'Una pareja en la que solo una persona paga',
    plan: 'Un Compartido',
    text: 'Dana contrata el Compartido para «Casa» e invita a Eli, que no paga. Cada uno sincroniza «Casa» y su propio Personal, y en el web ambos ven solo «Casa». Eli ocupa 1 de los 5 lugares.',
  },
  {
    title: 'Una persona invitada sin suscripción',
    plan: 'Invitada a un Compartido',
    text: 'Fabi no paga nada y se une al espacio «Viaje», que su amiga cubre con un Compartido. Sincroniza «Viaje» y su Personal, y en el web ve solo «Viaje». Si el plan de su amiga vence, «Viaje» queda en solo lectura para Fabi y los datos se conservan 30 días.',
  },
]

const faqs = [
  {
    q: '¿Qué pasa si no pago?',
    a: 'Nada cambia en tu día a día: la app es gratuita y funciona en tu teléfono sin cuenta ni internet. Tus datos se quedan solo en ese teléfono; no se sincronizan con otros dispositivos ni tienes acceso al web.',
  },
  {
    q: '¿Qué pasa cuando vence mi plan?',
    a: 'Tus espacios dejan de sincronizar y el web queda en solo lectura, con la opción de exportar tus datos. Los datos en la nube de Cuenca se conservan 30 días y la copia de tu teléfono no se toca. Si vence un Compartido y quien paga tiene un Individual vigente (la prueba gratis cuenta como Individual vigente), el espacio vuelve al cupo de su Individual; si no tiene un Individual vigente, el espacio se pausa para todas las personas.',
  },
  {
    q: '¿Puedo tener el Individual y el Compartido a la vez?',
    a: 'Sí. Son dos planes distintos. Un espacio cubierto por el Compartido no ocupa uno de los 5 espacios de tu Individual.',
  },
  {
    q: '¿Puedo mezclar espacios en la nube de Cuenca y en mi propio servidor?',
    a: 'Cada espacio elige dónde vive: solo en tu teléfono, en la nube de Cuenca o en un servidor propio. La app compilada desde el código fuente puede mezclar espacios en la nube y en uno o varios servidores propios. La app de las tiendas, por ahora, no se conecta a servidores propios. Cada web habla con un solo servidor: el web de Cuenca muestra los espacios de la nube y el web de tu servidor, los de ese servidor.',
  },
  {
    q: '¿Cuándo estará disponible el autohospedaje?',
    a: 'Próximamente. Se ofrecerá gratis, como imágenes Docker del web y del servidor, sin límite de personas. Quien lo instala se encarga del servidor: copias de seguridad, actualizaciones y seguridad.',
  },
  {
    q: '¿Cuánto costarán los planes?',
    a: 'Los precios del Individual y del Compartido están por anunciar. La app gratuita seguirá siendo gratuita.',
  },
]
</script>

<template>
  <section id="planes" class="section plans" aria-labelledby="planes-title">
    <div class="container">
      <div data-reveal>
        <p class="eyebrow">Planes</p>
        <h2 id="planes-title">Elige cómo usar Cuenca</h2>
        <p class="lede">
          La app es gratis y funciona en tu teléfono. Si quieres tus datos en varios dispositivos, en el web o compartidos
          con otras personas, elige un plan. Los precios están por anunciar.
        </p>
      </div>

      <ul class="cards">
        <li v-for="(card, i) in cards" :key="card.id" data-reveal :style="{ '--i': i }">
          <article
            class="plan-card"
            :class="{ featured: card.featured }"
            :aria-labelledby="card.featured ? `plan-${card.id} plan-${card.id}-badge` : `plan-${card.id}`"
          >
            <p v-if="card.featured" :id="`plan-${card.id}-badge`" class="best">Mejor valor</p>
            <h3 :id="`plan-${card.id}`">{{ card.name }}</h3>
            <p class="audience">{{ card.audience }}</p>
            <p class="price">{{ card.price }}</p>
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

      <aside class="selfhost" aria-labelledby="plan-autohospedado" data-reveal>
        <div>
          <h3 id="plan-autohospedado">Autohospedado</h3>
          <p>
            Instala Cuenca en tu propio servidor, gratis y sin límite de personas. Tú te encargas del servidor: copias de
            seguridad, actualizaciones y seguridad.
          </p>
        </div>
        <p class="status">Próximamente</p>
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
                <span v-if="plan.soon" class="badge">Próximamente</span>
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

      <div class="block" data-reveal>
        <h3>Ejemplos</h3>
        <ul class="scenarios">
          <li v-for="s in scenarios" :key="s.title" class="card">
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
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans {
  background: var(--surface-2);
  border-block: 1px solid var(--line);
}

.cards {
  display: grid;
  gap: 1.25rem;
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 860px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
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
  padding: 1.75rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.plan-card.featured {
  border: 2px solid var(--accent);
  background: color-mix(in srgb, var(--accent-soft) 45%, var(--surface));
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent),
    0 18px 40px -24px rgb(0 0 0 / 0.35);
}

/* Subgrid lines up badge, name, price, status and features across the three cards. */
@media (min-width: 860px) {
  .cards {
    grid-template-rows: repeat(7, auto);
    row-gap: 0;
  }

  .cards > li,
  .plan-card {
    display: grid;
    grid-row: span 7;
    grid-template-rows: subgrid;
  }

  .best {
    grid-row: 1;
  }

  .plan-card h3 {
    grid-row: 2;
  }

  .audience {
    grid-row: 3;
  }

  .price {
    grid-row: 4;
  }

  .plan-card .status {
    grid-row: 5;
  }

  .why {
    grid-row: 6;
  }

  .features {
    grid-row: 7;
  }

  .plan-card.featured {
    transform: translateY(-0.5rem);
  }
}

.best {
  align-self: flex-start;
  justify-self: start;
  margin-bottom: 0.75rem;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  background: var(--accent);
  color: var(--on-accent);
  font-size: 0.8rem;
  font-weight: 600;
}

.plan-card h3 {
  font-size: 1.6rem;
}

.audience {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.98rem;
}

.price {
  margin-top: 1.25rem;
  font-family: var(--display);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.status {
  align-self: flex-start;
  justify-self: start;
  margin-top: 1rem;
  padding: 0.35rem 0.9rem;
  border: 1.5px solid var(--muted);
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
}

.why {
  margin-top: 1rem;
  color: var(--accent-text);
  font-size: 0.95rem;
  font-weight: 500;
}

.features {
  display: grid;
  align-content: start;
  gap: 0.6rem;
  margin: 1.25rem 0 0;
  padding: 1.25rem 0 0;
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
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.15rem;
  color: var(--accent-text);
}

.selfhost {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  margin-top: 1.25rem;
  padding: 1.5rem;
  border: 1px dashed var(--muted);
  border-radius: var(--radius);
  background: var(--surface);
}

.selfhost h3 {
  font-size: 1.3rem;
}

.selfhost p:not(.status) {
  max-width: 62ch;
  margin-top: 0.4rem;
  color: var(--muted);
}

.selfhost .status {
  margin-top: 0;
}

.compare-title {
  margin-top: 4rem;
  font-size: clamp(1.4rem, 2vw + 0.8rem, 1.9rem);
}

.table-wrap {
  margin-top: 1.5rem;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

table {
  width: 100%;
  min-width: 52rem;
  border-collapse: collapse;
  font-size: 0.95rem;
  line-height: 1.5;
}

caption {
  padding: 1.25rem 1.25rem 0;
  color: var(--muted);
  font-size: 0.9rem;
  text-align: left;
}

th,
td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

tbody tr:last-child > * {
  border-bottom: 0;
}

thead th {
  width: 20%;
}

.corner {
  width: 20%;
}

/* Keeps the row labels visible while the table scrolls sideways. */
tbody th {
  position: sticky;
  left: 0;
  background: var(--surface);
  font-weight: 600;
}

td {
  color: var(--muted);
}

.plan-name {
  display: block;
  font-family: var(--display);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.plan-summary {
  display: block;
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 400;
}

.badge {
  display: inline-block;
  margin-top: 0.35rem;
  padding: 0.1rem 0.6rem;
  border: 1px solid var(--accent-text);
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 600;
}

.hint {
  margin-top: 0.75rem;
  color: var(--muted);
  font-size: 0.9rem;
}

@media (min-width: 1000px) {
  .hint {
    display: none;
  }
}

.block {
  margin-top: 4rem;
}

.block > h3 {
  font-size: clamp(1.4rem, 2vw + 0.8rem, 1.9rem);
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.card {
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.tag {
  color: var(--accent-text);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h4 {
  margin: 0.5rem 0 0;
  font-family: var(--display);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.25;
}

.card p:last-child {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.98rem;
}

.faqs {
  display: grid;
  gap: 0.75rem;
  max-width: 52rem;
  margin-top: 1.5rem;
}

details {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

summary {
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-weight: 600;
}

details p {
  padding: 0 1.25rem 1.1rem;
  color: var(--muted);
}
</style>
