<script setup lang="ts">
const plans = [
  { name: 'Gratis', summary: 'La app en tu teléfono, sin cuenta' },
  { name: 'Individual', summary: 'Tus espacios en todos tus dispositivos' },
  { name: 'Compartido', summary: 'Un espacio para hasta 5 personas' },
  { name: 'Autohospedado', summary: 'Cuenca en tu propio servidor', soon: true },
]

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
      'Si quien paga tiene un Individual o una prueba vigente, el espacio vuelve a sus 5 espacios; si no, se pausa para todas las personas. Los datos se conservan 30 días',
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
    a: 'Tus espacios dejan de sincronizar y el web queda en solo lectura, con la opción de exportar tus datos. Los datos en la nube de Cuenca se conservan 30 días y la copia de tu teléfono no se toca. Si vence un Compartido y quien paga tiene un Individual o una prueba vigente, el espacio vuelve a contar entre sus 5 espacios; si no, el espacio se pausa para todas las personas.',
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

.table-wrap {
  margin-top: 3rem;
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
