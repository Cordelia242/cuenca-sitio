#!/usr/bin/env sh
# Release gate: fails while the site (guide and landing) still has placeholders for data only the owner can provide.
# Keep this list in sync with the placeholders used in guia/docs/privacidad.md.
set -u

grep -rnF -e '[NOMBRE DEL RESPONSABLE]' -e '[PAIS]' -e '[CORREO DE CONTACTO]' guia/docs landing/src
status=$?

if [ "$status" -eq 0 ]; then
  echo "::error::Quedan marcadores pendientes en la política de privacidad. Reemplázalos con los datos reales antes de publicar."
  exit 1
fi

# grep exits 1 when nothing matches; any other status means the check could not run.
if [ "$status" -ne 1 ]; then
  echo "::error::No se pudo buscar marcadores pendientes (grep terminó con estado $status)."
  exit 1
fi
