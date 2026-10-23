#!/usr/bin/env sh
# Fails while the privacy policy still has placeholders for data only the owner can provide.
set -eu

if grep -rnF -e '[NOMBRE DEL RESPONSABLE]' -e '[PAIS]' -e '[CORREO DE CONTACTO]' guia/docs landing/src; then
  echo "::error::Quedan marcadores pendientes en la política de privacidad. Reemplázalos con los datos reales antes de publicar."
  exit 1
fi
