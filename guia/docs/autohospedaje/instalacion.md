# Instalación guiada

`instalar.sh` es la forma recomendada de instalar el servidor y de cambiar su configuración. Comprueba los requisitos, genera las contraseñas, escribe la configuración, arranca los servicios y espera a que todos estén sanos.

En estos pasos usamos el dominio de ejemplo `cuenca.example.com`. Cámbialo por el tuyo.

## Antes de empezar

1. Crea un registro DNS `A` o `AAAA` de tu dominio hacia la IP pública del equipo.
2. Abre los puertos 80 y 443 hacia el equipo.
3. Ten a mano el **servidorId**: el identificador que te da la app de Cuenca al registrar la dirección de tu servidor (`https://cuenca.example.com`). El instalador lo pide.

!!! warning "Registrar el servidor en la app: disponible en una próxima versión"
    La app todavía no tiene la pantalla para registrar un servidor y obtener su servidorId. Hasta que llegue, puedes preparar el equipo y probar el paquete, pero no completar el registro.

## Instalar paso a paso

1. Entra en la carpeta del paquete:

    ```sh
    cd deploy/tercero
    ```

2. Ejecuta el instalador. `--construir` construye la imagen del gateway desde tu copia del repositorio, porque todavía no se publica una (mira [Conseguir el paquete](conseguir-el-paquete.md)):

    ```sh
    ./instalar.sh --construir
    ```

3. Responde sus preguntas. Si una tiene un valor entre corchetes, presiona Enter para aceptarlo:

    | Pregunta | Qué escribir |
    | --- | --- |
    | Dominio del servidor (p. ej. sync.example.com, sin https://) | Tu dominio, por ejemplo `cuenca.example.com`. |
    | Correo de contacto para el certificado TLS | Un correo tuyo. Ahí llegan los avisos si el certificado está por vencer. |
    | servidorId que te dio la app (varios, separados por comas) | El servidorId que te dio la app. |
    | Emisor de los tokens (la nube de Cuenca; https) | Deja el valor por defecto. |

4. Espera a que termine. Verás algo así (resumido):

    ```text
    Comprobando los requisitos...
    ok: docker, docker compose y openssl
    ok: RAM 1987 MiB, disco libre 40 GiB
    ok: contraseñas generadas en .env
    ok: .env actualizado (modo 600)
    ok: cuenca.example.com resuelve a este equipo
    ok: claves públicas de la nube accesibles
    Descargando las imágenes...
    Construyendo la imagen del gateway...
    AVISO: la imagen del gateway (cuenca-gateway:local) no va fijada por digest (@sha256:...)
    ok: imágenes listas
    Arrancando (espera hasta 300 s a que todo esté sano)...
    ok: todos los servicios están sanos

    Listo: tu servidor de Cuenca está en marcha.
    ```

    El aviso sobre el digest es normal mientras construyas la imagen en tu equipo.

5. Comprueba que el servidor publica tu servidorId:

    ```sh
    curl -fsS https://cuenca.example.com/cuenca/v1/info
    ```

    La respuesta debe incluir tu servidorId.

Al final, el instalador imprime los **siguientes pasos**: la dirección que debes registrar en la app, cómo hacer los respaldos y cómo pedir un diagnóstico si algo falla.

!!! note "Mensajes que empiezan con AVISO o ERROR"
    - **AVISO** no detiene la instalación. Por ejemplo, si tu dominio todavía no apunta al equipo, Caddy no podrá obtener el certificado hasta que corrijas el DNS.
    - **ERROR** la detiene y explica qué falta. Corrígelo y vuelve a ejecutar el instalador.

## Qué hace el instalador

1. Comprueba Docker con Compose v2, `openssl`, 2 GB de RAM, 5 GiB libres y que los puertos estén libres.
2. Si no hay un archivo `.env`, genera las contraseñas con `./generar-secretos.sh`. **Nunca reemplaza una contraseña.**
3. Guarda la configuración en `.env`, que solo tu usuario puede leer (permisos `600`). Si cambia un valor que ya existía, guarda antes una copia del `.env` anterior como `.env.bak.<fecha>`.
4. Avisa si el dominio no apunta a este equipo o si no llega a las claves públicas de la nube.
5. Descarga las imágenes que faltan, arranca los servicios y espera a que estén sanos. Si alguno falla, muestra su estado y sus últimos registros, con los secretos tapados.

## Volver a ejecutarlo

Puedes ejecutar `./instalar.sh` las veces que quieras: los valores que ya están en `.env` son la respuesta por defecto de la siguiente vez.

Cada registro del servidor en la app da un servidorId distinto. Por ejemplo, si una persona de tu familia registra tu mismo servidor para alojar sus espacios, recibe su propio servidorId, y tú decides cuáles aceptas. Para aceptar otro, agrégalo a la lista:

```sh
./instalar.sh --servidores srv_abc123,srv_def456
```

Si quieres cambiar el dominio de una instalación existente, el instalador te pide confirmarlo, porque los dispositivos que usan la dirección anterior dejarán de sincronizar.

## Sin preguntas

Con `--no-interactivo`, el instalador no pregunta nada y lo que falte es un error. Sirve para automatizar:

```sh
./instalar.sh --no-interactivo --construir --dominio cuenca.example.com --correo tu@example.com --servidores srv_abc123
```

Las opciones más usadas:

| Opción | Qué hace |
| --- | --- |
| `--dominio` | Dominio del servidor, sin `https://`. |
| `--correo` | Correo de contacto del certificado. |
| `--servidores` | Los servidorId que aceptas, separados por comas. |
| `--imagen-gateway` | Imagen del gateway que se usa en lugar de construirla, mejor fijada por digest (`@sha256:...`). |
| `--construir` | Construye la imagen del gateway desde el repositorio si no está en el equipo. |
| `--puerto-http`, `--puerto-https` | Puertos publicados. Por defecto, `80` y `443`. |
| `--cambiar-dominio` | Permite cambiar el dominio o el puerto de una instalación existente sin preguntar. |
| `--espera` | Segundos máximos para que todo esté sano. Por defecto, 300. |

`./instalar.sh --ayuda` muestra todas las opciones y, cuando la tiene, la variable de entorno de cada una.

## Probarlo en tu computadora

Con `--local`, el servidor responde solo en tu equipo, en `http://localhost:8080`, sin dominio, sin certificado y sin DNS:

```sh
./instalar.sh --local --construir
```

El instalador igual te pide un servidorId. No uses `--local` en la carpeta de una instalación que ya sirve un dominio: dejaría de servirlo. Para eso, usa una copia del paquete en otra carpeta.

## Registrar el servidor en la app

!!! warning "Disponible en una próxima versión"
    La app todavía no tiene la pantalla para registrar tu servidor, verificarlo y guardar un espacio en él. Cuando llegue, esta sección explicará cómo hacerlo paso a paso.

Lo que ya se sabe de cómo funcionará:

- Registras en la app la dirección de tu servidor (por ejemplo, `https://cuenca.example.com`) y recibes un servidorId.
- Escribes ese servidorId en el servidor con `./instalar.sh --servidores <servidorId>`. El servidor rechaza los permisos de cualquier servidorId que no esté en su lista.
- La app consulta `https://cuenca.example.com/cuenca/v1/info` y, si encuentra tu servidorId, marca el servidor como verificado.

## Siguiente paso

Programa los [respaldos](respaldos.md) y revisa la [lista de seguridad](seguridad.md).
