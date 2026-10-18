<template>
  <section id="plataformas" class="section" aria-labelledby="plataformas-title">
    <div class="container">
      <div data-reveal>
        <p class="eyebrow">Teléfono y web</p>
        <h2 id="plataformas-title">En el bolsillo y en el escritorio</h2>
        <p class="lede">Con una cuenta, tus espacios se sincronizan entre tus dispositivos.</p>
      </div>

      <div class="cols">
        <article class="col" data-reveal>
          <svg class="art phone" viewBox="0 0 160 260" role="img" aria-label="Ilustración de un teléfono con un presupuesto y un reloj Wear OS">
            <rect x="20" y="8" width="104" height="220" rx="18" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" />
            <rect x="52" y="16" width="40" height="5" rx="2.5" fill="var(--line)" />
            <text x="34" y="52" font-size="9" fill="var(--muted)" font-family="system-ui, sans-serif">Disponible</text>
            <text x="34" y="74" font-size="18" font-weight="700" fill="var(--ink)" font-family="system-ui, sans-serif">Bs 0</text>
            <g>
              <rect x="34" y="96" width="76" height="8" rx="4" fill="var(--water-soft)" />
              <rect x="34" y="96" width="76" height="8" rx="4" fill="var(--water)" />
              <rect x="34" y="120" width="76" height="8" rx="4" fill="var(--water-soft)" />
              <rect x="34" y="120" width="52" height="8" rx="4" fill="var(--water)" />
              <rect x="34" y="144" width="76" height="8" rx="4" fill="var(--water-soft)" />
              <rect x="34" y="144" width="26" height="8" rx="4" fill="var(--water)" />
            </g>
            <rect x="34" y="176" width="76" height="30" rx="15" fill="var(--clay)" />
            <text x="72" y="195" font-size="10" text-anchor="middle" fill="var(--bg)" font-weight="700" font-family="system-ui, sans-serif">+ Gasto</text>
            <rect x="134" y="104" width="10" height="14" rx="2" fill="var(--ink)" />
            <rect x="134" y="152" width="10" height="14" rx="2" fill="var(--ink)" />
            <rect x="128" y="116" width="26" height="38" rx="9" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="2" />
            <circle cx="141" cy="135" r="4" fill="var(--sun)" />
          </svg>
          <h3>App para Android</h3>
          <p>
            Registra al momento, incluso sin conexión; atajos en la pantalla de inicio y en tu reloj Wear OS.
          </p>
        </article>

        <article class="col" data-reveal style="--i: 1">
          <svg class="art desk" viewBox="0 0 320 220" role="img" aria-label="Ilustración de una computadora con el cliente web de Cuenca y una paleta de comandos">
            <rect x="10" y="10" width="300" height="168" rx="12" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" />
            <rect x="22" y="22" width="68" height="144" rx="6" fill="var(--surface-2)" />
            <rect x="30" y="34" width="52" height="6" rx="3" fill="var(--line)" />
            <rect x="30" y="50" width="40" height="6" rx="3" fill="var(--line)" />
            <rect x="30" y="66" width="48" height="6" rx="3" fill="var(--line)" />
            <g fill="var(--water-soft)">
              <rect x="102" y="22" width="92" height="46" rx="8" />
              <rect x="204" y="22" width="92" height="46" rx="8" />
            </g>
            <polyline points="104,140 128,116 150,128 176,96 198,106 224,84 250,92 292,70" fill="none" stroke="var(--water)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
            <rect x="96" y="76" width="124" height="26" rx="8" fill="var(--bg)" stroke="var(--clay)" stroke-width="1.5" />
            <text x="106" y="93" font-size="10" fill="var(--muted)" font-family="system-ui, sans-serif">Paleta de comandos</text>
            <path d="M110 178v16M210 178v16M90 196h140" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" />
          </svg>
          <h3>Cliente web para computadora</h3>
          <p>
            Pensado para pantallas grandes y teclado, con paleta de comandos y atajos; para revisar el mes con calma.
            Requiere iniciar sesión con Google.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cols {
  display: grid;
  gap: 1.5rem;
  margin-top: 3rem;
}

@media (min-width: 860px) {
  .cols {
    grid-template-columns: 0.8fr 1.2fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.art {
  align-self: center;
  width: 100%;
  margin-bottom: 1rem;
}

.phone {
  max-width: 10rem;
}

.desk {
  max-width: 22rem;
}

.col p {
  color: var(--muted);
}
</style>
