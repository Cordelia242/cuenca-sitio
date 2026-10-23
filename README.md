# cuenca-sitio

Sitio público de [Cuenca](https://panel.cuenca.app), la app para presupuestar el día a día. Incluye:

- **Página de la app** (`landing/`): hecha con Vite, Vue 3 y TypeScript. Incluye la sección **Planes** (`#planes`), con la comparación de los planes, ejemplos y preguntas frecuentes; muestra el plan Familiar a USD 3 al mes como precio informativo (todavía no se puede comprar; el precio vigente será el de cada tienda).
- **Guía de uso** (`guia/`): guía para personas usuarias, hecha con MkDocs Material.
- **Política de privacidad** (`guia/docs/privacidad.md`): página pública de la guía en <https://cuenca.app/guia/privacidad/>, enlazada desde el pie de la página y desde la sección Privacidad. Es la URL que se declara en Google Play.

Se publica en Cloudflare Pages: <https://cuenca.app/> (la guía está en <https://cuenca.app/guia/>).

## Vista previa local

### Página de la app

Requiere Node.js 22.18 o superior.

```sh
cd landing
npm ci
npm run dev
```

### Guía

Requiere Python 3.

```sh
cd guia
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Cada vista previa funciona por separado. El enlace de la página a la guía solo funciona en el sitio publicado o en la salida combinada.

### Salida combinada (como en Cloudflare Pages)

```sh
(cd landing && npm ci && npm run build)
(cd guia && mkdocs build --strict)
scripts/combinar-sitio.sh
python -m http.server --directory _site 8000
```

Abre <http://localhost:8000/>. [`scripts/combinar-sitio.sh`](scripts/combinar-sitio.sh) copia la landing en la raíz de `_site/`, la guía en `_site/guia/` y [`cloudflare/_headers`](cloudflare/_headers) en la raíz. Falla si falta `/guia/privacidad/` o si la salida supera los límites del plan gratis de Cloudflare Pages (20.000 archivos, 25 MiB por archivo, 100 reglas en `_headers`).

El servidor de Python no aplica `_headers` ni la página 404. Para probarlos sin cuenta de Cloudflare: `npx wrangler pages dev _site` (no usa credenciales).

## Publicación

- Cada push a `main` ejecuta el workflow [`publicar.yml`](.github/workflows/publicar.yml). El job `build` construye la página y la guía sin acceso a secretos, las combina con `scripts/combinar-sitio.sh` y sube `_site/` como artefacto. El job `deploy` usa el entorno `production` de GitHub (con los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`) y publica ese artefacto en el proyecto `cuenca-sitio` de Cloudflare Pages con `wrangler pages deploy`. También se puede lanzar a mano desde la pestaña *Actions*; solo publica si se lanza sobre `main`.
- Cada pull request ejecuta [`verificar.yml`](.github/workflows/verificar.yml), que construye ambas partes sin secretos. La guía se construye con `--strict`, así que un enlace roto hace fallar el PR antes del merge.
- Los dos workflows ejecutan [`scripts/verificar-marcadores.sh`](scripts/verificar-marcadores.sh), que falla si la política de privacidad todavía tiene marcadores como `[CORREO DE CONTACTO]`. En `publicar.yml` corre antes de construir, así que un marcador pendiente impide publicar.
- [`cloudflare/_headers`](cloudflare/_headers) define las cabeceras de seguridad (CSP, HSTS sin `includeSubDomains`, `X-Frame-Options`, etc.), la caché de un año para los archivos con hash de `/assets/` y `noindex` para las copias en `*.pages.dev`. La guía tiene su propia CSP porque MkDocs Material usa scripts en línea. No hay `_redirects`.
- Dependabot propone cada semana actualizaciones agrupadas de npm, pip y GitHub Actions. La versión de Wrangler está fijada en `publicar.yml` (`wranglerVersion`) y se actualiza a mano.

## Configuración inicial de Cloudflare (una sola vez)

Ya están hechos: el proyecto de Pages `cuenca-sitio`, con la rama de producción `main`, y el dominio personalizado `cuenca.app` con su `CNAME`. Al crearlo no se tocaron los registros `MX` ni `TXT` de Email Routing, y no hay que tocarlos en ningún cambio del sitio.

La rama de producción se configura en el proyecto de Pages (panel de Cloudflare > *Workers & Pages* > `cuenca-sitio` > *Settings*). Debe coincidir con el `--branch=main` de `publicar.yml`: un deploy con otra rama queda como vista previa, no en `cuenca.app`. Si cambia una, hay que cambiar la otra.

Quedan estos pasos, que hace la persona dueña de las cuentas en este orden. Ningún workflow los hace:

1. **Token de API.** *Manage account* > *Account API Tokens* > *Create Token* > *Custom token*. Un solo permiso: *Account* · *Cloudflare Pages* · *Edit*, limitado a esta cuenta. Sin permisos de zona ni de DNS.
2. **Secretos en GitHub.** En el repo, *Settings* > *Environments* > *New environment* `production`. En *Deployment branches and tags*, elige *Selected branches and tags* y agrega solo `main`. Agrega los secretos del entorno (no del repo) `CLOUDFLARE_API_TOKEN` (el token del paso 1) y `CLOUDFLARE_ACCOUNT_ID` (está en la página de la cuenta o de la zona, en *API*).
3. **Primera publicación.** El merge a `main` lanza `publicar.yml`. Si falló porque faltaba algo de lo anterior, vuelve a lanzarlo en *Actions* > *Publicar* > *Run workflow* sobre `main`. Comprueba <https://cuenca.app/> y <https://cuenca.app/guia/privacidad/>.

## Retiro de GitHub Pages

GitHub Pages deja de recibir publicaciones al quitar el workflow anterior, pero el último sitio sigue en línea hasta desactivarlo. Cuando <https://cuenca.app/guia/privacidad/> funcione y Google Play use esa URL:

1. En el repo, *Settings* > *Pages* > *Unpublish site* (o deja la fuente en *None*). Esto apaga <https://cordelia242.github.io/cuenca-sitio/>, que pasa a dar 404.
2. Borra el entorno `github-pages` en *Settings* > *Environments*.
3. Si en *Settings* > *Pages* había un dominio personalizado, quítalo, y borra en el DNS los registros que apuntaban a GitHub Pages (`A` 185.199.108.153–185.199.111.153, `AAAA` 2606:50c0:8000::153–8003::153 o `CNAME` a `cordelia242.github.io`). El repo no tiene archivo `CNAME`.
