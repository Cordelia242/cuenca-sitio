# Investigación de diseño del sitio

Este documento recoge la investigación previa al rediseño de la página (`landing/`) y de la guía (`guia/`), y las
decisiones de estilo y de movimiento que salieron de ella. La investigación se hizo el 26 de octubre de 2026.

## Cómo se investigó

- Se leyó la estructura de cada página con un lector web (sin estilos ni JS) y sus hojas de estilo públicas, para sacar
  duraciones y curvas reales.
- Los valores de CSS citados están **medidos** en esas hojas. La composición visual se infiere de la estructura y del
  nombre de los recursos, porque no se pudo ver la página renderizada: se marca como **estimado**.
- Las galerías (Awwwards, Godly, Land-book, Lapa Ninja) **no se pudieron observar**: Awwwards no devolvió contenido,
  Land-book y Lapa Ninja respondieron 403 y Godly redirige a otro dominio que no se consultó. No hay conclusiones de galerías.
- Se toman patrones (estructura, jerarquía, principios de movimiento). No se copió ningún recurso, logotipo,
  ilustración, fotografía, texto ni código de estas páginas, y no se enlaza ningún archivo suyo.

## Lo observado

| Página | Estructura y hero | Tipografía | Movimiento (medido en su CSS) | Tema |
| --- | --- | --- | --- | --- |
| [Linear](https://linear.app) | Aviso pequeño sobre un titular centrado y una captura grande de la app debajo; luego tres pilares con leyendas tipo «Fig 0.x», bloques en zigzag, CTA final. | Sans variable de texto, serif de display para titulares, mono para rótulos. | Juego de curvas de Penner como variables; `160ms` con ease-out-quad en hover; `transform .5s cubic-bezier(.32,.72,0,1)`. | Oscuro por defecto, respeta `prefers-color-scheme` y `prefers-reduced-motion`. |
| [Stripe](https://stripe.com) | Hero de texto con dos botones sobre una onda decorativa con imagen estática de respaldo (estimado); logos, rejilla de productos, cifras, carrusel. | — | `--ease: cubic-bezier(.25,1,.5,1)` como curva principal; tarjetas a `800ms`; revelado de gráficos a `300ms`; acordeón a `0.36s`; `animation-timeline: scroll()` dentro de `@supports`. | 85 reglas de `prefers-reduced-motion`. |
| [Vercel](https://vercel.com) | Hero de texto con dos CTA, casos de clientes, novedades. | Geist Sans y Mono. | `150ms` con `cubic-bezier(.4,0,.2,1)` por defecto; popovers `200ms`, overlays `300ms`; `@starting-style` para entradas; cabeceras `sticky` con `backdrop-filter`. | `prefers-color-scheme`. |
| [Raycast](https://www.raycast.com) | Hero de una línea con un gráfico grande rodeado de rótulos; rejilla de tarjetas con pestañas. | Mono en rótulos. | Ease-out-quint `cubic-bezier(.23,1,.32,1)`; `0.2–0.3s` en opacidad, color y transform; mucho vidrio esmerilado. | Oscuro. |
| [Things](https://culturedcode.com/things/) | Hero centrado (logo, título, lema, vídeo); bloques de función con icono; plataformas; testimonios. | Fuente del sistema. | Mínimo: `.1s ease-out` en transform y opacidad, `.2s` en fondo. | `prefers-color-scheme`. |
| [Notion Calendar](https://www.notion.com/product/calendar) | Página de producto con cabecera que reacciona al scroll. | Inter propia. | Escala de duraciones en pasos de 50 ms (100–300 ms); hover `.15s ease-out`; cabecera con animaciones ligadas al scroll en CSS dentro de `@supports`, con fallback por clase. | — |
| [Copilot Money](https://copilot.money) | Hero con lema corto, chips de categorías y un CTA; gasto → patrimonio → precios con interruptor → reseñas → CTA. Capturas de la interfaz como imágenes de producto. | — | `.4s` en color con `cubic-bezier(.44,0,.56,1)`; `prefers-reduced-motion`. | Claro y oscuro. |
| [Monarch](https://www.monarch.com) | No se observó la estructura (redirección no seguida). | Display propia. | Ease-out-circ `cubic-bezier(.075,.82,.165,1)` y `(.4,0,.2,1)`. | — |
| [YNAB](https://www.ynab.com) | Titulares grandes que plantean el problema, prensa, tres pasos, captura de la app, objetivos. | Sans más una display con carácter. | `.2–.4s`; 35 reglas `sticky`; `prefers-reduced-motion`. | — |
| [Mercury](https://mercury.com) | Hero con lema corto y acción principal; bloques de función con ilustraciones; seguridad; CTA. | Una familia propia para texto y display. | `cubic-bezier(.16,0,.13,1)` y `(.2,1,.4,1)`; transición de tema de `.5s`; `view-timeline` y `@starting-style`. | Claro y oscuro con transición. |
| [Revolut](https://www.revolut.com) | No se observó la estructura. | Sans geométrica más Inter. | `200ms ease` en la navegación; un rebote solo en detalles. | — |
| [Apple, MacBook Air](https://www.apple.com/macbook-air/) | Página de producto con navegación local fija. | SF Pro Display. | `cubic-bezier(0.4,0,0.6,1)` dominante; navegación a `0.24s`; los enlaces del menú local se escalonan de 20 en 20 ms; opacidad a `.4–.5s`. | 40 reglas de movimiento reducido. |
| [Arc](https://arc.net) / [The Browser Company](https://thebrowser.company) | arc.net es hoy una página de despedida, no sirve de referente. | Serif clásica con Inter. | `(.4,0,.2,1)` y `(.77,0,.175,1)` a `0.2–0.25s`. | — |

## Soporte de navegadores (octubre de 2026)

- **Animaciones ligadas al scroll** (`animation-timeline: scroll()` y `view()`): Chrome y Edge 115+, Safari 26+; Firefox
  estable sin soporte. Se usan solo dentro de `@supports` y el contenido es visible sin ellas.
  [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- **`@starting-style`**: Baseline 2024. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- **View Transitions en la misma página** (`startViewTransition`): Baseline desde octubre de 2025. **Entre páginas**
  (`@view-transition { navigation: auto }`): Chrome 126 y Safari 18.2, sin Firefox; se usa como mejora progresiva.
  [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

## Patrones adoptados y porqué

1. **Producto real como imagen principal** (Linear, Copilot): el hero muestra una recreación en HTML y CSS de la
   pantalla Inicio de la app, con cifras de ejemplo marcadas como tales. Va al lado del titular y no debajo, porque una
   pantalla de teléfono es alta y en escritorio así el titular y el producto se ven juntos sin hacer scroll.
2. **Titular editorial en serif con texto en sans** (Linear, Browser Company, YNAB): da al sitio una voz propia sin
   salir de la familia de la app, que usa sans en todo.
3. **Orden narrativo de las apps de finanzas** (YNAB, Copilot): día a día (el problema) → funciones → teléfono y web →
   privacidad → cómo funciona → planes → CTA. Es el orden que ya tenía la página; se conserva.
4. **Cómo funciona como relato fijado** (cabeceras y secciones `sticky` de YNAB y Vercel): en escritorio el teléfono
   queda fijo y su pantalla cambia con cada paso. En pantallas chicas los pasos se apilan, cada uno con su estado.
5. **Rejilla tipo bento para funciones** (pilares de Linear, tarjetas de Stripe): una tarjeta grande con una maqueta
   del plan y tarjetas pequeñas con un mosaico de ícono neutro, como las filas de la app.
6. **Cabecera fija que gana borde al hacer scroll** (Notion Calendar, YNAB) y **navegación con el apartado activo
   resaltado** por una píldora que se desliza.
7. **Pocas duraciones con nombre** (Notion Calendar, Stripe): micro-interacciones de 120 a 240 ms, revelados de 700 ms,
   coreografía del hero de 900 ms. Nada pasa de un segundo, salvo la cuenta del número del hero.
8. **Una sola familia de curvas** (Stripe, Raycast): ease-out fuerte para entradas y hover, in-out simétrica para
   cambios de estado. Sin rebotes.
9. **Escalonado corto** (Apple): 70 ms entre hermanos en los revelados.
10. **Efectos ligados al scroll en CSS puro dentro de `@supports`** (Notion Calendar, Stripe): barra de progreso de
    lectura y un paralaje leve. Sin librería de animación.
11. **Transición de tema** (Mercury): el tema nuevo crece en círculo desde el botón con View Transitions; sin soporte o
    con movimiento reducido, cambia al instante.
12. **Movimiento reducido en todo** (todas las páginas revisadas): con `prefers-reduced-motion: reduce` los
    desplazamientos se anulan y queda solo un fundido corto o el estado final.

## Decisiones de estilo propio

- **Paleta**: la de la app, sin cambios. Grises puros para el cromo (`#FAFAFA`, `#FFFFFF`, `#F1F1F1`, `#E4E4E4`,
  `#6B6B6B`, `#111111` y sus equivalentes oscuros), la acción principal en tinta (botón negro en claro, casi blanco en
  oscuro) y el **ámbar** como único acento: el punto de los rótulos de sección, la palabra destacada del titular, las
  barras de progreso y la barra de lectura. El verde y el rojo solo aparecen donde la app los usa, en montos de
  ingreso y gasto.
- **Tipografía**: *Instrument Serif* para titulares (voz editorial del sitio), *Inter* para el texto y *Space Grotesk*
  para cifras, botones y títulos de producto (las dos fuentes de la app). Las tres se sirven desde el propio sitio con
  Fontsource, con fuentes del sistema como respaldo.
- **Forma**: radios de la app (10, 16, 20 y 28 px), sombras suaves negras, bordes de 1 px casi invisibles.
- **Anatomía**: filas con mosaico de ícono, título y subtítulo dentro de tarjetas redondeadas; números grandes de
  display; una sola acción principal por bloque; rótulos de sección pequeños en mayúsculas.
- **Espacio**: mucho aire entre secciones y una rejilla contenida de 1200 px.

## Lenguaje de movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--dur-1` | 120 ms | Pulsar un botón. |
| `--dur-2` | 180 ms | Color y borde en hover, aparición de la píldora de navegación. |
| `--dur-3` | 240 ms | Desplazamientos en hover, íconos del selector de tema, fundido de movimiento reducido. |
| `--dur-reveal` | 700 ms | Revelado al hacer scroll. |
| `--dur-slow` | 900 ms | Coreografía de entrada del hero. |
| `--stagger` | 70 ms | Escalonado entre hermanos. |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entradas, revelados y hover. |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Cambios de estado (tema, pasos de «Cómo funciona»). |

Reglas:

- **Mejora progresiva**: la página se prerenderiza en la compilación, así que se lee entera sin JS. Ningún elemento
  queda oculto esperando a un observer: el revelado solo se aplica a elementos que empiezan fuera de la pantalla y
  cuando ya están entrando en ella.
- **Sin bucles infinitos**: cada animación corre una vez. No hace falta un control de pausa.
- **Solo `transform` y `opacity`** en lo que se mueve, para mantener 60 fps y no provocar saltos de diseño.
- **Movimiento reducido**: entradas y revelados pasan a un fundido de 240 ms; contadores, barras y gráficos muestran
  el estado final; paralaje, barra de lectura y transición de tema se desactivan.
