# Conseguir el paquete

El **paquete del servidor** es una carpeta con la configuración de Docker Compose y los scripts para instalar, actualizar, respaldar, restaurar y diagnosticar. Se llama `deploy/tercero/`.

## Cómo se entrega hoy

Por ahora, el paquete **todavía no se publica por separado**:

- El paquete vive dentro del repositorio de Cuenca, en la carpeta `deploy/tercero/`.
- La **imagen del gateway** (el servicio que recibe los cambios de los dispositivos) todavía no está publicada en un registro de contenedores. Se construye en tu equipo a partir de una copia del repositorio.

Con una copia del repositorio, tienes dos formas de construir la imagen:

- Deja que lo haga el instalador con `--construir` (lo verás en [Instalación guiada](instalacion.md)). Tarda unos minutos, solo la primera vez.
- O constrúyela tú, desde la raíz del repositorio:

    ```sh
    docker build -f gateway/Dockerfile -t cuenca-gateway:local .
    ```

Cuando se publique la imagen, bastará con indicar su nombre con `--imagen-gateway` y ya no hará falta el repositorio.

<!-- EDITAR: cuando el paquete y la imagen del gateway se publiquen, reemplaza el contenido de este bloque con la dirección de descarga del paquete y el nombre de la imagen fijada por digest (@sha256:...). Quita también la frase "Pendiente". -->
!!! info "Dónde descargar"
    **Pendiente.** Todavía no hay una dirección pública para descargar el paquete ni la imagen del gateway. Cuando estén disponibles, los enlaces aparecerán aquí.

## Qué trae el paquete

| Archivo | Para qué sirve |
| --- | --- |
| `instalar.sh` | Instala o cambia la configuración, y arranca el servidor. |
| `actualizar.sh` | Actualiza el servidor, con un respaldo antes. |
| `respaldar.sh` | Hace un respaldo cifrado de los datos. |
| `restaurar.sh` | Restaura un respaldo sin dejar el servidor sin datos. |
| `diagnostico.sh` | Imprime un informe del estado, sin secretos. |
| `generar-secretos.sh` | Crea el archivo `.env` con las contraseñas generadas (instalación manual). |
| `compose.yaml` y `env.example` | La configuración de los servicios y la plantilla de variables. |

Todos los scripts, salvo `generar-secretos.sh`, muestran su ayuda con `--ayuda`, por ejemplo `./instalar.sh --ayuda`.

## Siguiente paso

[Instalación guiada](instalacion.md).
