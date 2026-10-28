# Problemas frecuentes

## Instalación

??? question "El instalador dice que falta el plugin Docker Compose v2"
    Instala el plugin de Compose para Docker. Comprueba que `docker compose version` funciona. El antiguo `docker-compose` v1 no sirve.

??? question "No se puede hablar con el demonio de Docker"
    Comprueba que Docker está en marcha y que tu usuario está en el grupo `docker`, o ejecuta el instalador con `sudo`.

??? question "El instalador dice que un puerto está ocupado"
    Otro programa usa el puerto 80 o el 443. El mensaje te muestra el comando para ver cuál es. Detén ese programa, o publica el servidor en otros puertos con `--puerto-http` y `--puerto-https` si tienes un proxy delante que los reenvía.

??? question "Mi dominio no resuelve a este equipo"
    Crea o corrige el registro DNS `A` o `AAAA` hacia la IP pública del equipo. Sin él, el servidor no puede obtener su certificado HTTPS. Los cambios de DNS pueden tardar en propagarse.

??? question "Dice que falta la imagen del gateway"
    La imagen del gateway todavía no se publica. Ejecuta el instalador desde una copia del repositorio con `--construir`. Mira [Conseguir el paquete](conseguir-el-paquete.md).

??? question "El servidor no llegó a estar sano"
    El instalador muestra el estado de cada servicio y sus últimos registros. Algunas pistas que da el propio instalador:

    - **postgres** no arranca con datos de una instalación anterior: suele ser que `.env` tiene otras contraseñas.
    - **gateway** no queda sano: revisa que la dirección del servidor esté bien escrita en `.env`.
    - **caddy** no arranca: suele ser un puerto ocupado.

    Para el informe completo, ejecuta `./diagnostico.sh`.

??? question "Perdí el archivo .env pero los datos siguen en el equipo"
    El instalador se detiene en vez de crear contraseñas nuevas, porque no abrirían esos datos. Recupera el `.env` de esa instalación. Si de verdad quieres empezar de cero y perder esos datos, el mensaje de error te dice cómo borrar el volumen.

??? question "El certificado HTTPS tarda en aparecer"
    En el primer arranque, el certificado puede tardar un minuto. Revisa los registros con `docker compose logs caddy`.

## Uso

??? question "¿Puedo alojar los espacios de mi familia en mi servidor?"
    Sí. Cada persona registra tu servidor en su app y recibe su propio servidorId, y tú lo agregas a tu lista con `./instalar.sh --servidores`. Recuerda que **puedes leer todos los datos de los espacios que alojas**, así que asegúrate de que lo saben. *El registro en la app llegará en una próxima versión.*

??? question "¿Puedo mover un espacio entre la nube y mi servidor, o entre dos servidores?"
    Todavía no. La app no tiene, por ahora, la opción de mover un espacio a un servidor propio. Llegará en una próxima versión.

??? question "¿La app de la tienda se conecta a servidores propios?"
    Todavía no. La app no tiene, por ahora, la pantalla para registrar un servidor ni guardar espacios en él.

??? question "Si alguien sale de un espacio, ¿cuándo pierde el acceso a mi servidor?"
    En unos 15 minutos, cuando vence su permiso. La copia que ya tenía en su dispositivo se queda allí.

??? question "Si borro mi cuenta de Cuenca, ¿se borran los datos de mi servidor?"
    No. Borrar tu cuenta no toca los datos de un servidor. Los datos de tu servidor los borras tú, como operador.

??? question "¿Cuánto cuesta?"
    Alojar un servidor es gratis, y no hay un número máximo de servidores por persona. Pagas tú el equipo o el VPS donde lo instales.
