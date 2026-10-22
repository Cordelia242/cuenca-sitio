# cuenca-sitio

Sitio público de [Cuenca](https://cuenca.symm3try.net), la app para presupuestar el día a día. Incluye:

- **Página de la app** (`landing/`): hecha con Vite, Vue 3 y TypeScript. Incluye la sección **Planes** (`#planes`), con la comparación de los planes, ejemplos y preguntas frecuentes; es solo informativa y no muestra precios.
- **Guía de uso** (`guia/`): guía para personas usuarias, hecha con MkDocs Material.

Se publica en GitHub Pages: <https://cordelia242.github.io/cuenca-sitio/> (la guía está en `/guia/`).

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

### Salida combinada (como en GitHub Pages)

```sh
(cd landing && npm run build)
(cd guia && mkdocs build --strict)
mkdir -p _site/cuenca-sitio
cp -r landing/dist/. _site/cuenca-sitio/
cp -r guia/site _site/cuenca-sitio/guia
python -m http.server --directory _site 8000
```

Abre <http://localhost:8000/cuenca-sitio/>.

## Publicación

- Cada push a `main` ejecuta el workflow [`publicar.yml`](.github/workflows/publicar.yml). Construye la página y la guía, las combina y las despliega en GitHub Pages. También se puede lanzar a mano desde la pestaña *Actions*.
- Cada pull request ejecuta [`verificar.yml`](.github/workflows/verificar.yml), que construye ambas partes. La guía se construye con `--strict`, así que un enlace roto hace fallar el PR antes del merge.
- Dependabot propone cada semana actualizaciones agrupadas de npm, pip y GitHub Actions.
