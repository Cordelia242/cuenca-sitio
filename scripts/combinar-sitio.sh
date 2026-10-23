#!/usr/bin/env sh
# Joins the built landing (root) and guide (/guia/) into _site/, the directory published to Cloudflare Pages,
# and fails if the result breaks a Cloudflare Pages free plan limit.
# Run it from the repository root after `npm run build` in landing/ and `mkdocs build --strict` in guia/.
set -eu

max_files=20000
max_file_bytes=26214400 # 25 MiB
max_header_rules=100

for dir in landing/dist guia/site; do
  if [ ! -d "$dir" ]; then
    echo "::error::Falta $dir. Construye la landing y la guía antes de combinar."
    exit 1
  fi
done

rm -rf _site
mkdir _site
cp -R landing/dist/. _site/
cp -R guia/site _site/guia
cp cloudflare/_headers _site/_headers

# The privacy policy URL is declared in Google Play, so it must keep existing.
if [ ! -f _site/guia/privacidad/index.html ]; then
  echo "::error::Falta /guia/privacidad/, la URL de la política de privacidad declarada en Google Play."
  exit 1
fi

files=$(find _site -type f | wc -l | tr -d ' ')
if [ "$files" -gt "$max_files" ]; then
  echo "::error::_site tiene $files archivos; el plan gratis de Cloudflare Pages admite $max_files."
  exit 1
fi

large=$(find _site -type f -size +"$max_file_bytes"c)
if [ -n "$large" ]; then
  echo "::error::Estos archivos superan los 25 MiB que admite Cloudflare Pages: $large"
  exit 1
fi

# A rule is a line that starts with a URL (not indented and not a comment).
rules=$(grep -cE '^(/|https://)' _site/_headers)
if [ "$rules" -gt "$max_header_rules" ]; then
  echo "::error::_headers tiene $rules reglas; Cloudflare Pages admite $max_header_rules."
  exit 1
fi

echo "Sitio combinado en _site/: $files archivos, $rules reglas en _headers."
