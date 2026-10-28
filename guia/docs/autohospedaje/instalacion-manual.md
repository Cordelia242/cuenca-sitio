# Instalación manual

Si prefieres no usar el instalador, puedes preparar el servidor a mano con `generar-secretos.sh`, el archivo `.env` y Docker Compose. Para la mayoría de las personas, la [instalación guiada](instalacion.md) es más simple y revisa más cosas por ti.

Haz todo desde la carpeta `deploy/tercero/`.

## 1. Genera las contraseñas

```sh
./generar-secretos.sh
```

Copia `env.example` a `.env`, con las cuatro contraseñas de la base de datos ya generadas y permisos `600` (solo tu usuario lo lee).

- Si `.env` ya existe, no lo toca.
- `./generar-secretos.sh --sobrescribir` lo reemplaza entero.

!!! warning "Cuidado con `--sobrescribir`"
    Si la base de datos ya arrancó una vez, conserva las contraseñas viejas. Con un `.env` nuevo, los servicios no podrían abrir esos datos.

Las contraseñas son hexadecimales a propósito: caracteres como `@`, `/` o `:` romperían las direcciones de conexión internas. No las cambies por otras.

## 2. Completa `.env`

Abre `.env` y completa las variables obligatorias. Si falta alguna, `docker compose` no arranca.

| Variable | Obligatoria | Qué es |
| --- | --- | --- |
| `POSTGRES_PASSWORD`, `CUENCA_GATEWAY_DB_PASSWORD`, `POWERSYNC_DB_PASSWORD`, `POWERSYNC_STORAGE_DB_PASSWORD` | sí | Las contraseñas de la base de datos. Ya las generó el paso 1. |
| `CUENCA_SITIO` | sí | El dominio que sirve el servidor, por ejemplo `cuenca.example.com`. El certificado HTTPS se obtiene solo. |
| `CUENCA_ORIGEN` | sí | La dirección pública, por ejemplo `https://cuenca.example.com`, sin ruta ni barra final. Debe ser exactamente la dirección que registraste en la app. |
| `CUENCA_SERVIDORES_PERMITIDOS` | sí | Los servidorId que aceptas, separados por comas. |
| `CUENCA_CORREO` | no | Correo de contacto para los avisos del certificado. |
| `CUENCA_GATEWAY_IMAGEN` | no | Imagen del gateway que se usa en lugar de construirla. Por defecto, `cuenca-gateway:local`. |
| `CADDY_IP`, `CADDY_PUERTO_HTTP`, `CADDY_PUERTO_HTTPS` | no | Dirección y puertos publicados. Por defecto, `0.0.0.0`, `80` y `443`. |

`env.example` trae otras variables opcionales, comentadas. Normalmente no hace falta cambiarlas.

!!! danger "Nunca subas `.env` a un repositorio"
    Tiene las contraseñas de tu base de datos. Déjalo con permisos `600`.

## 3. Haz legibles los archivos de configuración

Los servicios leen su configuración con sus propios usuarios, no con el tuyo. Si tu sistema crea los archivos con permisos estrictos, dales permiso de lectura (no tienen secretos):

```sh
chmod 644 powersync/powersync.yaml sync-config.yaml Caddyfile
```

## 4. Construye la imagen del gateway

Desde la raíz del repositorio (mira [Conseguir el paquete](conseguir-el-paquete.md)):

```sh
docker build -f gateway/Dockerfile -t cuenca-gateway:local .
```

## 5. Arranca

De vuelta en `deploy/tercero/`:

```sh
docker compose up -d --wait
```

Comprueba que todo está bien:

```sh
docker compose ps                                            # los cuatro servicios en «healthy»
curl -fsS https://cuenca.example.com/cuenca/v1/salud/listo   # {"ok":true}
curl -fsS https://cuenca.example.com/cuenca/v1/info          # incluye tus servidorId
```

Para aceptar otro servidorId más adelante, agrégalo a `CUENCA_SERVIDORES_PERMITIDOS` en `.env` y vuelve a ejecutar `docker compose up -d --wait`.

## Siguiente paso

Programa los [respaldos](respaldos.md) y revisa la [lista de seguridad](seguridad.md).
