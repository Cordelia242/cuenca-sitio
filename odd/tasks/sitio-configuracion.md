# Configuración del sitio (landing Vue + guía MkDocs en GitHub Pages)

## Objetivo
Esqueleto y pipeline del repo público `cuenca-sitio`: landing Vite + Vue 3 + TS en la raíz de Pages y guía MkDocs Material bajo `/guia/`, publicados con GitHub Actions.

## Alcance
- Incluye: `landing/`, `guia/`, workflows de publicación y de PR, Dependabot, `.gitignore`, README, activar Pages con build type `workflow`.
- Excluye: contenido real de la guía, diseño de la landing, licencia (pendiente de que decida la persona usuaria).

## Restricciones
Repo público: sin secretos, rutas locales ni código del repo privado. PR a `main`, sin push directo. Commits en español con Conventional Commits.

## TDD
Modo: no aplica (solo configuración y andamiaje, sin lógica). Las comprobaciones funcionales son el build de la landing, `mkdocs build --strict` y una prueba de servidor local bajo el subpath.

## Tareas
- [x] T1 Landing Vite + Vue 3 + TS con `base: '/cuenca-sitio/'` y lockfile (inline: archivos de configuración mecánicos)
- [x] T2 Guía MkDocs Material: `mkdocs.yml`, índice y 3 secciones de relleno, `requirements.txt` fijado (inline)
- [x] T3 Workflows `publicar.yml` y `verificar.yml`, Dependabot, `.gitignore`, README (inline)
- [x] T4 Verificación local: ambos builds y servir la salida combinada bajo `/cuenca-sitio/`
- [x] T5 Activar Pages (build type `workflow`) y abrir el PR

## Criterios de aceptación
PR abierto, ambos builds en verde en local, workflows presentes, Pages configurado para Actions, evidencia de la vista previa local.

## Progreso
- T1: `npm run build` (vue-tsc + vite) OK; `dist/index.html` referencia `/cuenca-sitio/...`. Commit 8d29126.
- T2: `mkdocs build --strict` OK. Commit 541554c.
- T3: workflows, Dependabot, `.gitignore`, README. Commit en la rama: `ci: publicar en GitHub Pages y verificar builds en cada PR`.
- T4: salida combinada servida con `python -m http.server` bajo `/cuenca-sitio/`: landing, assets, favicon, las 4 páginas de la guía, índice de búsqueda y sitemap responden 200; todos los recursos relativos de `/guia/` responden 200; canonical = `https://cordelia242.github.io/cuenca-sitio/guia/`.
- T5: Pages activado con `build_type: workflow`; PR #1 abierto.

## Siguiente paso
Revisión y merge del PR #1 por el coordinador; el merge dispara el primer despliegue. Pendiente: licencia y revisión nativa RDD (bloqueada por `managed_assets_outdated`).
