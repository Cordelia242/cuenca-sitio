# Requisitos

Antes de instalar, comprueba que tienes todo esto. El instalador revisa casi todo por ti y se detiene si falta algo.

## El equipo

| Qué | Mínimo |
| --- | --- |
| Sistema | Un equipo **Linux**: un VPS o una máquina propia que esté siempre encendida. |
| Memoria | **2 GB de RAM** o más. |
| Disco | **5 GiB libres** como mínimo, para las imágenes, los datos y el registro de cambios de la base de datos. |
| Docker | Docker con el **plugin Compose v2** (`docker compose version` debe funcionar). El antiguo `docker-compose` v1 no sirve. Tu usuario debe poder hablar con Docker (estar en el grupo `docker` o usar `sudo`). |
| Programas | `bash` 4.3 o posterior, `openssl` (genera las contraseñas y cifra los respaldos) y `curl` (para las comprobaciones). |

!!! note "Por qué 2 GB"
    El servidor corre cuatro servicios con límites de memoria pensados para un equipo de 2 GB. Esos límites evitan que un servicio con problemas deje sin memoria a todo el equipo.

## La red

- **Un dominio propio**, por ejemplo `cuenca.example.com`, con un registro DNS `A` o `AAAA` que apunte a la IP pública del equipo.
- **Los puertos 80 y 443** abiertos desde Internet hacia el equipo. El servidor los usa para obtener y renovar solo su certificado HTTPS.
- **Salida a Internet** desde el equipo: el servidor descarga las claves públicas de la nube de Cuenca para comprobar los permisos de cada dispositivo.

El servidor funciona **solo con HTTPS**. La app no se conecta a servidores sin cifrado.

!!! tip "¿Quieres probarlo primero en tu computadora?"
    El instalador tiene un modo de prueba, `--local`, que sirve el servidor en `http://localhost:8080` sin dominio ni certificado. Mira [Instalación guiada](instalacion.md#probarlo-en-tu-computadora).

## Siguiente paso

[Consigue el paquete del servidor](conseguir-el-paquete.md).
