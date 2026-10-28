# Actualizar el servidor

`actualizar.sh` actualiza tu servidor de forma segura: primero hace un respaldo, después descarga las imágenes, recrea los servicios y comprueba que todo quedó sano.

Desde `deploy/tercero/`:

```sh
./actualizar.sh                                              # la misma imagen del gateway, descargada otra vez
./actualizar.sh --imagen-gateway <imagen nueva>@sha256:...   # otra imagen del gateway
```

!!! info "Imagen del gateway"
    Mientras la imagen del gateway no se publique, se construye en tu equipo (mira [Conseguir el paquete](conseguir-el-paquete.md)). Si no se puede descargar, `actualizar.sh` usa la copia de tu equipo y te lo avisa.

## Qué hace, en orden

1. **Respalda** con `./respaldar.sh`. Si el respaldo falla, se detiene sin cambiar nada. Te pedirá la frase de paso del respaldo, o puedes pasarla con `--frase-archivo` (mira [Respaldos](respaldos.md)).
2. **Anota** las imágenes que corren ahora, para poder volver atrás.
3. **Descarga** las imágenes otra vez y recrea los servicios. Al arrancar, el gateway actualiza la estructura de la base de datos.
4. **Reinicia** PowerSync y comprueba el servidor a través de Caddy.

Si algo falla, el script imprime **cómo volver atrás**: la imagen anterior del gateway y el respaldo que acaba de hacer, para usarlo con `./restaurar.sh`.

!!! warning "No te saltes el respaldo"
    `--sin-respaldo` actualiza sin respaldar antes. No se recomienda: los cambios en la estructura de la base de datos solo van hacia adelante, y si uno sale mal no tendrás un respaldo de antes de actualizar.

## Opciones

| Opción | Qué hace |
| --- | --- |
| `--imagen-gateway IMAGEN` | Imagen nueva del gateway, mejor fijada por digest (`@sha256:...`). Se guarda en `.env`. |
| `--sin-respaldo` | No respalda antes (no recomendado). |
| `--frase-archivo ARCHIVO` | Archivo con la frase de paso del respaldo. |
| `--espera SEGUNDOS` | Tiempo máximo para que todo esté sano. Por defecto, 300. |

## Actualizar la base de datos, PowerSync o Caddy

Las versiones de Postgres, PowerSync y Caddy van fijas en `compose.yaml`. Para cambiarlas, trae antes la versión nueva del paquete y después ejecuta `./actualizar.sh`.
